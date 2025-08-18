export default function Footer() {
    return (
        <footer className="bg-teal-600 text-white py-6 mt-5 w-full h-full relative ">
            <div className="container  flex flex-col md:flex-row gap-2 justify-between items-center px-4">

                {/* Logo e descrição */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">Adote-me 🐾</h2>
                    <p className="text-xl text-gray-200 mt-1">
                        Conectando pets a lares cheios de amor ❤️
                    </p>
                </div>

                <div>
                    
                </div>
                {/* Links úteis */}
                <div className="flex flex-col md:flex-row items-center gap-6 text-xl">
                    <a href="/about" className="hover:underline">Sobre</a>
                    <a href="/privacy" className="hover:underline">Política de Privacidade</a>
                    <a href="mailto:adotemecontato46@gmail.com" 
                    className="hover:underline"> Contato</a>
                </div>

                {/* Redes sociais */}
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <i className="fab fa-facebook text-xl"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <i className="fab fa-whatsapp text-xl"></i>
                    </a>
                </div>
            </div>

            {/* Direitos autorais */}
            <div className="text-center text-gray-200 mt-4 text-xl">
                &copy; {new Date().getFullYear()} Adote-me. Todos os direitos reservados.
            </div>
        </footer>
    );
}
