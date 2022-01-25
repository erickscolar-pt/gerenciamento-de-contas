import { useState, useContext } from 'react';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import iconGoogle from '../../assets/google.png';
import GoogleLogin from 'react-google-login';

function SignUp() {

  //Const para armazena Email e Senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState(Number);

  const { signUp } = useContext(AuthContext);

  const responseGoogle = (response) => {
    console.log(response);
    const { 
      profileObj: { name, email,imageUrl } 
    } = response;
    setNome(name);
    setEmail(email);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(nome !== '' && email !== '' && password !== '' && salario !== 0){
      signUp(email, password, nome, Number(salario)) 
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
          <input type="text" placeholder="Nome" value={nome} onChange={ (e) => setNome(e.target.value) }/>
          <input type="number" step="0.01" min="0.01" placeholder="Salario" onChange={ (e) => setSalario(e.target.value) }/>
          <button type="submit">Cadastrar</button>
{/*           <figure className='btn-google'>
            <a href='#'><img src={iconGoogle} alt='Google' width={40} height={40}/></a>
          </figure> */}

          <div className='area-btn-google'>
            <GoogleLogin
              className='btn-google'
              clientId="164186316270-fe96fm2v5f0a79lt819filn9rc0s6ec2.apps.googleusercontent.com"
              buttonText="Preencher com Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>


        </form>
        <Link className='route-login' to="/signin">Possui conta? Entrar</Link>
      </div>
    </div>
  );
}

export default SignUp;
