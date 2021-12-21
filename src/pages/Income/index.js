import Header from '../../components/Header';
import Title from '../../components/Title';
import './income.css';
import FormIncome from '../../components/FormIncome'


export default function Income(){
    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Rendas"/>
            <FormIncome/>

            </div>
        </div>
    )
}