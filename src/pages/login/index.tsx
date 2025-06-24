import { useEffect } from "react";

import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";

import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"; 

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

import toast from "react-hot-toast";

const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório")
})  

type FormData = z.infer<typeof schema>

export function Login() {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode:"onChange"
    })

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

    function onSubmit(data:FormData){
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async (user )=> {

            toast.success("Seja Bem-Vindo " + user.user.displayName)
            navigate("/dashboard", {replace: true})
        })
        .catch(() =>{
            toast.error("Erro ao fazer o login, verifique o usuário e senha")
        })
    }

    return(
       <Container>
        <div className=" w-full min-h-screen flex justify-center items-center flex-col">
            <Link to='/'
                    className="mb-6 max-w-sm w-full">
                
                    <h1 className=" max-w-sm h-14 bg-gradient-to-r from-teal-600 to-teal-500 
                        uppercase text-white text-4xl text-center p-2 items-center font-karantina rounded-tl-full rounded-br-full ">
                        adote-me
                    </h1>
                
            </Link>

            <form 
                    className=" bg-white max-w-xl w-full rounded-lg p-2"
                    onSubmit={handleSubmit(onSubmit)}>
                        

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
                    className="h-11 w-full p-2 rounded-md bg-teal-600 text-white text-lg 
                    uppercase font-semibold italic">
                                        Acessar
                </button>
            </form>

            <Link 
                to="/register"
                className="text-lg items-center flex">
                Não possui uma conta? <p className="text-blue-400 ml-2"> Faça seu registro</p></Link>
            
            <Link
                to="/forgotpassword"
                className="text-lg items-center flex">
                Esqueção a senha? <p className=" text-blue-400 ml-2"> Clique Aqui!</p>
            </Link>
            
        </div>
       </Container>
    )
}
