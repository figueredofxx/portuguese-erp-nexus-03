import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, CircleMinus, CirclePlus, CreditCard, DollarSign } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

export default function PointOfSale() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "iPhone 14 Pro 256GB", price: 4999, quantity: 1, total: 4999 },
    { id: "2", name: "Capinha iPhone 14 Pro", price: 89, quantity: 2, total: 178 },
  ])
  
  const [selectedCustomer, setSelectedCustomer] = useState<string>("")
  const [barcodeInput, setBarcodeInput] = useState<string>("")
  const [discount, setDiscount] = useState<number>(0)

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount

  const addQuantity = (id: string) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      )
    )
  }

  const removeQuantity = (id: string) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-title text-foreground">Ponto de Venda</h1>
            <p className="text-muted-foreground font-text">Realize vendas de forma rápida e eficiente</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              Histórico
            </Button>
            <Button variant="destructive">
              Limpar Carrinho
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Área de Produtos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Busca de Produtos */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Adicionar Produtos</CardTitle>
                <CardDescription>Digite o código de barras ou busque pelo nome</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Código de barras ou nome do produto..."
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Cliente</CardTitle>
                <CardDescription>Selecione o cliente para esta venda (opcional)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Buscar cliente por nome ou CPF..."
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    Novo Cliente
                  </Button>
                </div>
                {selectedCustomer && (
                  <div className="mt-3 p-3 rounded-lg border bg-primary/5">
                    <p className="font-medium font-text">João Silva</p>
                    <p className="text-sm text-muted-foreground">CPF: 123.456.789-00</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Produtos Populares */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Produtos Populares</CardTitle>
                <CardDescription>Acesso rápido aos produtos mais vendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['iPhone 14', 'Galaxy S23', 'AirPods Pro', 'iPad Air', 'MacBook Air', 'Capinha'].map((product) => (
                    <Button key={product} variant="outline" className="h-16 flex-col text-xs">
                      <span className="font-medium">{product}</span>
                      <span className="text-muted-foreground">R$ 2.999</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carrinho e Finalização */}
          <div className="space-y-6">
            {/* Carrinho */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title flex items-center justify-between">
                  Carrinho de Compras
                  <Badge variant="secondary">{cartItems.length} itens</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Carrinho vazio</p>
                    <p className="text-sm">Adicione produtos para iniciar a venda</p>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium font-text text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            ×
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeQuantity(item.id)}
                            >
                              <CircleMinus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium text-sm w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => addQuantity(item.id)}
                            >
                              <CirclePlus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-bold font-text">
                            R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Desconto */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title text-base">Desconto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input 
                    type="number"
                    placeholder="0"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="flex items-center text-sm">%</span>
                </div>
              </CardContent>
            </Card>

            {/* Resumo */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Resumo da Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Desconto ({discount}%):</span>
                    <span>- R$ {discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </CardContent>
            </Card>

            {/* Formas de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="font-title">Finalizar Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-primary h-12" disabled={cartItems.length === 0}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Cartão
                </Button>
                <Button variant="outline" className="w-full h-12" disabled={cartItems.length === 0}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Dinheiro
                </Button>
                <Button variant="outline" className="w-full h-12" disabled={cartItems.length === 0}>
                  Pix
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ERPLayout>
  )
}