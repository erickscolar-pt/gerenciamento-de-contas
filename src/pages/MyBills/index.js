import Header from '../../components/Header';
import Title from '../../components/Title';
import './mybills.css';

import FormBills from '../../components/FormBills';

export default function MyBills(){
  return(
    <div>
      <Header/>
      <div className="content">
        <Title name="Minhas Conta"/>
        <FormBills/>
      </div>
    </div>
  )
}