import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones
import { AuthContext } from "../../context/AuthContext";

export function Header() {
    const { signed, loadingAuth } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detecta se é tela pequena ou grande
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full flex items-center justify-center h-16 bg-teal-600 drop-shadow mb-4">
            <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">

                {/* 🐾 Logo */}
                <Link to="/">
                    <h1 className="uppercase font-karantina text-white text-xl md:text-2xl">
                        Adote-me🐾
                    </h1>
                </Link>



                {/* 🔐 Ícones de Login ou Perfil */}
                <div className="flex items-center gap-10">


                    {/* 🌍 Menu para telas maiores */}
                    {!isMobile && (
                        <nav className="hidden md:flex z-50 absolute gap-6 text-white text-xl uppercase font-karantina">
                            <Link to="/about" className="hover:underline hover:text-teal-500">Sobre</Link>
                            <Link to="/privacy" className="hover:underline hover:text-teal-500">Políticas</Link>
                        </nav>
                    )}

                    {!loadingAuth && signed && (
                        <Link to="/dashboard">
                            <div className="hover:underline hover:text-teal-500 text-white font-karantina text-lg uppercase">
                                <p>Dashboard</p>
                            </div>
                        </Link>
                    )}
                    {!loadingAuth && !signed && (
                        <Link to="/login">
                            <div className="hover:underline hover:text-teal-500 text-white font-karantina text-lg uppercase">
                                <p>Entrar</p>
                            </div>
                        </Link>
                    )}

                    {/* 📱 Menu Mobile */}
                    {isMobile && (
                        <button onClick={() => setMenuOpen(!menuOpen)} className="ml-4 z-50">
                            {menuOpen ? <FiX size={28} color="white" /> : <FiMenu size={28} color="white" />}
                        </button>
                    )}
                </div>
            </header>

            {/* 🔽 Dropdown Mobile */}
            {menuOpen && isMobile && (
                <div className="absolute top-10 left-0 w-full h-30 z-50 bg-teal-600 text-white font-karantina  shadow-md mb-10 py-4 px-6 flex flex-col gap-4">
                    <Link to="/about" className="hover:text-teal-500 text-xl uppercase">Sobre</Link>
                    <Link to="/privacy" className="hover:text-teal-500 text-xl uppercase">Políticas</Link>
                </div>
            )}
        </div>
    );
}
