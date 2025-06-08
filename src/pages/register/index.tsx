import { useEffect, useContext } from "react";

import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";

import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"; 

import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

import { AuthContext } from "../../context/AuthContext";

import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigratório"),
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().min(6, "A  senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

export function Register() {

    const { handleInfoUser }  = useContext(AuthContext)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver:zodResolver(schema),
        mode:"onChange"
    })

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

   async function onSubmit(data:FormData){
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (user) => {
            await updateProfile(user.user, {
                displayName: data.name.toUpperCase()
            })

            handleInfoUser({
                name: data.name,
                email: data.email,
                uid: user.user.uid
            })

            toast(user.user.displayName + ", Obrigado por se cadastrar")
            navigate("/dashboard", {replace: true})
        }) 
        .catch((erro)=> {
            toast.error("E-mail já cadastrado, tente outro!")
            console.log(erro)
        } )
    }
    return(
        <Container>
            <div className="flex flex-col justify-center items-center w-full min-h-screen">
                <Link to='/'
                        className="mb-6 max-w-sm w-full">
                    
                        <h1 className=" max-w-sm h-14 bg-gradient-to-r from-teal-600 to-teal-500 
                            uppercase text-white text-4xl text-center p-2 items-center font-karantina rounded-tl-full rounded-br-full ">
                            adote-me
                        </h1>
                    
                </Link>

                <form 
                    className="bg-white max-w-xl w-full rounded-lg p-2"
                    onSubmit={handleSubmit(onSubmit)}>
                    
                    
                    <div className="mb-3">
                    <Input
                        type="text"
                        placeholder="Digite seu nome completo"
                        name="name"
                        error={errors.name?.message}
                        register={register}
                    />
                    </div>

                    <div className="mb-3">
                <Input
                    
                    type="email"
                    placeholder="Digite seu email"
                    name='email'
                    error={errors.email?.message}
                    register={register}


                />
                </div>
                <div className="mb-3">
                <Input
                    type="password"
                    placeholder="Digite seu senha"
                    name='password'
                    error={errors.password?.message}
                    register={register}
                />
                </div>
                
            
                <button type="submit"
                    className="h-11 w-full p-2 rounded-md bg-teal-600 text-white text-l 
                    uppercase font-semibold italic">
                                        Cadastrar
                </button>

                </form>

                <Link 
                    to="/login"
                    className="text-xl flex items-center"
                > Já possui uma conta? <p className="text-blue-400 ml-2">Faça o login</p></Link>
            
            </div>

        </Container>
    )
}
