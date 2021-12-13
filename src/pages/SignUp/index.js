import { useState, useContext } from 'react';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


function SignUp() {

  //Const para armazena Email e Senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState(Number);

  const { signUp } = useContext(AuthContext);


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
          <input type="number" step="0.01" min="0.01" placeholder="Salario" value={salario} onChange={ (e) => setSalario(e.target.value) }/>
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Possui conta? Entrar</Link>
      </div>
    </div>
  );
}

export default SignUp;
