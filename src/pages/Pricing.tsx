
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Star } from "lucide-react"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Básico",
      description: "Perfeito para pequenos negócios com uma loja",
      price: {
        monthly: 99,
        yearly: 990
      },
      features: [
        "1 loja",
        "Produtos ilimitados",
        "Controle de estoque",
        "PDV completo",
        "Gestão de clientes",
        "Relatórios básicos",
        "Suporte por email"
      ],
      popular: false,
      cta: "Começar Agora"
    },
    {
      name: "Multi-Lojas",
      description: "Para negócios em expansão com múltiplas lojas",
      price: {
        monthly: 199,
        yearly: 1990
      },
      features: [
        "Lojas ilimitadas",
        "Produtos ilimitados",
        "Controle de estoque",
        "PDV completo",
        "Gestão de clientes",
        "Transferência entre lojas",
        "Relatórios avançados",
        "Dashboard consolidado",
        "Suporte prioritário",
        "Gestão de usuários"
      ],
      popular: true,
      cta: "Começar Agora"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ERP</span>
              </div>
              <span className="font-bold text-lg">Sistema ERP</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" size="sm">Fazer Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Escolha o plano ideal para seu negócio
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Comece gratuitamente por 14 dias. Sem compromisso, cancele quando quiser.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
          <span className={billingCycle === "monthly" ? "font-medium text-sm sm:text-base" : "text-gray-500 text-sm sm:text-base"}>
            Mensal
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={billingCycle === "yearly" ? "font-medium text-sm sm:text-base" : "text-gray-500 text-sm sm:text-base"}>
              Anual
            </span>
            <Badge className="bg-green-100 text-green-800 text-xs">
              2 meses grátis
            </Badge>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 sm:px-4 py-1">
                    <Star className="h-4 w-4 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-bold">
                      R$ {plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-500 text-sm sm:text-base">
                      /{billingCycle === "monthly" ? "mês" : "ano"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-600 mt-1">
                      Economize R$ {(plan.price.monthly * 12) - plan.price.yearly}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/signup">
                  <Button 
                    className={`w-full ${plan.popular ? "bg-primary" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <span className="text-sm sm:text-base">{plan.cta}</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            Tudo que você precisa para gerenciar seu negócio
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-sm sm:text-base">Fácil de usar</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Interface intuitiva, sem complicações</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-sm sm:text-base">Suporte completo</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Atendimento especializado quando precisar</p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-sm sm:text-base">Seguro e confiável</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Seus dados protegidos com a melhor segurança</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
