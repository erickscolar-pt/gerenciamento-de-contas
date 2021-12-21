import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
//import  DatePicker  from 'react-datepicker';
//import { render } from 'react-dom';
import { toast } from 'react-toastify';

export default function FormBills(){
  const [nomeConta, setNomeConta] = useState(''); 
  const [valorDivida, setValorDivida] = useState('');
  const [nomeDivida, setNomeDivida] = useState('');
  const [selectAno, setSelectAno] = useState('');
  const [selectMes, setSelectMes] = useState('');
  const [listaDividas, setListaDividas] = useState([]);
  const{user, setUser, storageUser} = useContext(AuthContext);
  const [email] = useState(user && user.email);


    let anos = []
    let i=2000

        const meses = [
            {
              label: "Janeiro",
              value: "janeiro",
            },
            {
              label: "Fevereiro",
              value: "fevereiro",
            },
            {
              label: "Março",
              value: "marco",
            },
            {
              label: "Abril",
              value: "abril",
            },
            {
              label: "Maio",
              value: "maio",
            },
            {
              label: "Junho",
              value: "junho",
            },
            {
              label: "Julho",
              value: "julho",
            },
            {
              label: "Agosto",
              value: "agosto",
            },
            {
              label: "Setembro",
              value: "setembro",
            },
            {
              label: "Outubro",
              value: "outubro",
            },
            {
              label: "Novembro",
              value: "novembro",
            },
            {
              label: "Dezembro",
              value: "dezembro",
            }
          ];

        const nomeDividaInput = [
            {
                label: "Selecione um item",
                value: "null",
            },
            {
                label: "Cartão de Crédito",
                value: "cCredito",
            },
            {
                label: "Casa",
                value: "casa",
            },
            {
                label: "Despesa",
                value: "despesa",
            },
            {
                label: "Devendo",
                value: "devendo",
            },
            {
                label: "Emprestimo",
                value: "emprestimo",
            },
            {
              label: "Conta padrão",
              value: "cPadrao",
            },
            {
              label: "Outros",
              value: "outros"
            }
          ];
          
        
          for(;i<=2080;i++){
            anos.push(<option value={i}>{i}</option>)
          }

        /* realtime da lista */
/*         useEffect(()=>{
          async function loadBills(){
            await firebase.firestore().collection('dividas' + 'erick' + selectMes + selectAno)
            .onSnapshot((doc)=>{
              let minhasBills = [];

              doc.forEach((item)=>{
                minhasBills.push({
                  id: item.id,
                  nomeConta: item.data().nomeConta,
                  valorDivida: item.data().valorDivida,
                  nomeDivida: item.data().nomeDivida
                })
              });

              setListaDividas(minhasBills);
            })
          }
          loadBills();
        }) */


      /*Adicionando dados ao banco Firebase*/
      async function handleAddDividas(){
        var aleatorio = new Uint32Array(1);
        window.crypto.getRandomValues(aleatorio);

        console.log(aleatorio);
        if(selectMes == "" || selectAno == "" ){
          toast.error("Selecione o mês e o ano ...");
        } else if(nomeConta == "") {
          toast.error("Preencha o nome do conta ...");
        } else if(valorDivida == "") {
          toast.error("Preencha o valor da conta ...");
        } else if(nomeDivida == ""){
          toast.error("Selecione o nome da divida ...");
        } else {

        await firebase.firestore().collection('dividas_' + email + '_' + selectMes + '_' + selectAno)

        .doc(selectMes + selectAno + '_' + aleatorio)
        .set({
          selectMes: selectMes,
          selectAno: selectAno,
          nomeConta: nomeConta,
          valorDivida: Number(valorDivida),
          nomeDivida: nomeDivida
        })

        .then(()=>{
          toast.success("Salvo com sucesso");
          setNomeConta('');
          setValorDivida('');
          setNomeDivida('');
        })
      
        .catch((error)=>{
          console.log('deu ruim' + error);
          toast.error("Não foi possivel salvar, tente novamente mais tarde ...");
        })
      }
      }

      /* Busca dividas */

      async function buscaDividas(){
        await firebase.firestore().collection('dividas_' + email + '_' + selectMes + '_' + selectAno)
        .get()
        .then((snapshot)=>{
          let lista = [];

          snapshot.forEach((doc)=>{
            lista.push({
              id: doc.id,
              nomeConta: doc.data().nomeConta,
              nomeDivida: doc.data().nomeDivida,
              valorDivida: doc.data().valorDivida
            })
          })
          setListaDividas(lista);
        })
        .catch(()=>{
          console.log('deu ruim')
        })
      }

    async function excluirConta(id){
      await firebase.firestore().collection('dividas_' + email + '_' + selectMes + '_' + selectAno).doc(id)
      .delete()
      .then(()=>{
        toast.success("Conta excluida");
      })
      .catch(()=>{
        toast.error("Não foi possivel excluir, tente novamente mais tarde ...");
      })
    }

        return(
          <div>
                <div className="page">
                  <div className="form-bills" >
                  <div className="pesquisar">
                    <button onClick={buscaDividas}><AiOutlineSearch color="#ffff" size={25} />Pesquisar</button>
                  </div>
                    <div className="incluir-conta">
                    <select value={selectMes} onChange={(e) => setSelectMes(e.target.value)}>
                      {meses.map((meses) => (
                        <option value={meses.value}>{meses.label}</option>
                      ))}
                    </select>
                    <select value={selectAno} onChange={(e) => setSelectAno(e.target.value)}>
                        {anos}
                    </select>
                    </div>
                  </div>

                <ul>
                  {listaDividas.map((bills)=>{
                    return(
                      <li key={bills.id}>
                        <div className="adds-bills-inputs">
                        <button type="submit" onClick={ ()=> excluirConta(bills.id)}>
                          <AiFillCloseCircle color="#A10091" size={25} />
                        </button>

                        <input disabled={true} className="input-nome-conta" type="text" placeholder="Nome da conta" value={bills.nomeConta} />
                        <NumberFormat disabled={true} thousandSeparator={false} prefix={'R$'} placeholder="Valor da conta R$" value={bills.valorDivida} />


                        <select disabled={true} value={bills.nomeDivida} >
                        {nomeDividaInput.map((nomeDividaInput) => (
                              <option value={nomeDividaInput.value}>{nomeDividaInput.label}</option>
                        ))}
                        </select>
                        </div>
                      </li>
                    )
                  })}
                </ul>


                <div className="adds-bills-inputs">
                  <button type="submit">
                    <AiFillCloseCircle color="#EFEFEF" size={25} />
                  </button>

                  <input className="input-nome-conta" type="text" placeholder="Nome da conta" value={nomeConta} onChange={(e) => setNomeConta(e.target.value)}/>
                  <NumberFormat thousandSeparator={false} placeholder="Valor da conta R$" value={valorDivida} onChange={(e) => setValorDivida(e.target.value)}/>


                  <select value={nomeDivida} onChange={(e) => setNomeDivida(e.target.value)}>
                    {nomeDividaInput.map((nomeDividaInput) => (
                    <option value={nomeDividaInput.value}>{nomeDividaInput.label}</option>
                    ))}
                  </select>
                </div>
      
                <div className="salvar">
                  <button onClick={handleAddDividas}>Salvar</button>
                </div>
                </div>
          </div>
        );
  }