import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoDeConta = () => {
    return <div> 
        <Bar
        data={{
            labels: ['Conta de Agua', 'Condominio', 'Financiamento Casa', 'Conta de Telefone', 'Internet', 'Dentista','Faculdade'],
            datasets: [
                {
                    label: 'Grafico de contas',
                    data: [42, 241.22 , 744.84 , 62.84 , 98.87, 85, 150],
                    backgroundColor: [
                        'rgba(255, 99, 132, 2)',
                        'rgba(54, 162, 235, 2)',
                        'rgba(255, 206, 86, 2)',
                        'rgba(75, 192, 192, 2)',
                        'rgba(153, 102, 255,2)',
                        'rgba(255, 159, 64, 2)'
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
/*                 {
                    label: 'Pagas',
                    data: [4, 4 , 5 , 8 , 9, 3, 4],
                    backgroundColor: 'orange',
                    borderColor: 'red'
                }, */
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

export default GraficoDeConta