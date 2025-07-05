import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Menu, 
  X, 
  Grid2x2, 
  CirclePlus, 
  Package, 
  Users, 
  TrendingUp, 
  FileText, 
  BarChart3,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    {
      icon: Grid2x2,
      title: "Dashboard",
      description: "Visão geral com gráficos de vendas, estoque e financeiro.",
      endpoint: "/dashboard"
    },
    {
      icon: CirclePlus,
      title: "Ponto de Venda (PDV)",
      description: "Vendas rápidas e integradas com estoque.",
      endpoint: "/point-of-sale"
    },
    {
      icon: Package,
      title: "Estoque",
      description: "Controle por IMEI ou quantidade, com transferências entre lojas.",
      endpoint: "/inventory"
    },
    {
      icon: Users,
      title: "Clientes",
      description: "Gerencie clientes e histórico de compras.",
      endpoint: "/customers"
    },
    {
      icon: TrendingUp,
      title: "Vendas",
      description: "Acompanhe todas as vendas com filtros detalhados.",
      endpoint: "/sales"
    },
    {
      icon: FileText,
      title: "Financeiro",
      description: "Feche o caixa e calcule margens de lucro.",
      endpoint: "/financial"
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Relatórios completos com exportação em PDF/Excel.",
      endpoint: "/reports"
    }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: "Simplicidade",
      description: "Interface intuitiva para gerenciar sua loja em minutos."
    },
    {
      icon: Package,
      title: "Multi-Lojas",
      description: "Controle várias lojas e transfira estoques com facilidade."
    },
    {
      icon: TrendingUp,
      title: "Economia",
      description: "Planos acessíveis para todos os tamanhos de negócio."
    },
    {
      icon: Users,
      title: "Suporte",
      description: "Atendimento em português via chat ou e-mail."
    }
  ]

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Lojista",
      content: "O LojixApp transformou a gestão da minha loja. O PDV é rápido e o controle de estoque é perfeito!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Empresário",
      content: "Com o plano Multi-Lojas, gerencio minhas filiais sem complicação.",
      rating: 5
    },
    {
      name: "Maria Costa",
      role: "Lojista",
      content: "Os relatórios me ajudaram a entender melhor meu negócio e aumentar as vendas.",
      rating: 5
    }
  ]

  const faqs = [
    {
      question: "O que é o LojixApp?",
      answer: "Um ERP SaaS para gerenciar lojas com facilidade, incluindo vendas, estoque, clientes e financeiro."
    },
    {
      question: "Posso usar em várias lojas?",
      answer: "Sim, com o plano Multi-Lojas você pode gerenciar múltiplas filiais e transferir estoque entre elas."
    },
    {
      question: "Como funciona o teste grátis?",
      answer: "Acesse todas as funcionalidades por 14 dias sem compromisso. Não é necessário cartão de crédito."
    },
    {
      question: "O sistema suporta leitores de código de barras?",
      answer: "Sim, com integração WebUSB para leitores de código de barras e impressoras térmicas."
    },
    {
      question: "Os dados ficam seguros?",
      answer: "Sim, utilizamos criptografia SSL e backups automáticos para garantir a segurança dos seus dados."
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-title font-bold text-primary">LojixApp</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="font-text text-foreground hover:text-primary transition-colors">
              Funcionalidades
            </a>
            <Link to="/pricing" className="font-text text-foreground hover:text-primary transition-colors">
              Planos
            </Link>
            <a href="#contact" className="font-text text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/signup">Comece Agora</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <a href="#features" className="block font-text text-foreground hover:text-primary">
                Funcionalidades
              </a>
              <Link to="/pricing" className="block font-text text-foreground hover:text-primary">
                Planos
              </Link>
              <a href="#contact" className="block font-text text-foreground hover:text-primary">
                Contato
              </a>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/signup">Comece Agora</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-title font-bold text-primary mb-4 sm:mb-6 leading-tight">
                Gerencie sua loja com facilidade usando o LojixApp
              </h1>
              <p className="text-lg sm:text-xl font-text text-muted-foreground mb-6 sm:mb-8">
                O ERP SaaS que simplifica vendas, estoque e financeiro para lojistas. 
                Comece hoje e otimize seu negócio!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/signup">Teste Grátis</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/pricing">Ver Planos</Link>
                </Button>
              </div>
            </div>
            <div className="lg:order-first lg:order-last">
              <div className="bg-card rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="font-title font-semibold mb-4 text-base sm:text-lg">Dashboard - Visão Geral</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded">
                    <span className="font-text text-sm">Vendas Hoje</span>
                    <span className="font-text font-semibold text-primary text-sm sm:text-base">R$ 2.450,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-success/5 rounded">
                    <span className="font-text text-sm">Produtos em Estoque</span>
                    <span className="font-text font-semibold text-success text-sm sm:text-base">1.247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/5 rounded">
                    <span className="font-text text-sm">Clientes Ativos</span>
                    <span className="font-text font-semibold text-warning text-sm sm:text-base">342</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold text-primary mb-4">
              Tudo o que sua loja precisa em um só lugar
            </h2>
            <p className="text-lg sm:text-xl font-text text-muted-foreground max-w-2xl mx-auto">
              Controle completo do seu negócio com funcionalidades integradas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-title text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-text text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/signup">Conheça Todas as Funcionalidades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold text-primary mb-4">
              Por que escolher o LojixApp?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-title font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="font-text text-muted-foreground text-sm sm:text-base">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="bg-card rounded-lg shadow-lg p-6 lg:p-8">
                <h3 className="font-title font-semibold text-xl lg:text-2xl mb-4">Pronto para começar?</h3>
                <p className="font-text text-muted-foreground mb-6 text-sm sm:text-base">
                  Junte-se a milhares de lojistas que já transformaram seus negócios
                </p>
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Link to="/signup">Comece Agora</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold text-primary mb-4">
              O que os lojistas dizem sobre o LojixApp
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="font-text text-sm sm:text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-title font-semibold">{testimonial.name}</p>
                  <p className="font-text text-sm text-muted-foreground">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/signup">Junte-se a Eles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold text-primary mb-4">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 mb-8 lg:mb-12">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <CardTitle className="font-title text-base sm:text-lg pr-4">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                </CardHeader>
                {openFaq === index && (
                  <CardContent>
                    <p className="font-text text-muted-foreground text-sm sm:text-base">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Fale Conosco</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 lg:mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-title font-bold text-xl lg:text-2xl text-primary mb-4">LojixApp</h3>
              <p className="font-text text-slate-300 mb-4 text-sm sm:text-base">
                O ERP SaaS que simplifica a gestão da sua loja
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-primary hover:text-primary/80">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary hover:text-primary/80">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-title font-semibold mb-4">Produto</h4>
              <div className="space-y-2 font-text text-sm">
                <a href="#features" className="block text-slate-300 hover:text-white">Funcionalidades</a>
                <Link to="/pricing" className="block text-slate-300 hover:text-white">Planos</Link>
                <Link to="/signup" className="block text-slate-300 hover:text-white">Teste Grátis</Link>
              </div>
            </div>

            <div>
              <h4 className="font-title font-semibold mb-4">Empresa</h4>
              <div className="space-y-2 font-text text-sm">
                <a href="#" className="block text-slate-300 hover:text-white">Sobre</a>
                <a href="#" className="block text-slate-300 hover:text-white">Blog</a>
                <a href="#" className="block text-slate-300 hover:text-white">Carreiras</a>
              </div>
            </div>

            <div>
              <h4 className="font-title font-semibold mb-4">Contato</h4>
              <div className="space-y-2 font-text text-slate-300 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">contato@lojixapp.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>(11) 9999-9999</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700 mb-8" />

          <div className="text-center">
            <h3 className="font-title font-semibold text-lg sm:text-xl mb-4">
              Comece a transformar sua loja hoje!
            </h3>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/signup">Teste Grátis</Link>
            </Button>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-slate-700">
            <p className="font-text text-slate-400 text-sm">
              © 2024 LojixApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
