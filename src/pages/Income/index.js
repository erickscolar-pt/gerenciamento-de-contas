import Header from '../../components/Header';
import Title from '../../components/Title';
import { AiFillPlusCircle, AiFillCloseCircle } from 'react-icons/ai';
import './income.css';
import NumberFormat from 'react-number-format';

export default function Income(){
    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Rendas"/>

                <div className="page">
            <form className="form-income" >
              <div className="incluir-conta">
                <div>
                  <button type="submit">
                    <div className="icon">
                      <AiFillPlusCircle color="#A10091" size={25} />
                    </div>
                  </button>
                    <a>Adicionar conta</a>
                </div>
              <select>
                  <option selected value="Janeiro">Janeiro</option>
                  <option value="Fevereiro">Fevereiro</option>
                  <option value="Março">Março</option>
                  <option value="Abril">Abril</option>
                  <option value="Maio">Maio</option>
                  <option value="Junho">Junho</option>
                  <option value="Julho">Julho</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Setembro">Setembro</option>
                  <option value="Outubro">Outubro</option>
                  <option value="Novembro">Novembro</option>
                  <option value="Dezembro">Dezembro</option>
              </select>
              <select>
                  <option selected value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
              </select>
              </div>
            </form>

          <div className="adds-income-inputs">
            <button type="submit">
              <AiFillCloseCircle color="#A10091" size={25} />
            </button>

            <input className="input-nome-conta" type="text" placeholder="Nome do Pagante"/>
            <NumberFormat thousandSeparator={true} prefix={'R$'} placeholder="Valor total R$"/>


            <select>
              <option selected value="Salario">Salario</option>
              <option value="Plus">Plus</option>
              <option value="Venda">Venda</option>
              <option value="Rendaextra">Renda extra</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="salvar">
            <button type="submit">Salvar</button>
          </div>
          </div>
            </div>
        </div>
    )
}