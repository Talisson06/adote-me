import { Container } from "../../components/container";

export  function PrivacyPolicy() {
    return (
        <Container>
            <div className="max-w-3xl mx-auto my-5 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Política de Privacidade - Adote-me</h1>
                <p className="text-gray-700 mb-4">Última atualização: [data]</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">1. Introdução</h2>
                <p className="text-gray-700">Bem-vindo à <strong>Adote-me</strong>! Nossa plataforma conecta pessoas interessadas na adoção de animais. Priorizamos a segurança e privacidade dos usuários e garantimos um ambiente confiável.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">2. Coleta e Uso de Informações</h2>
                <h3 className="text-xl font-medium mt-4">2.1. Dados Coletados</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Nome e contato do responsável pelo animal (se fornecido).</li>
                    <li>Informações sobre o pet, como nome, idade, raça e localização.</li>
                    <li>Imagens do pet enviadas pelo responsável.</li>
                </ul>
                <p className="text-gray-700 mt-2">Não coletamos dados financeiros, documentos pessoais ou endereço completo.</p>

                <h3 className="text-xl font-medium mt-4">2.2. Uso das Informações</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Exibição dos anúncios de adoção.</li>
                    <li>Facilitação do contato entre adotantes e doadores.</li>
                    <li>Melhoria contínua da plataforma.</li>
                </ul>
                <p className="text-gray-700 mt-2">A <strong>Adote-me</strong> <strong>não vende</strong> ou compartilha dados com terceiros para fins comerciais.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">3. Segurança das Informações</h2>
                <p className="text-gray-700">Empregamos medidas de segurança para proteger os dados dos usuários, mas não podemos garantir segurança absoluta contra ataques cibernéticos.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">4. Isenção de Responsabilidade</h2>

                <h3 className="text-xl font-medium mt-4">4.1. Golpes e Fraudes</h3>
                <p className="text-gray-700">A <strong>Adote-me</strong> apenas divulga animais para adoção. <strong>Não intermediamos transações financeiras</strong> e não garantimos a veracidade das informações fornecidas pelos usuários.</p>
                <p className="text-gray-700 mt-2 font-bold">⚠️ Fique atento:</p>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Nunca realize pagamentos antecipados.</li>
                    <li>Combine encontros em locais públicos.</li>
                    <li>Desconfie de pedidos suspeitos ou urgentes.</li>
                </ul>
                <p className="text-red-600 font-bold mt-2">A <strong>Adote-me NÃO SE RESPONSABILIZA</strong> por golpes ou fraudes praticados por terceiros.</p>

                <h3 className="text-xl font-medium mt-4">4.2. Conteúdo e Imagens</h3>
                <p className="text-gray-700">As informações dos pets são de responsabilidade dos usuários que as publicam. Caso identifique conteúdos falsos, entre em contato conosco.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">5. Direitos dos Usuários</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Acessar, corrigir ou remover seus dados da plataforma.</li>
                    <li>Solicitar a exclusão de informações pessoais.</li>
                    <li>Reportar anúncios suspeitos.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">6. Alterações nesta Política</h2>
                <p className="text-gray-700">Esta política pode ser atualizada periodicamente. Recomendamos a leitura regular deste documento.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contato</h2>
                <p className="text-gray-700">Caso tenha dúvidas, entre em contato pelo e-mail: <strong>seuemail@adoteme.com</strong></p>
            </div>
        </Container>
    );
}