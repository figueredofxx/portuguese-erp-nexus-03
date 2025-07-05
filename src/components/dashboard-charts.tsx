import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Configurações base dos gráficos
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        borderDash: [2, 2],
        color: 'hsl(220 13% 91%)',
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        }
      }
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        }
      }
    }
  }
}

// Gráfico de Vendas por Dia (Linha)
export function SalesLineChart() {
  const data = {
    labels: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
    datasets: [
      {
        label: 'Vendas (R$)',
        data: [1200, 1900, 800, 2100, 1500, 2800, 2200],
        borderColor: 'hsl(241 76% 56%)',
        backgroundColor: 'hsl(241 76% 56% / 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="font-title">Vendas por Dia</CardTitle>
        <CardDescription>Últimos 7 dias - Faturamento em R$</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={data} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

// Gráfico de Produtos com Baixo Estoque (Barras)
export function LowStockChart() {
  const data = {
    labels: ['iPhone 14', 'Galaxy S23', 'AirPods Pro', 'iPad Air', 'MacBook Air'],
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: [2, 1, 3, 1, 0],
        backgroundColor: [
          'hsl(0 84% 60%)',      // Vermelho para crítico
          'hsl(38 92% 50%)',     // Amarelo para baixo
          'hsl(38 92% 50%)',     // Amarelo para baixo
          'hsl(0 84% 60%)',      // Vermelho para crítico
          'hsl(0 84% 60%)',      // Vermelho para esgotado
        ],
        borderRadius: 4,
      },
    ],
  }

  const options = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Estoque Baixo</CardTitle>
        <CardDescription>Top 5 produtos com pouco estoque</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

// Gráfico de Distribuição de Receitas/Despesas (Pizza)
export function RevenueExpensesChart() {
  const data = {
    labels: ['Receitas', 'Despesas Fixas', 'Despesas Variáveis', 'Lucro Líquido'],
    datasets: [
      {
        data: [85000, 25000, 15000, 45000],
        backgroundColor: [
          'hsl(142 76% 36%)',    // Verde para receitas
          'hsl(38 92% 50%)',     // Amarelo para despesas fixas
          'hsl(0 84% 60%)',      // Vermelho para despesas variáveis
          'hsl(241 76% 56%)',    // Azul para lucro
        ],
        borderWidth: 2,
        borderColor: 'hsl(0 0% 100%)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: R$ ${value.toLocaleString('pt-BR')} (${percentage}%)`
          }
        }
      }
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">Distribuição Financeira</CardTitle>
        <CardDescription>Receitas vs Despesas - Mês Atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

// Cards de Métricas
export function MetricsCards() {
  const metrics = [
    {
      title: "Vendas Hoje",
      value: "R$ 3.420,00",
      change: "+12,5%",
      positive: true,
      description: "vs. ontem"
    },
    {
      title: "Produtos Vendidos",
      value: "87",
      change: "+8,2%",
      positive: true,
      description: "vs. ontem"
    },
    {
      title: "Estoque Crítico",
      value: "12",
      change: "+3",
      positive: false,
      description: "produtos"
    },
    {
      title: "Clientes Ativos",
      value: "1.234",
      change: "+45",
      positive: true,
      description: "este mês"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-text">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-title text-foreground">
              {metric.value}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={`font-medium ${
                metric.positive ? 'text-success' : 'text-destructive'
              }`}>
                {metric.change}
              </span>
              <span className="ml-1">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}