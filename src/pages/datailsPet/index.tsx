import { useEffect, useState } from "react"
import { Container } from "../../components/container"
import { FaWhatsapp } from "react-icons/fa"
import { useParams, useNavigate } from "react-router-dom"

import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PetProps {
    id: string;
    uid: string;
    name: string;
    age: string;
    breed: string;
    type: string;
    city: string;
    owner: string;
    whatsapp: string;
    district: string;
    description: string;
    created: string;
    images: PetImageProps[];
}
interface PetImageProps {
    name: string;
    uid: string;
    url: string;
}


export function PetDatails() {

    const { id } = useParams();
    const [pet, setPets] = useState<PetProps>()
    const [sliderPerView, setSliderPerView] = useState<number>(2)
    const navigate = useNavigate();


    useEffect(() => {
        async function loadPet() {
            if (!id) { return }

            const docref = doc(db, "pets", id)
            getDoc(docref)
                .then((snapshot) => {

                    if (!snapshot.data()) {
                        navigate("/")
                    }

                    setPets({
                        id: snapshot.id,
                        name: snapshot.data()?.name,
                        age: snapshot.data()?.age,
                        breed: snapshot.data()?.breed,
                        type: snapshot.data()?.type,
                        city: snapshot.data()?.city,
                        district: snapshot.data()?.district,
                        whatsapp: snapshot.data()?.whatsapp,
                        description: snapshot.data()?.description,
                        uid: snapshot.data()?.uid,
                        created: snapshot.data()?.created,
                        owner: snapshot.data()?.owner,
                        images: snapshot.data()?.images,

                    })
                })
        }
        loadPet()

    }, [])

    function getPetEmoji(type: string) {
        if (type === "Cachorro") {
            return "🐶";
        } else if (type === "Gato") {
            return "🐱";
        }
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 720) {
                setSliderPerView(1);
            } else {
                setSliderPerView(2);
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (

        <div className="my-5"> 
            <Container>

                {pet && <Swiper
                    
                    slidesPerView={sliderPerView}
                    loop={true}
                    pagination
                    autoplay={{
                        delay:3000,
                        disableOnInteraction: false
                    }}
                    >
                    {pet?.images.map(image => (
                        <SwiperSlide key={image.name}>
                            <img src={image.url}
                                alt="Slide de Imagens"
                                className="w-full h-[250px] sm:h-[400px] object-cover rounded-lg " />
                        </SwiperSlide>
                    ))}

                </Swiper>}

                {pet && (
                    <main className="w-full bg-white rounded-lg gap-6 px-4 py-4 z-0">
                        <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                            <h1 className="font-karantina text-4xl uppercase justify-center px-2">{pet?.name} {getPetEmoji(pet?.type)}</h1>
                        </div>
                        <div className="flex flex-col uppercase mb-2 px-2 text-xl">
                            <div className="flex gap-2 ">
                                <p>Idade:</p>
                                <strong>{pet?.age}</strong>
                            </div>
                            <div className="flex gap-2 ">
                                <p>Raça:</p>
                                <strong>{pet?.breed}</strong>
                            </div>
                        </div>
                        <div className="w-full h-px bg-slate-500"></div>
                        <div className="flex flex-col justify-around uppercase my-2 px-2 text-xl">
                            <div className="flex gap-2 ">
                                <p>Cidade:</p>
                                <strong>{pet?.city}</strong>
                            </div>
                            <div className="flex gap-2 ">
                                <p>Bairro:</p>
                                <strong>{pet?.district}</strong>
                            </div>
                        </div>
                        <div className="w-full h-px bg-slate-500 my-2 "></div>
                        <div className="flex flex-col px-2 uppercase text-xl">
                            <p><strong>Descrição:</strong></p>
                            <span className="my-4">{pet?.description}</span>
                        </div>

                        <div className="flex flex-col gap-2 uppercase text-xl px-2 my-2">
                            <p>whatsapp / contato:</p>
                            <strong>{pet?.whatsapp}</strong>
                        </div>

                        <a href={`https://api.whatsapp.com/send?phone=${pet?.whatsapp}&text=Olá vi o anucio do pet, ${pet.name} na plataforma Adote-me e fiquei interessado`}
                            target="_blank"
                            className="w-full cursor-pointer bg-green-600 text-white uppercase flex items-center justify-center gap-2 my-6 h-11 rounded-lg font-medium ">
                            Conversar com doador
                            <FaWhatsapp size={26} color="#fff" />
                        </a>

                    </main>
                )}
            </Container>

        </div>

    )
}
