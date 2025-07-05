
import { ERPLayout } from "@/components/erp-layout"
import { 
  MetricsCards, 
  SalesLineChart, 
  LowStockChart, 
  RevenueExpensesChart 
} from "@/components/dashboard-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, AlertTriangle, Users, ShoppingCart, Package, BarChart3, Plus } from "lucide-react"

export default function Dashboard() {
  const recentSales = [
    { id: "001", customer: "João Silva", product: "iPhone 14 Pro", value: "R$ 4.999,00", time: "há 2 min" },
    { id: "002", customer: "Maria Santos", product: "Galaxy S23", value: "R$ 3.299,00", time: "há 15 min" },
    { id: "003", customer: "Pedro Costa", product: "AirPods Pro", value: "R$ 1.899,00", time: "há 32 min" },
    { id: "004", customer: "Ana Oliveira", product: "iPad Air", value: "R$ 4.199,00", time: "há 1h" },
  ]

  const alerts = [
    { type: "stock", message: "5 produtos com estoque baixo", critical: true },
    { type: "payment", message: "3 pagamentos pendentes", critical: false },
    { type: "service", message: "2 produtos vencendo garantia", critical: false },
  ]

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-title text-foreground">Dashboard</h1>
            <p className="text-muted-foreground font-text">
              Visão geral do seu negócio • {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Alertas
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                3
              </Badge>
            </Button>
            <Button className="btn-primary">
              Nova Venda
            </Button>
          </div>
        </div>

        {/* Alertas Importantes */}
        {alerts.length > 0 && (
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-title flex items-center gap-2 text-warning">
                <AlertTriangle className="h-4 w-4" />
                Alertas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                  <span className="text-sm font-text">{alert.message}</span>
                  <Badge variant={alert.critical ? "destructive" : "secondary"} className="text-xs">
                    {alert.critical ? "Crítico" : "Atenção"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Cards de Métricas */}
        <MetricsCards />

        {/* Gráficos Principais */}
        <div className="grid gap-6 md:grid-cols-3">
          <SalesLineChart />
          <LowStockChart />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <RevenueExpensesChart />
          
          {/* Vendas Recentes */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="font-title flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Vendas Recentes
              </CardTitle>
              <CardDescription>Últimas transações realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-smooth">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium font-text text-sm">{sale.customer}</p>
                        <p className="text-xs text-muted-foreground">{sale.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold font-text text-sm">{sale.value}</p>
                      <p className="text-xs text-muted-foreground">{sale.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Todas as Vendas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-title">Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-text">Nova Venda</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm font-text">Novo Produto</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Package className="h-4 w-4 text-warning" />
                </div>
                <span className="text-sm font-text">Lançar Estoque</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-text">Relatórios</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  )
}
