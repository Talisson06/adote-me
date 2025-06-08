import { Container } from "../../components/container";

export  function About() {
    return (
        <Container>
            <section className="bg-white p-6 rounded-lg max-w-3xl mx-auto md:my-5">
                <h1 className="text-4xl font-bold text-center text-teal-600 mb-4">Sobre o Adote-me</h1>

                <p className="text-lg text-gray-700 text-center mb-6">
                    O <strong>Adote-me</strong> nasceu do desejo de facilitar a adoção de animais e ajudar aqueles que sempre compartilhavam pets disponíveis para adoção no Instagram.
                    Além disso, o projeto também surgiu como uma forma de aprendizado e aprimoramento técnico. Nosso objetivo é simples: <strong>conectar animais em busca de um lar amoroso com pessoas dispostas a adotá-los</strong>.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-teal-500 mb-2">Nosso Propósito</h2>
                    <p className="text-gray-700">
                        Todos os dias, milhares de cães e gatos aguardam por uma chance de serem amados. Acreditamos que cada pet merece um lar, carinho e cuidados.
                        Queremos tornar esse processo mais acessível e confiável, conectando adotantes e doadores de forma simples e segura.
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-teal-500 mb-2">Nossos Valores</h2>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li><strong>Amor pelos Animais:</strong> Cada pet merece respeito e dignidade.</li>
                        <li><strong>Transparência:</strong> Nenhum dado sensível é armazenado, e o contato é direto entre adotante e doador.</li>
                        <li><strong>Facilidade:</strong> Criamos uma plataforma intuitiva para facilitar o processo de adoção.</li>
                        <li><strong>Segurança:</strong> Alertamos sobre golpes e reforçamos a importância de adoções responsáveis.</li>
                    </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-teal-500 mb-2">Junte-se a Nós!</h2>
                    <p className="text-gray-700">
                        Se você está buscando um novo amigo ou deseja dar uma nova chance para um pet, explore nossa plataforma.
                        Compartilhe com amigos e familiares para que mais animais encontrem um lar cheio de amor e carinho.
                    </p>
                </div>

                <p className="text-center text-lg font-semibold text-teal-600">
                    "Adotar é um ato de amor! Dê uma nova chance a um pet hoje mesmo." 🐾
                </p>
            </section>
        </Container>
    );
}
