import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    getAuth,
    confirmPasswordReset,
    verifyPasswordResetCode,
} from "firebase/auth";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function ResetPassword() {

    const [showPassword, setShowPassword] = useState(false)

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const oobCode = params.get("oobCode");

    const auth = getAuth();

    useEffect(() => {
        if (!oobCode) {
            toast.error("Código inválido.");
            navigate("/");
            return;
        }

        verifyPasswordResetCode(auth, oobCode)
            .then((email) => {
                setEmail(email);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Link expirado ou inválido.");
                navigate("/");
            });
    }, [auth, oobCode, navigate]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode!, newPassword);
            toast.success("Senha redefinida com sucesso!");
            navigate("/login");
        } catch (err) {
            toast.error("Erro ao redefinir a senha.");
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div className="text-center mt-10 text-xl text-gray-700">
                Verificando link...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Nova senha para {email}
                </h1>

                <div className="relative items-center">
                    <input
                        type="password"
                        placeholder="Nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-4"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute items-center right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22}/>}
                    </button>


                </div>


                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
                >
                    Redefinir senha
                </button>
            </form>
        </div>
    );
}
