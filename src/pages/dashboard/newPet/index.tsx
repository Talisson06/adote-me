import { Container } from "../../../components/container";
import { RadioGroup } from "../../../components/radioGroup";
import { DashboardHeader } from "../../../components/painelHeader";

import { FiUpload, FiTrash2 } from 'react-icons/fi'

import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import { storage, db } from "../../../services/firebaseConnection";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { addDoc, collection } from "firebase/firestore";

import toast from "react-hot-toast";


const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    type: z.enum(["Cachorro", "Gato"], {
        errorMap: () => ({ message: "Escolha entre 'Cachorro' ou 'Gato'" }),
    }),
    breed: z.string().nonempty("O campo da raça do pet é obrigatório"),
    age: z.string().nonempty("O campo de idade é obrigatório"),
    city: z.string().nonempty("O campo da sua Cidade é obrigatório"),
    district: z.string().nonempty("O campo bairro é obrigatório"),
    whatsapp: z
        .string()
        .nonempty("O campo WhatsApp/Contato é obrigatório")
        .refine((value) => /^(\d{11,12})$/.test(value), {
            message: "Número de telefone escrito de forma inválida.",
        }),
    description: z
        .string()
        .nonempty("A descrição sobre o seu pet é obrigatória"),
});


type FormData = z.infer<typeof schema>


interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

export function NewPet() {

    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const [petImages, setPetImages] = useState<ImageItemProps[]>([])

    function onSubmit(data: FormData) {
        if (petImages.length === 0) {
            toast.error("Envie alguma imagem para cadastar o seu pet")
            return;
        }

        const petListImages = petImages.map(pet => {
            return {
                uid: pet.uid,
                name: pet.name,
                url: pet.url
            }
        })
        addDoc(collection(db, "pets"), {
            name: data.name,
            type: data.type,
            breed: data.breed.toUpperCase(),
            age: data.age,
            city: data.city,
            district: data.district,
            whatsapp: data.whatsapp,
            description: data.description,
            created: new Date(),
            owner: user?.name,
            uid: user?.uid,
            images: petListImages,
        })
            .then(() => {
                reset();
                setPetImages([])
                toast.success("Pet cadastrado com sucesso")
            }).catch((error) => {
                console.log(error)
                toast.error("Error ao Cadastrar o seu pet")
            })

            
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === "image/jpeg" || image.type === "image/png") {
                await handleUpload(image)
            } else {
                alert("Envie uma imagem do tipo jpeg ou png")
                return;
            }
        }
    }

    async function handleUpload(image: File) {
        if (!user?.uid) {
            return;
        }

        const currentUid = user?.uid;
        const uidImage = uuidv4();

        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

        uploadBytes(uploadRef, image)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    const imageItem = {
                        name: uidImage,
                        uid: currentUid,
                        previewUrl: URL.createObjectURL(image),
                        url: downloadUrl
                    }
                    setPetImages((images) => [...images, imageItem])
                })
            })
    }
    async function handleDeleteImage(item: ImageItemProps) {
        const imagePath = `images/${item.uid}/${item.name}`;
        const imageRef = ref(storage, imagePath);

        try {
            await deleteObject(imageRef);
            setPetImages(petImages.filter((pet) => pet.url !== item.url))
        } catch (err) {
            console.log("Erro ao deletar")
        }
    }

    return (
        <Container>
            <DashboardHeader />

            <div className=" w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 ">
                <button className="border-2 border-gray-600 w-48  h-32 rounded-lg flex items-center justify-center cursor-pointer ">
                    <div className="absolute cursor-pointer ">
                        <FiUpload size={30} color="#000" className="cursor-pointer" />
                    </div>
                    <div>
                        <input className="opacity-0 cursor-pointer"
                            type="file" accept="image/*"
                            onChange={handleFile} />
                    </div>
                </button>

                {petImages.map(item => (
                    <div key={item.name} className="w-full h-32 flex items-center justify-center  relative">
                        <button className="absolute" onClick={() => handleDeleteImage(item)}>
                            <FiTrash2 size={30} color="#008080" />
                        </button>
                        <img
                            src={item.previewUrl}
                            className="rounded-lg w-full h-32 object-cover"
                            alt="Foto do Pet" />
                    </div>
                ))}

            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center  gap-2 mt-2  ">

                <form
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3 flex  uppercase gap-5 ">
                        <div className="w-full">
                            <p className="mb-2 font-medium italic text-2xl "> Nome do Pet: </p>
                            <Input
                                type="text"
                                register={register}
                                name="name"
                                error={errors.name?.message}
                                placeholder="Zeus"
                            />
                        </div>
                        <div className="w-full items-center mb-3">
                            <p className="font-medium italic text-2xl mb-2">Cachorro ou Gato:</p>
                            <RadioGroup
                                name="type"
                                options={[
                                    { label: "Cachorro", value: "Cachorro" },
                                    { label: "Gato", value: "Gato" },
                                ]}
                                register={register}
                                error={errors.type?.message}
                            />
                        </div>


                    </div>

                    <div className="mb-3 flex  uppercase items-center gap-5">
                        <div className="w-full">
                            <p className="mb-2 font-medium italic text-2xl "> Raça: </p>
                            <Input
                                type="text"
                                register={register}
                                name="breed"
                                error={errors.breed?.message}
                                placeholder="Pitbull"
                            />
                        </div>
                        <div className="w-full">
                            <p className=" mb-2 font-medium italic text-2xl" >Idade:</p>
                            <Input
                                type="text"
                                register={register}
                                name="age"
                                error={errors.age?.message}
                                placeholder="2 anos"
                            />
                        </div>

                    </div>

                    <div className="mb-3 flex uppercase items-center gap-5">
                        <div className="w-full">
                            <p className="font-medium italic text-2xl "> Cidade: </p>
                            <Input
                                type="text"
                                register={register}
                                name="city"
                                error={errors.city?.message}
                                placeholder="Cidade"
                            /></div>
                        <div className="w-full">
                            <p className="font-medium italic text-2xl" >Bairro:</p>
                            <Input
                                type="text"
                                register={register}
                                name="district"
                                error={errors.district?.message}
                                placeholder="Bairro"
                            />
                        </div>


                    </div>
                    <div className="mb-3  uppercase items-center ">
                        <p className="font-medium italic text-2xl "> whatsapp/contato: </p>
                        <Input
                            type="text"
                            register={register}
                            name="whatsapp"
                            error={errors.whatsapp?.message}
                            placeholder="71988776655"
                        />
                    </div>
                    <div className="mb-3  uppercase items-center ">
                        <p className="font-medium italic text-2xl "> Descrição sobre o Pet: </p>
                        <textarea
                            className="border-2 w-full rounded-md h-24 px-2 text-2xl"
                            {...register("description")}
                            name="description"
                            id="description"
                            placeholder="Digite a descrição sobre o pet"
                        />{errors.description && <p className=" mb-1 text-red-500"> {errors.description.message}</p>}
                    </div>

                    <button type="submit" className="w-full h-10 rounded-md bg-teal-500 uppercase text-white  font-medium text-2xl">
                        Cadastrar
                    </button>


                </form>

            </div>
        </Container>
    )
}