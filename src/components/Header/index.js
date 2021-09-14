import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { BiExit, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export default function Header(){
    const { user, signOut } = useContext(AuthContext);    

    return(
        <div className="sidebar">
            <div className="avatar">
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
            </div>

            <Link to="/dashboard">
                Painel Principal
            </Link>

            <Link to="/MyBills">
                Minhas Contas
            </Link>

            <Link to="/MyGoals">
                Meus Objetivos
            </Link>

            <Link to="/Income">
                Rendas
            </Link>
            
            <Link className="btn btn-exit" onClick={ () => signOut()}>
                <BiExit color="#000" size={50}/>
            </Link>

            <Link className="btn btn-perfil" to="/Profile">
                <BiUser color="#000" size={50}/>
            </Link>


        </div>
    )
} 