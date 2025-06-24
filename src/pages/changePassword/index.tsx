import { useState } from "react";
import { resetPassword } from "../../services/firebaseConnection";
import toast from "react-hot-toast";

export function ForgotPassword() {
    const [email, setEmail] = useState("");

    async function handleReset() {
        if (!email) {
            toast.error("Digite seu e-mail.");
            return;
        }

        try {
            await resetPassword(email);
            toast.success("Link de recuperação enviado para seu e-mail.");
        } catch (error: any) {
            console.error("Erro ao enviar e-mail:", error);
            if (error.code === "auth/user-not-found") {
                toast.error("E-mail não encontrado.");
            } else {
                toast.error("Erro ao enviar e-mail de recuperação.");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Recuperar Senha</h1>
                <p className="text-gray-600 text-center mb-4">Informe seu e-mail para receber um link de redefinição de senha.</p>

                <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                />

                <button
                    onClick={handleReset}
                    className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
                >
                    Enviar link de recuperação
                </button>
            </div>
        </div>
    );
}
