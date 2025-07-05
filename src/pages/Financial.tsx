
import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Calculator, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockExpenses = [
  { id: 1, tipo: "Fixa", descricao: "Aluguel", valor: 2500.00, data: "2024-01-01" },
  { id: 2, tipo: "Variável", descricao: "Frete", valor: 150.00, data: "2024-01-22" },
  { id: 3, tipo: "Fixa", descricao: "Energia", valor: 380.00, data: "2024-01-05" }
]

const mockCashFlow = [
  { data: "2024-01-22", tipo: "Entrada", descricao: "Venda - João Silva", valor: 8545.00 },
  { data: "2024-01-22", tipo: "Entrada", descricao: "Venda - Ana Costa", valor: 4200.00 },
  { data: "2024-01-22", tipo: "Saída", descricao: "Frete", valor: -150.00 },
  { data: "2024-01-21", tipo: "Entrada", descricao: "Venda - Carlos", valor: 12850.00 }
]

export default function Financial() {
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false)
  const [isCashDialogOpen, setIsCashDialogOpen] = useState(false)
  const [expenseForm, setExpenseForm] = useState({
    tipo: "",
    descricao: "",
    valor: "",
    data: ""
  })
  const [profitCalculator, setProfitCalculator] = useState({
    custoCompra: "",
    precoVenda: "",
    margem: 0,
    lucro: 0
  })
  const { toast } = useToast()

  const totalEntradas = mockCashFlow
    .filter(item => item.tipo === "Entrada")
    .reduce((sum, item) => sum + item.valor, 0)

  const totalSaidas = mockCashFlow
    .filter(item => item.tipo === "Saída")
    .reduce((sum, item) => sum + Math.abs(item.valor), 0)

  const totalDespesas = mockExpenses.reduce((sum, expense) => sum + expense.valor, 0)
  const saldoAtual = totalEntradas - totalSaidas - totalDespesas

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Despesa cadastrada!",
      description: `${expenseForm.descricao} foi adicionada com sucesso.`,
    })
    setIsExpenseDialogOpen(false)
    setExpenseForm({ tipo: "", descricao: "", valor: "", data: "" })
  }

  const calculateProfit = () => {
    const custo = parseFloat(profitCalculator.custoCompra) || 0
    const venda = parseFloat(profitCalculator.precoVenda) || 0
    const lucro = venda - custo
    const margem = custo > 0 ? ((lucro / venda) * 100) : 0
    
    setProfitCalculator(prev => ({
      ...prev,
      lucro,
      margem
    }))
  }

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
            <p className="text-muted-foreground">
              Controle suas finanças, despesas e margem de lucro
            </p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas Fixas</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cash-flow" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cash-flow">Fluxo de Caixa</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
            <TabsTrigger value="profit-calculator">Calculadora de Margem</TabsTrigger>
          </TabsList>

          <TabsContent value="cash-flow" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                  <CardDescription>Entradas e saídas do dia</CardDescription>
                </div>
                <Dialog open={isCashDialogOpen} onOpenChange={setIsCashDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Lançamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Lançamento</DialogTitle>
                      <DialogDescription>
                        Registre uma entrada ou saída manual
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tipo" className="text-right">Tipo</Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Entrada ou Saída" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entrada">Entrada</SelectItem>
                            <SelectItem value="saida">Saída</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="descricao" className="text-right">Descrição</Label>
                        <Input id="descricao" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="valor" className="text-right">Valor</Label>
                        <Input id="valor" type="number" step="0.01" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Salvar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCashFlow.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(item.data).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.tipo === 'Entrada' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.tipo}
                          </span>
                        </TableCell>
                        <TableCell>{item.descricao}</TableCell>
                        <TableCell className={`font-medium ${
                          item.valor > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          R$ {Math.abs(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Despesas</CardTitle>
                  <CardDescription>Gerencie suas despesas fixas e variáveis</CardDescription>
                </div>
                <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Despesa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Despesa</DialogTitle>
                      <DialogDescription>
                        Cadastre uma nova despesa fixa ou variável
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleExpenseSubmit} className="space-y-4">
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="tipo">Tipo de Despesa</Label>
                          <Select value={expenseForm.tipo} onValueChange={(value) => 
                            setExpenseForm(prev => ({ ...prev, tipo: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fixa">Fixa</SelectItem>
                              <SelectItem value="Variável">Variável</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="descricao">Descrição</Label>
                          <Input
                            id="descricao"
                            value={expenseForm.descricao}
                            onChange={(e) => setExpenseForm(prev => ({ ...prev, descricao: e.target.value }))}
                            placeholder="Ex: Aluguel, Energia, Frete..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="valor">Valor (R$)</Label>
                          <Input
                            id="valor"
                            type="number"
                            step="0.01"
                            value={expenseForm.valor}
                            onChange={(e) => setExpenseForm(prev => ({ ...prev, valor: e.target.value }))}
                            placeholder="0,00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="data">Data</Label>
                          <Input
                            id="data"
                            type="date"
                            value={expenseForm.data}
                            onChange={(e) => setExpenseForm(prev => ({ ...prev, data: e.target.value }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsExpenseDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Cadastrar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            expense.tipo === 'Fixa' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {expense.tipo}
                          </span>
                        </TableCell>
                        <TableCell>{expense.descricao}</TableCell>
                        <TableCell className="font-medium text-red-600">
                          R$ {expense.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          {new Date(expense.data).toLocaleDateString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profit-calculator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculadora de Margem de Lucro
                </CardTitle>
                <CardDescription>
                  Calcule a margem de lucro de seus produtos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custo">Custo de Compra (R$)</Label>
                      <Input
                        id="custo"
                        type="number"
                        step="0.01"
                        value={profitCalculator.custoCompra}
                        onChange={(e) => setProfitCalculator(prev => ({ 
                          ...prev, 
                          custoCompra: e.target.value 
                        }))}
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="venda">Preço de Venda (R$)</Label>
                      <Input
                        id="venda"
                        type="number"
                        step="0.01"
                        value={profitCalculator.precoVenda}
                        onChange={(e) => setProfitCalculator(prev => ({ 
                          ...prev, 
                          precoVenda: e.target.value 
                        }))}
                        placeholder="0,00"
                      />
                    </div>
                    <Button onClick={calculateProfit} className="w-full">
                      Calcular
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                          <p className="text-sm text-muted-foreground">Lucro</p>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {profitCalculator.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                          <p className="text-sm text-muted-foreground">Margem de Lucro</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {profitCalculator.margem.toFixed(2)}%
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  )
}
