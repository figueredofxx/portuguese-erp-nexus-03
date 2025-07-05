import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, ArrowUpRight, ArrowDownLeft, Package } from "lucide-react"

interface InventoryItem {
  id: string
  productName: string
  brand: string
  currentStock: number
  minStock: number
  maxStock: number
  lastUpdate: string
  cost: number
  stockType: 'quantity' | 'serial'
}

interface StockMovement {
  id: string
  type: 'in' | 'out' | 'transfer'
  productName: string
  quantity: number
  date: string
  user: string
  notes: string
}

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const inventoryItems: InventoryItem[] = [
    {
      id: "1",
      productName: "iPhone 14 Pro 256GB",
      brand: "Apple",
      currentStock: 12,
      minStock: 5,
      maxStock: 50,
      lastUpdate: "2024-01-05",
      cost: 4200,
      stockType: 'serial'
    },
    {
      id: "2",
      productName: "Galaxy S23 Ultra 512GB", 
      brand: "Samsung",
      currentStock: 3,
      minStock: 5,
      maxStock: 30,
      lastUpdate: "2024-01-04",
      cost: 3800,
      stockType: 'serial'
    },
    {
      id: "3",
      productName: "AirPods Pro 2ª Geração",
      brand: "Apple",
      currentStock: 25,
      minStock: 10,
      maxStock: 100,
      lastUpdate: "2024-01-05",
      cost: 1400,
      stockType: 'quantity'
    },
    {
      id: "4",
      productName: "Capinha Transparente",
      brand: "Genérica",
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      lastUpdate: "2024-01-03",
      cost: 25,
      stockType: 'quantity'
    }
  ]

  const stockMovements: StockMovement[] = [
    {
      id: "1",
      type: 'in',
      productName: "iPhone 14 Pro 256GB",
      quantity: 10,
      date: "2024-01-05 14:30",
      user: "João Silva",
      notes: "Recebimento fornecedor"
    },
    {
      id: "2", 
      type: 'out',
      productName: "Galaxy S23 Ultra 512GB",
      quantity: 2,
      date: "2024-01-05 11:15",
      user: "Maria Santos",
      notes: "Venda PDV"
    },
    {
      id: "3",
      type: 'transfer',
      productName: "AirPods Pro 2ª Geração", 
      quantity: 5,
      date: "2024-01-04 16:45",
      user: "Pedro Costa",
      notes: "Transferência Loja 2"
    }
  ]

  const filteredItems = inventoryItems.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { label: "Esgotado", variant: "destructive" as const, color: "text-destructive" }
    if (current <= min) return { label: "Crítico", variant: "destructive" as const, color: "text-warning" }
    return { label: "Normal", variant: "secondary" as const, color: "text-success" }
  }

  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock)
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.cost), 0)

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-title text-foreground">Controle de Estoque</h1>
            <p className="text-muted-foreground font-text">
              Gerencie seu estoque e movimentações
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              Relatório
            </Button>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Lançar Estoque
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Valor Total</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title">
                R$ {totalValue.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">em estoque</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Itens em Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title">
                {inventoryItems.reduce((sum, item) => sum + item.currentStock, 0)}
              </div>
              <p className="text-xs text-success">+25 desde ontem</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Estoque Crítico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title text-warning">
                {lowStockItems.length}
              </div>
              <p className="text-xs text-muted-foreground">produtos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Produtos Únicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title">{inventoryItems.length}</div>
              <p className="text-xs text-muted-foreground">cadastrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas de Estoque Baixo */}
        {lowStockItems.length > 0 && (
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="font-title text-warning flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produtos com Estoque Crítico
              </CardTitle>
              <CardDescription>
                {lowStockItems.length} produtos precisam de reposição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                    <div>
                      <span className="font-medium font-text text-sm">{item.productName}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        Atual: {item.currentStock} | Mínimo: {item.minStock}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      Repor
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs Principal */}
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Estoque Atual</TabsTrigger>
            <TabsTrigger value="movements">Movimentações</TabsTrigger>
            <TabsTrigger value="transfer">Transferências</TabsTrigger>
          </TabsList>

          {/* Estoque Atual */}
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-title">Estoque Atual</CardTitle>
                    <CardDescription>Visualize a situação atual do seu estoque</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar produtos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Estoque Atual</TableHead>
                      <TableHead>Mín/Máx</TableHead>
                      <TableHead>Valor Unitário</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const status = getStockStatus(item.currentStock, item.minStock)
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium font-text">
                            {item.productName}
                          </TableCell>
                          <TableCell>{item.brand}</TableCell>
                          <TableCell className={`font-semibold ${status.color}`}>
                            {item.currentStock}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.minStock} / {item.maxStock}
                          </TableCell>
                          <TableCell>
                            R$ {item.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="font-semibold">
                            R$ {(item.currentStock * item.cost).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant} className="text-xs">
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Ajustar
                              </Button>
                              <Button variant="outline" size="sm">
                                Detalhes
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Movimentações */}
          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Movimentações Recentes</CardTitle>
                <CardDescription>Histórico de entradas e saídas do estoque</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {movement.type === 'in' && (
                              <div className="flex items-center gap-1 text-success">
                                <ArrowDownLeft className="h-4 w-4" />
                                <span className="text-sm font-medium">Entrada</span>
                              </div>
                            )}
                            {movement.type === 'out' && (
                              <div className="flex items-center gap-1 text-destructive">
                                <ArrowUpRight className="h-4 w-4" />
                                <span className="text-sm font-medium">Saída</span>
                              </div>
                            )}
                            {movement.type === 'transfer' && (
                              <div className="flex items-center gap-1 text-primary">
                                <Package className="h-4 w-4" />
                                <span className="text-sm font-medium">Transferência</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium font-text">
                          {movement.productName}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {movement.quantity}
                        </TableCell>
                        <TableCell className="text-sm">
                          {movement.date}
                        </TableCell>
                        <TableCell className="text-sm">
                          {movement.user}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {movement.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transferências */}
          <TabsContent value="transfer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Transferência entre Lojas</CardTitle>
                <CardDescription>Transfira produtos entre suas lojas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-title font-semibold mb-2">Funcionalidade Multi-Lojas</h3>
                  <p className="text-sm">Esta funcionalidade estará disponível no plano Multi-Lojas</p>
                  <Button variant="outline" className="mt-4">
                    Fazer Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  )
}