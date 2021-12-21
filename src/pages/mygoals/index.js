import Header from '../../components/Header';
import Title from '../../components/Title';
import './mygoals.css'
import FormGoals from '../../components/FormGoals'

export default function mygoals(){

   return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Objetivos"/>

                <FormGoals/>


            </div>
        </div>


    )
}