import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoContaAnoMes = () => {
    return <div> 
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