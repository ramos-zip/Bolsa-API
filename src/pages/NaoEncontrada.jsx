import { Link } from "react-router";
export default function NaoEncontrada() {
    return(
        <section>
            <h1>Página não encontrada.</h1>
            <p>O endereço informado não corresponde a uma página do projeto. </p>
            <Link to="/">Voltar ao catálogo</Link>
        </section>
    );
}