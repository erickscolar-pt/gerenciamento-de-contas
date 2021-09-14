import './title.css';
import logo from '../../assets/Logo.png'


export default function Title({name}){
    return(
        <div className="title">
            <span>{name}</span>
            <img src={logo} alt="Gerenciamento de Contas Logo" />          
        </div>
    )
}