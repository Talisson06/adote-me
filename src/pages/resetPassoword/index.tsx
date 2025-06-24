// pages/ResetPassword/index.tsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import toast from "react-hot-toast";

export function ResetPassword() {
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

        // Verifica se o código é válido
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
            toast.error("A senha deve ter pelo menos 6 caracteres.");
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
        return <p className="text-center mt-10 text-xl">Verificando link...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Nova senha para {email}</h1>

                <input
                    type="password"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                />

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
