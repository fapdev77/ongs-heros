import React from 'react';
import { Link } from 'react-router-dom';

//import do pacote de icone react-icons
import { FiArrowLeft } from 'react-icons/fi';

//import do css da pagina de login
import './styles.css'

//imagens sao importados como componentes, tudo como javascript.
import logoImg from '../../assets/logo.svg';


export default function Register() {
  return (
    <div className="register-container">
      <div className="content">
        
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos de sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para logon.
          </Link>

        </section>
        
        <form >
          <input placeholder="Nome da ONG"/>
          <input type="email" placeholder="E-mail"/>
          <input placeholder="Whatsapp"/>
          
          <div className="input-group">
            <input placeholder="Cidade"/>
            <input placeholder="UF" style={{ width: 80 }} />
          </div>
          <button type="submit" className="button">Cadastrar</button>

        </form>
      
      </div>
    </div>
  );
}