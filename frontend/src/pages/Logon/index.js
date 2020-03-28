import React from 'react';
import { Link } from 'react-router-dom';

//import do pacote de icone react-icons
import { FiLogIn } from 'react-icons/fi';

//import do css da pagina de login
import './styles.css'

//imagens sao importados como componentes, tudo como javascript.
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"></img>

        <form>
          <h1>Faça Seu Login.</h1>

          <input placeholder="Sua ID"/>
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>

    </div>
  );
}