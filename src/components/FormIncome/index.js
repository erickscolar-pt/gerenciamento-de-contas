import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import React, {Component, useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';


export default function FormIncome(){
  const [nomePagante, setNomePagante] = useState(''); 
  const [valorPagante, setValorPagante] = useState('');
  const [tipoRenda, setTipoRenda] = useState('');
  const [selectAno, setSelectAno] = useState('');
  const [selectMes, setSelectMes] = useState('');
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const{user, setUser, storageUser} = useContext(AuthContext);
  const [email] = useState(user && user.email);
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
  const selectRenda = [
    {
      label: "Selecione um item",
      value: "null",
    },
    {
      label: "Salario",
      value: "salario",
    },
    {
      label: "Plus",
      value: "plus",
    },
    {
      label: "Venda",
      value: "venda",
    },
    {
      label: "Renda extra",
      value: "rendaextra",
    },
    {
      label: "Outros",
      value: "outros",
    },
  ];


    let anos = []
    let i=2000
       
        for(;i<=2080;i++){
          anos.push(<option value={i}>{i}</option>)
        }

        async function buscaListaRenda(){
          await firebase.firestore().collection('rendas_' + email + '_' + selectMes + '_' + selectAno)
          .get()
          .then((snapshot)=>{
            let lista = [];
  
            snapshot.forEach((doc)=>{
              lista.push({
                id: doc.id,
                nomePagante: doc.data().nomePagante,
                valorPagante: doc.data().valorPagante,
                tipoRenda: doc.data().tipoRenda
              })
            })
            setListaObjetivos(lista);
          })
          .catch(()=>{
            console.log('deu ruim')
          })
        }

        async function excluirRenda(id){
          await firebase.firestore().collection('rendas_' + email + '_' + selectMes + '_' + selectAno).doc(id)
          .delete()
          .then(()=>{
            toast.success("Conta excluida");
          })
          .catch(()=>{
            toast.error("Não foi possivel excluir, tente novamente mais tarde ...");
          })
        }

              /*Adicionando dados ao banco Firebase*/
      async function handleAddRenda(){
        var aleatorio = new Uint32Array(1);
        window.crypto.getRandomValues(aleatorio);

        console.log(aleatorio);
        if(selectMes == "" || selectAno == "" ){
          toast.error("Selecione o mês e o ano ...");
        } else if(nomePagante == "") {
          toast.error("Preencha o nome pagante ...");
        } else if(valorPagante == "") {
          toast.error("Preencha o valor do pagamento ...");
        } else if(tipoRenda == ""){
          toast.error("Selecione o tipo da renda ...");
        } else {
        
        await firebase.firestore().collection('rendas_' + email + '_' + selectMes + '_' + selectAno)
        .doc(selectMes + selectAno + '_' + aleatorio)
        .set({
          selectMes: selectMes,
          selectAno: selectAno,
          nomePagante: nomePagante,
          valorPagante: Number(valorPagante),
          tipoRenda: tipoRenda
        })
        .then(()=>{
          toast.success("Salvo com sucesso");
          setNomePagante('');
          setValorPagante('');
          setTipoRenda('');
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
            <div className="form-income" >
            <div className="pesquisar">
                    <button onClick={buscaListaRenda}><AiOutlineSearch color="#ffff" size={25} />Pesquisar</button>
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
              {listaObjetivos.map((income)=>{
                return(
                  <li key={income.id}>
                    <div className="adds-income-inputs">
                    <button type="submit" onClick={ ()=> excluirRenda(income.id)}>
                    <AiFillCloseCircle color="#A10091" size={25} />
                    </button>

                    <input disabled={true} className="input-nome-conta" type="text" placeholder="Nome do Pagante" value={income.nomePagante} />
                    <NumberFormat disabled={true} thousandSeparator={true} prefix={'R$'} placeholder="Valor total R$" value={income.valorPagante} />


                    <select disabled={true} value={income.tipoRenda}>
                    {selectRenda.map((selectRenda) => (
                    <option value={selectRenda.value}>{selectRenda.label}</option>
                    ))}
                    </select>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="adds-income-inputs">
                <button type="submit">
                    <AiFillCloseCircle color="#EFEFEF" size={25} />
                </button>

                <input className="input-nome-conta" type="text" placeholder="Nome do Pagante" value={nomePagante} onChange={(e) => setNomePagante(e.target.value)}/>
                <NumberFormat thousandSeparator={false} placeholder="Valor total R$" value={valorPagante} onChange={(e) => setValorPagante(e.target.value)}/>


                <select value={tipoRenda} onChange={(e) => setTipoRenda(e.target.value)}>
                    {selectRenda.map((selectRenda) => (
                      <option value={selectRenda.value}>{selectRenda.label}</option>
                    ))}
                </select>
            </div>

            <div className="salvar">
            <button onClick={handleAddRenda} type="submit">Salvar</button>
            </div>
            </div>
        </div>
    );
}