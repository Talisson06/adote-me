import { useState, useEffect } from "react";
import { Container } from "../../components/container";

import { Link } from "react-router-dom";

import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface PetProps {
    id: string;
    name: string;
    age: string;
    breed: string;
    type: string;
    uid: string;
    city: string;
    district: string;
    images: PetImageProps[];
}


interface PetImageProps {
    name: string;
    uid: string;
    url: string;
}

export function Home() {

    const [pet, setPets] = useState<PetProps[]>([])
    const [loadImages, setLoadImages] = useState<string[]>([])
    const [input, setInput] = useState("")

    useEffect(() => {
       
        loadPets();
    }, [])
    function loadPets() {
        const petsRef = collection(db, "pets")
        const queryRef = query(petsRef, orderBy("created", "desc"))

        getDocs(queryRef)
            .then((snapshot) => {
                let listPets = [] as PetProps[];

                snapshot.forEach(doc => {
                    listPets.push({
                        id: doc.id,
                        name: doc.data().name,
                        age: doc.data().age,
                        breed: doc.data().breed,
                        type: doc.data().type,
                        uid: doc.data().uid,
                        city: doc.data().city,
                        district: doc.data().district,
                        images: doc.data().images
                    })
                    setPets(listPets);
                })
            })
    }
        function handleImageLoad(id: string){
            setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id])

        }

        const getPetEmoji = (type: string) => {
            if (type === "Cachorro") {
                return "🐶"; // Emoji de cachorro
            } else if (type === "Gato") {
                return "🐱"; // Emoji de gato
            }
            return ""; // Retorna vazio se não for Cachorro nem Gato
        }

        
      async  function handleSearchPet(){
            if(input === ''){
                loadPets();
                return;
            }
            setPets([]);
            setLoadImages([]);

            const q = query(collection( db, "pets"),
                where("breed", ">=", input.toUpperCase()),
                where("breed", "<=", input.toUpperCase() + "\uf8ff")

            )

            const querySnapshot = await getDocs(q)
            
            let listPets = [] as PetProps[];
            
            querySnapshot.forEach(doc => {
                listPets.push({
                    id: doc.id,
                    name: doc.data().name,
                    age: doc.data().age,
                    breed: doc.data().breed,
                    type: doc.data().type,
                    uid: doc.data().uid,
                    city: doc.data().city,
                    district: doc.data().district,
                    images: doc.data().images
                })
            })
            setPets(listPets)
        }

    return (
        <Container>
            <section className="bg-white p-4 rounded-lg w-full max-w-4xl mx-auto flex justify-center items-center gap-2">
                <input
                    className="w-full border-2 rounded-lg h-9 px-3 outline-none text-2xl md:text-lg"
                    placeholder="Digite a raça do pet..."
                    value={input}
                    onChange={(e) => setInput(e.target.value) }/>

                <button onClick={ () => handleSearchPet()}
                        className="bg-teal-500 h-9 px-8 text-white font-serif rounded-lg text-2xl">
                    Buscar
                </button>
            </section>

            <h1 className=" font-karantina text-3xl text-center mt-6 mb-5 ">Adote-me 🐾</h1>

            <main className=" mb-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pet.map(pet => (
                    <Link key={pet.id} to={`/pet/${pet.id}`}>
                    <section className=" w-full bg-white rounded-lg">
                        <div className="w-full h-72 rounded-lg bg-slate-200 "
                            style={{display: loadImages.includes(pet.id) ? "none" : "block" }}
                        ></div>
                        <img
                            className="w-full rounded-lg mb-2 h-72 hover:scale-105 transition-all"
                            src={pet.images[0].url}
                            alt={`Imagem do pet ${pet.name} ele é um ${pet.breed}`}
                            onLoad={() => handleImageLoad(pet.id)}
                            style={{display: loadImages.includes(pet.id) ? "block" : "none"}}/>
                        <h2 className="font-karantina mt-1 mb-2 px-2 text-4xl uppercase text-center">{pet.name}{getPetEmoji(pet.type)}</h2>

                        <div className="flex flex-col px-2 uppercase text-2xl">
                            <p className="text-zinc-700 ">Idade: {pet.age}</p>
                            <p className="text-zinc-700 ">Raça: {pet.breed}</p>
                        </div>

                        <div className="w-full h-px bg-slate-300 my-2"></div>

                        <div className=" px-2 pb-2 text-black uppercase text-2xl">
                            <p>cidade: {pet.city}</p>
                            <p>bairro: {pet.district}</p>
                        </div>
                    </section>
                    </Link>
                    
                ))}
            </main>
        </Container>
    )
}
