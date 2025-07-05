
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ShoppingCart, Calendar, DollarSign } from "lucide-react"

interface CustomerHistoryProps {
  customer?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock purchase history data
const mockPurchases = [
  {
    id: 1,
    data: "2024-01-22",
    produtos: [
      { nome: "iPhone 15 Pro", quantidade: 1, preco: 8500.00 },
      { nome: "Capinha iPhone", quantidade: 2, preco: 45.00 }
    ],
    total: 8590.00,
    pagamento: "Cartão de Crédito",
    status: "Concluída"
  },
  {
    id: 2,
    data: "2024-01-15",
    produtos: [
      { nome: "MacBook Air M2", quantidade: 1, preco: 12500.00 },
      { nome: "Mouse Magic", quantidade: 1, preco: 350.00 }
    ],
    total: 12850.00,
    pagamento: "PIX",
    status: "Concluída"
  },
  {
    id: 3,
    data: "2023-12-10",
    produtos: [
      { nome: "AirPods Pro", quantidade: 1, preco: 1800.00 }
    ],
    total: 1800.00,
    pagamento: "Dinheiro",
    status: "Concluída"
  }
]

export function CustomerHistory({ customer, open, onOpenChange }: CustomerHistoryProps) {
  if (!customer) return null

  const totalPurchases = mockPurchases.length
  const totalValue = mockPurchases.reduce((sum, purchase) => sum + purchase.total, 0)
  const averageTicket = totalValue / totalPurchases
  const lastPurchase = mockPurchases[0]?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Histórico de Compras - {customer.nome}
          </DialogTitle>
          <DialogDescription>
            Visualize todas as compras realizadas por este cliente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPurchases}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Última Compra</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {lastPurchase ? new Date(lastPurchase).toLocaleDateString('pt-BR') : 'N/A'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase History */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Histórico de Vendas</h3>
            
            {mockPurchases.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Este cliente ainda não realizou nenhuma compra.
              </div>
            ) : (
              <div className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <Card key={purchase.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <CardTitle className="text-base">
                              Venda #{purchase.id}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {new Date(purchase.data).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {purchase.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {purchase.pagamento}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Produtos:</h4>
                        <div className="grid gap-2">
                          {purchase.produtos.map((produto, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{produto.nome}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">
                                  Qtd: {produto.quantidade}
                                </span>
                                <span className="font-medium">
                                  R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
