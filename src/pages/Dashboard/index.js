import Header from '../../components/Header';
import Title from '../../components/Title';
import GraficoDeConta from '../../components/GraficoDeConta';
import GraficoContaAnoMes from '../../components/GraficoContaAnoMes';

export default function Dashboard(){
  return(
    <div>
      <Header/>

      <div className="content">
          <Title name="Painel Principal"/>
          <GraficoDeConta/>
          <GraficoContaAnoMes/>
      </div>
    </div>
  )
}