
import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, CreditCard, Star, AlertTriangle, CheckCircle } from "lucide-react"

export default function Subscription() {
  const [currentPlan] = useState({
    name: "Multi-Lojas",
    price: 199,
    billing: "monthly",
    nextBilling: "2024-02-22",
    status: "active"
  })

  const [paymentHistory] = useState([
    { date: "2024-01-22", amount: 199, status: "paid", method: "Cartão •••• 4242" },
    { date: "2023-12-22", amount: 199, status: "paid", method: "Cartão •••• 4242" },
    { date: "2023-11-22", amount: 199, status: "paid", method: "Cartão •••• 4242" },
  ])

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assinatura</h1>
          <p className="text-muted-foreground">
            Gerencie seu plano e informações de cobrança
          </p>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Plano Atual: {currentPlan.name}
                </CardTitle>
                <CardDescription>
                  Seu plano está ativo e renovará automaticamente
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Mensal</p>
                <p className="text-2xl font-bold">R$ {currentPlan.price}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próxima Cobrança</p>
                <p className="text-lg font-medium">
                  {new Date(currentPlan.nextBilling).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Método de Pagamento</p>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Cartão •••• 4242</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                Alterar Plano
              </Button>
              <Button variant="outline">
                Atualizar Cartão
              </Button>
              <Button variant="outline">
                Baixar Nota Fiscal
              </Button>
              <Button variant="destructive">
                Cancelar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Planos Disponíveis</CardTitle>
            <CardDescription>
              Compare e altere seu plano quando quiser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Básico</h3>
                  <Badge variant="outline">1 Loja</Badge>
                </div>
                <p className="text-2xl font-bold mb-2">R$ 99<span className="text-sm font-normal">/mês</span></p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• 1 loja</li>
                  <li>• Produtos ilimitados</li>
                  <li>• PDV completo</li>
                  <li>• Relatórios básicos</li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  Alterar para Básico
                </Button>
              </div>

              <div className="border-2 border-primary rounded-lg p-4 relative">
                <Badge className="absolute -top-2 left-4 bg-primary">
                  Plano Atual
                </Badge>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Multi-Lojas</h3>
                  <Badge>Lojas Ilimitadas</Badge>
                </div>
                <p className="text-2xl font-bold mb-2">R$ 199<span className="text-sm font-normal">/mês</span></p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Lojas ilimitadas</li>
                  <li>• Produtos ilimitados</li>
                  <li>• PDV completo</li>
                  <li>• Transferência entre lojas</li>
                  <li>• Relatórios avançados</li>
                </ul>
                <Button disabled className="w-full">
                  Plano Atual
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico de Cobrança
            </CardTitle>
            <CardDescription>
              Últimas faturas e pagamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        R$ {payment.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString('pt-BR')} • {payment.method}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      Pago
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Ver Nota
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Uso do Plano</CardTitle>
            <CardDescription>
              Acompanhe o uso dos recursos do seu plano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Lojas Ativas</p>
                <p className="text-xs text-green-600">Ilimitado</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">1.247</p>
                <p className="text-sm text-muted-foreground">Produtos Cadastrados</p>
                <p className="text-xs text-green-600">Ilimitado</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                <p className="text-xs text-green-600">Ilimitado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  )
}
