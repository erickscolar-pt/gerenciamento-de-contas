import React, { Component, useState, useContext } from 'react';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export default function FormGoals(){
  const [nomeConta, setNomeConta] = useState(''); 
  const [valorTotalObjetivo, setValorTotalObjetivo] = useState('');
  const [valorMesObjetivo, setValorMesObjetivo] = useState('');
  const [selectAno, setSelectAno] = useState('');
  const [selectMes, setSelectMes] = useState('');
  const [listaObjetivos, setListaObjetivos] = useState([]);
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

        for(;i<=2080;i++){
          anos.push(<option value={i}>{i}</option>)
        }

        async function buscaListaObjetivos(){
          await firebase.firestore().collection('objetivos_' + email + '_' + selectMes + '_' + selectAno)
          .get()
          .then((snapshot)=>{
            let lista = [];
  
            snapshot.forEach((doc)=>{
              lista.push({
                id: doc.id,
                nomeConta: doc.data().nomeConta,
                valorTotalObjetivo: doc.data().valorTotalObjetivo,
                valorMesObjetivo: doc.data().valorMesObjetivo
              })
            })
            setListaObjetivos(lista);
          })
          .catch(()=>{
            console.log('deu ruim')
          })
        }

        async function excluirObjetivo(id){
          await firebase.firestore().collection('objetivos_' + email + '_' + selectMes + '_' + selectAno).doc(id)
          .delete()
          .then(()=>{
            toast.success("Conta excluida");
          })
          .catch(()=>{
            toast.error("Não foi possivel excluir, tente novamente mais tarde ...");
          })
        }

      /*Adicionando dados ao banco Firebase*/
      async function handleAddObjetivos(){
        var aleatorio = new Uint32Array(1);
        window.crypto.getRandomValues(aleatorio);

        console.log(aleatorio);
        if(selectMes == "" || selectAno == "" ){
          toast.error("Selecione o mês e o ano ...");
        } else if(nomeConta == "") {
          toast.error("Preencha o nome da objetivo ...");
        } else if(valorTotalObjetivo == "") {
          toast.error("Preencha o valor total do objetivo ...");
        } else if(valorMesObjetivo == ""){
          toast.error("Preencha o valor do objetivo ...");
        } else {

        
        await firebase.firestore().collection('objetivos_' + email + '_' + selectMes + '_' + selectAno)
        .doc(selectMes + selectAno + '_' + aleatorio)
        .set({
          selectMes: selectMes,
          selectAno: selectAno,
          nomeConta: nomeConta,
          valorTotalObjetivo: Number(valorTotalObjetivo),
          valorMesObjetivo: Number(valorMesObjetivo)
        })
        .then(()=>{
          toast.success("Salvo com sucesso");
          setNomeConta('');
          setValorTotalObjetivo('');
          setValorMesObjetivo('');
        })
        .catch((error)=>{
          console.log('deu ruim' + error);
          toast.error("Não foi possivel salvar, tente novamente mais tarde ...");
        })
      }

      }

    return(
        <div>
            <div className="page">
            <div className="form-goals" >
                  <div className="pesquisar">
                          <button onClick={buscaListaObjetivos}><AiOutlineSearch color="#ffff" size={25} />Pesquisar</button>
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
                  {listaObjetivos.map((goals)=>{
                    return(
                      <li key={goals.id}>
                        <div className="adds-goals-inputs">
                          <button type="submit" onClick={ ()=> excluirObjetivo(goals.id)}>
                          <AiFillCloseCircle color="#A10091" size={25} />
                          </button>

                          <input disabled={true} className="input-nome-conta" type="text" placeholder="Nome do Objetivo" value={goals.nomeConta}/>
                          <NumberFormat disabled={true} prefix={'R$'} thousandSeparator={false} placeholder="Valor total R$" value={goals.valorTotalObjetivo}/>
                          <NumberFormat disabled={true} prefix={'R$'} thousandSeparator={false} placeholder="Valor por mês R$" value={goals.valorMesObjetivo}/>
                        </div>
                      </li>
                    )
                  })}
                </ul>

            <div className="adds-goals-inputs">
              <button type="submit">
              <AiFillCloseCircle color="#EFEFEF" size={25} />
              </button>

              <input className="input-nome-conta" type="text" placeholder="Nome do Objetivo" value={nomeConta} onChange={(e) => setNomeConta(e.target.value)} />
              <NumberFormat thousandSeparator={false} placeholder="Valor total R$" value={valorTotalObjetivo} onChange={(e) => setValorTotalObjetivo(e.target.value)} />
              <NumberFormat thousandSeparator={false} placeholder="Valor por mês R$" value={valorMesObjetivo} onChange={(e) => setValorMesObjetivo(e.target.value)}  />
            </div>

            <div className="salvar">
                <button onClick={handleAddObjetivos} type="submit">Salvar</button>
            </div>

            </div>
        </div>
    )
}



