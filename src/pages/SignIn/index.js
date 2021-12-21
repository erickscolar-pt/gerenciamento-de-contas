import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import './signin.css';
import logo from '../../assets/Logo.png';
import { toast } from 'react-toastify';

function SignIn() {

  //Const para armazena Email e Senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();


    if(email !== '' && password !== ''){
      signIn(email, password)
    }else{
      toast.error('Preencha login e senha, tente novamente ...');
    }

  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Gerenciamento de Contas Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="E-mail" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value) } />
          <button type="submit">Entrar</button>
        </form>
        <Link to="./register">Não possui conta? Cadastrar</Link>
      </div>
    </div>
  );
}

export default SignIn;
