import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function DashboardHeader(){
    
    async function handleLogout() {
        await signOut(auth);
    }
    
    return(
        <div className=" w-full h-11 items-center flex bg-teal-600 rounded-lg text-white text-lg font-karantina gap-10 px-4 mb-4
                        ">
            <Link to="/dashboard">Painel</Link>
            <Link to="/dashboard/new">Cadastrar Novo Pet</Link>

            <button className="ml-auto" onClick={handleLogout}>
                Sair da conta
            </button>
        </div>
    )
}