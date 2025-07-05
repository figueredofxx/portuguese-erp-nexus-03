
import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Download, FileText, Calendar, TrendingUp } from "lucide-react"

// Mock data for charts
const salesData = [
  { mes: "Jan", vendas: 25000, lucro: 8500 },
  { mes: "Fev", vendas: 32000, lucro: 11200 },
  { mes: "Mar", vendas: 28000, lucro: 9800 },
  { mes: "Abr", vendas: 35000, lucro: 12250 },
  { mes: "Mai", vendas: 42000, lucro: 14700 },
  { mes: "Jun", vendas: 38000, lucro: 13300 }
]

const productsData = [
  { produto: "iPhone 15", vendas: 45, faturamento: 382500 },
  { produto: "Samsung Galaxy", vendas: 32, faturamento: 134400 },
  { produto: "MacBook Air", vendas: 12, faturamento: 150000 },
  { produto: "AirPods Pro", vendas: 67, faturamento: 120600 },
  { produto: "iPad Air", vendas: 23, faturamento: 138000 }
]

const stockData = [
  { produto: "iPhone 15 Pro", estoque: 2, status: "Crítico" },
  { produto: "Galaxy S24", estoque: 8, status: "Baixo" },
  { produto: "MacBook Air", estoque: 15, status: "Normal" },
  { produto: "AirPods Pro", estoque: 3, status: "Crítico" },
  { produto: "iPad Air", estoque: 12, status: "Normal" }
]

const expenseDistribution = [
  { name: "Produtos", value: 85000, color: "#8884d8" },
  { name: "Aluguel", value: 2500, color: "#82ca9d" },
  { name: "Energia", value: 380, color: "#ffc658" },
  { name: "Marketing", value: 1200, color: "#ff7300" },
  { name: "Outros", value: 920, color: "#00ff88" }
]

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleExportPDF = (reportType: string) => {
    console.log(`Exportando relatório ${reportType} em PDF...`)
    // Implement PDF export logic here
  }

  const handleExportExcel = (reportType: string) => {
    console.log(`Exportando relatório ${reportType} em Excel...`)
    // Implement Excel export logic here
  }

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground">
              Análise detalhada do desempenho do seu negócio
            </p>
          </div>
        </div>

        {/* Period Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label>Período</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Esta Semana</SelectItem>
                    <SelectItem value="month">Este Mês</SelectItem>
                    <SelectItem value="quarter">Este Trimestre</SelectItem>
                    <SelectItem value="year">Este Ano</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPeriod === "custom" && (
                <>
                  <div>
                    <Label>Data Inicial</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Data Final</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Vendas por Mês</CardTitle>
                    <CardDescription>Evolução das vendas e lucro</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportPDF("vendas-mensal")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportExcel("vendas-mensal")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
                      <Line type="monotone" dataKey="vendas" stroke="#4141e1" strokeWidth={2} />
                      <Line type="monotone" dataKey="lucro" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo de Vendas</CardTitle>
                  <CardDescription>Métricas principais do período</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Vendas</p>
                      <p className="text-2xl font-bold">R$ 260.000,00</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Médio</p>
                      <p className="text-2xl font-bold">R$ 1.847,00</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Produtos Vendidos</p>
                      <p className="text-2xl font-bold">179</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Produtos Mais Vendidos</CardTitle>
                  <CardDescription>Ranking por quantidade e faturamento</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportPDF("produtos-ranking")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={productsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="produto" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vendas" fill="#4141e1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Status do Estoque</CardTitle>
                  <CardDescription>Produtos com estoque baixo ou crítico</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportPDF("estoque-status")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.produto}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.estoque} unidades em estoque
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        item.status === 'Crítico' 
                          ? 'bg-red-100 text-red-800' 
                          : item.status === 'Baixo'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Distribuição de Despesas</CardTitle>
                  <CardDescription>Onde seu dinheiro está sendo gasto</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportPDF("despesas-distribuicao")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={expenseDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  )
}
