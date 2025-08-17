import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

export function Header() {
    const { signed, loadingAuth } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // fecha o menu quando trocar para desktop
    useEffect(() => {
        if (!isMobile) setMenuOpen(false);
    }, [isMobile]);

    return (
        <div className="w-full bg-teal-600 drop-shadow mb-4">
            {/* faixa principal do header (16 = 64px) */}
            <div className="flex items-center justify-center h-16">
                <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
                    {/* logo */}
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <h1 className="uppercase font-karantina text-white text-xl md:text-2xl">
                            Adote-me🐾
                        </h1>
                    </Link>

                    <div className="flex items-center gap-10">
                        {/* nav desktop */}
                        <nav className="hidden md:flex gap-10 text-white text-xl uppercase font-karantina">
                            <Link to="/about" className="hover:underline hover:text-teal-200">Sobre</Link>
                            <Link to="/privacy" className="hover:underline hover:text-teal-200">Políticas</Link>
                        </nav>

                        {/* ações à direita */}
                        {!loadingAuth && signed && (
                            <Link to="/dashboard" className="text-white font-karantina text-lg uppercase hover:underline hover:text-teal-200">
                                Painel
                            </Link>
                        )}
                        {!loadingAuth && !signed && (
                            <Link to="/login" className="text-white font-karantina text-lg uppercase hover:underline hover:text-teal-200">
                                Entrar
                            </Link>
                        )}

                        {/* botão mobile */}
                        {isMobile && (
                            <button
                                onClick={() => setMenuOpen((v) => !v)}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                                className="ml-2"
                            >
                                {menuOpen ? <FiX size={28} color="white" /> : <FiMenu size={28} color="white" />}
                            </button>
                        )}
                    </div>
                </header>
            </div>

            {/* dropdown mobile: ocupa no máx. 60px e EMPURRA a página */}
            <div
                id="mobile-menu"
                className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "h-[60px]" : "h-0"
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-4 h-[60px] flex items-center gap-8 text-white font-karantina uppercase">
                    <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-teal-200">
                        Sobre
                    </Link>
                    <Link to="/privacy" onClick={() => setMenuOpen(false)} className="hover:text-teal-200">
                        Políticas
                    </Link>
                </nav>
            </div>
        </div>
    );
}
