import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';


const GraficoContaAnoMes = () => {
    const{user, setUser, storageUser} = useContext(AuthContext);
    const [email] = useState(user && user.email);
    const [nomeConta, setNomeConta] = useState(''); 
    const [listaDados, setListaDados] = useState('');
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


      let parametros = []

      let i=2000
      for(;i<=2080;i++){
        meses.map((meses)=>(
            parametros.push({
                ano: i,
                mes: meses.value
            }))
        );
    }


    let parmObje = [];
    //let parmRendas = '';

    parametros.map((parametros)=>{
        //console.log('dividas_' + email + '_' + parametros.mes + '_' + parametros.ano);
        parmObje    = ['objetivos_' + email + '_' + parametros.mes + '_' + parametros.ano];
        //parmRendas  = 'rendas_' + email + '_' + parametros.mes + '_' + parametros.ano;                     
        //console.log(parmObje)
        async function buscaDividas(){
          await firebase.firestore().collection(parmObje)
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
            setListaDados(lista);
            console.log(lista)
          })
          .catch(()=>{
            console.log('deu ruim')
          })
        }
    })

    //console.log(parmRendas)




    return<div> 
        <Bar
        data={{
            labels: ['2018', '2019', '2020', '2021', '2022', '2023','2024'],
            datasets: [
                {
                    label: 'Contas Ano',
                    data: [16957.89 , 14546.10 , 25764.12 , 27298.56 , 34592.89, 34333, 42667.02],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)'
                    ],
                    borderWidth: 2,
                    borderRadius: 4,
                },
                {
                    label: 'Média Mês',
                    data: [1242.56, 998.58 , 1534.78 , 1611.45 , 1756, 1922.13 , 2231.45],
                    backgroundColor: 'red',
                    borderColor: 'black'
                },
            ],
        }}
        height={200}
        options={{
            maintainAspectRatio: false,
            scales: {
                yAxes: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            }
        }}
        />
    </div>
}

export default GraficoContaAnoMes