import React,{Component} from 'react'
import './home.css';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default function Home(){
  

  
  return(
   <div>
      <div className='header'>
        <nav class="topnav">
          <ul>
            <li><Link className='route-register' to="./signin">Logar</Link></li>
            <div class="left"><a href="#about"><img src={logo} /></a></div>
          </ul>
        </nav>
      </div>
      <section className='section'>
        <article></article>
      </section>
      <section className='section-2'>
        <article></article>
      </section>
      <div class="wc_whatsapp_app right">
          <a href="https://wa.me/5511967018114?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho.%20Pode%20fazer%20orçamento%20de%20um%20site?!" target="_blank" class="wc_whatsapp" >
          <span class="wc_whatsapp_primary">
          <span class="close">x</span>
          <img src={logo}/>
          <p>Olá, gostaria de saber mais e fazer um orçamento para um site meu, pode me ajudar ?</p>
          </span>
          </a>
          <a href="https://wa.me/5511967018114" target="_blank" class="wc_whatsapp_secondary" >
          <p>Olá, gostaria de saber mais!</p>
          </a>
      </div>
      <footer>
        <h1>Site desenvolvido por Erick Scolar</h1>
        <a  href="https://wa.me/5511967018114?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho.%20Pode%20fazer%20orçamento%20de%20um%20site?!" target="_blank">Click aqui para contatar.</a>
      </footer>

    </div>
  )
}