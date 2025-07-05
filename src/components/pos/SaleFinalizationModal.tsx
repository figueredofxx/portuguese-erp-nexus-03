
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { CreditCard, DollarSign, QrCode, CheckCircle, Printer } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Customer {
  id: string
  name: string
  cpf?: string
  phone?: string
}

interface SaleFinalizationModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  customer: Customer | null
  onFinalizeSale: () => void
}

export function SaleFinalizationModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  customer, 
  onFinalizeSale 
}: SaleFinalizationModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cashReceived, setCashReceived] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [saleCompleted, setSaleCompleted] = useState(false)
  const [saleId, setSaleId] = useState("")

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cashReceivedValue = parseFloat(cashReceived) || 0
  const change = cashReceivedValue - total

  const paymentMethods = [
    { value: "cash", label: "Dinheiro", icon: DollarSign },
    { value: "credit", label: "Cartão de Crédito", icon: CreditCard },
    { value: "debit", label: "Cartão de Débito", icon: CreditCard },
    { value: "pix", label: "PIX", icon: QrCode }
  ]

  const handleProcessSale = async () => {
    if (!paymentMethod) {
      toast.error("Selecione um método de pagamento")
      return
    }

    if (paymentMethod === "cash" && cashReceivedValue < total) {
      toast.error("Valor recebido é insuficiente")
      return
    }

    setIsProcessing(true)
    
    // Simular processamento da venda
    setTimeout(() => {
      const newSaleId = `V${Date.now().toString().slice(-6)}`
      setSaleId(newSaleId)
      setSaleCompleted(true)
      setIsProcessing(false)
      toast.success("Venda finalizada com sucesso!")
    }, 2000)
  }

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const receiptHTML = generateReceiptHTML()
    
    printWindow.document.write(receiptHTML)
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
  }

  const generateReceiptHTML = () => {
    const currentDate = new Date().toLocaleDateString('pt-BR')
    const currentTime = new Date().toLocaleTimeString('pt-BR')
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pedido de Venda - ${saleId}</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              margin: 0; 
              padding: 20px; 
              font-size: 12px;
              line-height: 1.4;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #000; 
              padding-bottom: 10px; 
              margin-bottom: 15px; 
            }
            .company-name { 
              font-size: 18px; 
              font-weight: bold; 
              margin-bottom: 5px; 
            }
            .document-title { 
              font-size: 16px; 
              font-weight: bold; 
              margin: 10px 0; 
            }
            .info-section { 
              margin-bottom: 15px; 
            }
            .info-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 3px; 
            }
            .table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 15px 0; 
            }
            .table th, .table td { 
              border: 1px solid #000; 
              padding: 5px; 
              text-align: left; 
            }
            .table th { 
              background-color: #f0f0f0; 
              font-weight: bold; 
              text-align: center; 
            }
            .table .text-right { 
              text-align: right; 
            }
            .table .text-center { 
              text-align: center; 
            }
            .totals { 
              margin-top: 15px; 
              border-top: 2px solid #000; 
              padding-top: 10px; 
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 5px; 
            }
            .total-final { 
              font-size: 14px; 
              font-weight: bold; 
              border-top: 1px solid #000; 
              padding-top: 5px; 
            }
            .footer { 
              margin-top: 20px; 
              text-align: center; 
              border-top: 1px solid #000; 
              padding-top: 10px; 
              font-size: 10px; 
            }
            @media print { 
              body { margin: 0; padding: 10px; } 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">SISTEMA ERP</div>
            <div>CNPJ: 00.000.000/0000-00</div>
            <div>Endereço da Empresa</div>
            <div>Telefone: (11) 99999-9999</div>
            <div class="document-title">PEDIDO DE VENDA</div>
          </div>

          <div class="info-section">
            <div class="info-row">
              <span><strong>Pedido Nº:</strong> ${saleId}</span>
              <span><strong>Data:</strong> ${currentDate}</span>
            </div>
            <div class="info-row">
              <span><strong>Hora:</strong> ${currentTime}</span>
              <span><strong>Vendedor:</strong> Sistema</span>
            </div>
          </div>

          ${customer ? `
          <div class="info-section">
            <div style="border: 1px solid #000; padding: 8px;">
              <div><strong>DADOS DO CLIENTE</strong></div>
              <div><strong>Nome:</strong> ${customer.name}</div>
              ${customer.cpf ? `<div><strong>CPF:</strong> ${customer.cpf}</div>` : ''}
              ${customer.phone ? `<div><strong>Telefone:</strong> ${customer.phone}</div>` : ''}
            </div>
          </div>
          ` : ''}

          <table class="table">
            <thead>
              <tr>
                <th style="width: 40%">DESCRIÇÃO</th>
                <th style="width: 15%">QTD</th>
                <th style="width: 20%">VALOR UNIT.</th>
                <th style="width: 25%">VALOR TOTAL</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td class="text-center">${item.quantity}</td>
                  <td class="text-right">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
                  <td class="text-right">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <div class="total-row">
              <span>Quantidade de Itens:</span>
              <span>${cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div class="total-row total-final">
              <span>VALOR TOTAL:</span>
              <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div class="info-section" style="margin-top: 15px;">
            <div style="border: 1px solid #000; padding: 8px;">
              <div><strong>FORMA DE PAGAMENTO</strong></div>
              <div>${paymentMethods.find(pm => pm.value === paymentMethod)?.label}</div>
              ${paymentMethod === 'cash' && cashReceived ? `
                <div><strong>Valor Recebido:</strong> R$ ${parseFloat(cashReceived).toFixed(2).replace('.', ',')}</div>
                ${change > 0 ? `<div><strong>Troco:</strong> R$ ${change.toFixed(2).replace('.', ',')}</div>` : ''}
              ` : ''}
            </div>
          </div>

          <div class="footer">
            <div>Obrigado pela preferência!</div>
            <div>Este documento não tem valor fiscal</div>
            <div>Sistema ERP - Gerado em ${currentDate} às ${currentTime}</div>
          </div>
        </body>
      </html>
    `
  }

  const handleClose = () => {
    if (saleCompleted) {
      onFinalizeSale()
    }
    onClose()
    setSaleCompleted(false)
    setPaymentMethod("")
    setCashReceived("")
    setSaleId("")
  }

  if (saleCompleted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Venda Finalizada!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-lg font-medium">Pedido Nº: {saleId}</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {total.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm text-muted-foreground">
                Pagamento: {paymentMethods.find(pm => pm.value === paymentMethod)?.label}
              </p>
            </div>

            {paymentMethod === "cash" && change > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-medium">Troco a ser dado:</p>
                <p className="text-xl font-bold text-blue-600">
                  R$ {change.toFixed(2).replace('.', ',')}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handlePrintReceipt}
                className="flex-1"
                variant="outline"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimir Pedido
              </Button>
              <Button onClick={handleClose} className="flex-1">
                Concluir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Finalizar Venda</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Resumo da Venda */}
          <div className="space-y-2">
            <h3 className="font-medium">Resumo da Venda</h3>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          {/* Cliente */}
          {customer && (
            <div className="space-y-2">
              <h3 className="font-medium">Cliente</h3>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium">{customer.name}</p>
                {customer.cpf && <p className="text-sm">CPF: {customer.cpf}</p>}
              </div>
            </div>
          )}

          {/* Método de Pagamento */}
          <div className="space-y-3">
            <Label>Método de Pagamento *</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método de pagamento" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {method.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Valor Recebido (apenas para dinheiro) */}
          {paymentMethod === "cash" && (
            <div className="space-y-3">
              <Label htmlFor="cashReceived">Valor Recebido (R$)</Label>
              <Input
                id="cashReceived"
                type="number"
                step="0.01"
                min="0"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="0,00"
              />
              {cashReceivedValue > 0 && (
                <div className="text-sm">
                  {change >= 0 ? (
                    <p className="text-green-600">
                      Troco: R$ {change.toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-red-600">
                      Faltam: R$ {Math.abs(change).toFixed(2)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleProcessSale} 
              disabled={isProcessing}
              className="min-w-[120px]"
            >
              {isProcessing ? "Processando..." : "Finalizar Venda"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
