import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/painelHeader";

import { AuthContext } from "../../context/AuthContext";

import { collection, getDocs, where, query, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, deleteObject } from "firebase/storage";
import { FiTrash2 } from 'react-icons/fi'

interface PetProps {
    id: string;
    uid: string;
    name: string;
    age: string;
    breed: string;
    type: string;
    city: string;
    district: string;
    images: PetImageProps[];
}
interface PetImageProps {
    name: string;
    uid: string;
    url: string;
}


export function Dashboard() {

    const [pets, setPets] = useState<PetProps[]>([])
    const { user } = useContext(AuthContext);

    useEffect(() => {
        function loadPets() {

            if (!user?.uid) {
                return
            }

            const petsRef = collection(db, "pets")
            const queryRef = query(petsRef, where("uid", "==", user.uid))

            getDocs(queryRef)
                .then((snapshot) => {
                    let listPets = [] as PetProps[];

                    snapshot.forEach(doc => {
                        listPets.push({
                            id: doc.id,
                            uid: doc.data().uid,
                            name: doc.data().name,
                            age: doc.data().age,
                            breed: doc.data().breed,
                            type: doc.data().type,
                            city: doc.data().city,
                            district: doc.data().district,
                            images: doc.data().images
                        })
                        setPets(listPets);
                    })
                })
        }
        loadPets();
    }, [user])

    async function handleDeletePet(pet:PetProps){

            const itemPet = pet

            const docRef = doc(db, "pets", itemPet.id)
            await deleteDoc(docRef);

            itemPet.images.map( async (image) => {
                const imagePath = `images/${image.uid}/${image.name}`

                const imageRef = ref(storage, imagePath)

                try{
                    await deleteObject(imageRef)
                    setPets(pets.filter(pet => pet.id !== itemPet.id))
                }catch(erro){
                    console.log("Erro ao deletar")
                }
            })

            
    }   


    function getPetEmoji(type: string) {
        if (type === "Cachorro") {
            return "🐶";
        } else if (type === "Gato") {
            return "🐱";
        }
    }

    return (
        <Container>
            <DashboardHeader />

            <main className=" grid grid-cols-1 gap-6 md:grid-flow-cols-2 lg:grid-cols-3 uppercase mt-5 ">

                {pets.map(pet => (
                    <section key={pet.id} className=" w-full bg-white rounded-lg relative">
                        <button onClick={ () => handleDeletePet(pet)}
                                className="absolute bg-white w-14 h-14 rounded-full flex justify-center items-center right-2 top-2 drop-shadow">
                            <FiTrash2 size={30} color="#000"  />
                        </button>
                        <img className="w-full rounded-lg mb-2 h-72 "
                                src={pet.images[0].url} alt="" />
                        <p className="font-bold mt-1 px-2 mb-2 font-karantina text-3xl">{pet.name} {getPetEmoji(pet.type)} </p>
                        <div className="flex flex-col px-2 text-xl">
                            <span className="text-zinc-700">Idade: {pet.age}</span>
                            <span className="text-zinc-700">Raça: {pet.breed} </span>

                        </div>
                        <div className="w-full h-px bg-slate-200 my-2"></div>
                        <div className="px-2 pb-2 flex flex-col text-xl ">
                            <span className="text-black">Cidade: {pet.city}</span>
                            <span className="text-black">Bairro: {pet.district}</span>
                        </div>
                    </section>
                ))}
            </main>

        </Container>
    )
}