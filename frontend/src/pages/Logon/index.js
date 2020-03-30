import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//import do pacote de icone react-icons
import { FiLogIn } from 'react-icons/fi';

//import da api para conectar no back-end
import api from '../../services/api';

//import do css da pagina de login
import './styles.css'

//imagens sao importados como componentes, tudo como javascript.
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName',response.data.name);

      history.push('/profile');
      
    } catch (error) {
      alert('Id invalido, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"></img>

        <form onSubmit={handleLogin}>
          <h1>Faça Seu Login.</h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
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