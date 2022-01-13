import Header from '../../components/Header';
import Title from '../../components/Title';
import GraficoDeConta from '../../components/GraficoDeConta';
import GraficoContaAnoMes from '../../components/GraficoContaAnoMes';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';

export default function Dashboard(){
  return(
    <div>
      <Header/>

      <div className="content">
          <Title name="Painel Principal"/>
          <div className="pesquisar">
              <button><AiOutlineSearch color="#ffff" size={25} />Pesquisar</button>
          </div>
          <GraficoDeConta/>
          <GraficoContaAnoMes/>
      </div>
    </div>
  )
}