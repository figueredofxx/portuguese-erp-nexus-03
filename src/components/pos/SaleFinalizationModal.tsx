
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Printer, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

interface SaleFinalizationModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  total: number
  discount: number
  paymentMethod: string
  customer?: string
}

export function SaleFinalizationModal({
  isOpen,
  onClose,
  cartItems,
  total,
  discount,
  paymentMethod,
  customer
}: SaleFinalizationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [saleCompleted, setSaleCompleted] = useState(false)
  const { toast } = useToast()

  const saleNumber = `VEN-${Date.now().toString().slice(-6)}`
  const currentDate = new Date().toLocaleString('pt-BR')

  const handleFinalizeSale = async () => {
    setIsProcessing(true)
    
    // Simular processamento da venda
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSaleCompleted(true)
    setIsProcessing(false)
    
    toast({
      title: "Venda finalizada com sucesso!",
      description: `Venda ${saleNumber} foi processada com sucesso.`,
    })
  }

  const handlePrint = () => {
    const printContent = generatePrintContent()
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const generatePrintContent = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
    const discountAmount = (subtotal * discount) / 100

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pedido de Venda - ${saleNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 300px; margin: 0; padding: 10px; }
            .header { text-align: center; margin-bottom: 20px; }
            .company { font-weight: bold; font-size: 16px; }
            .sale-info { margin: 15px 0; }
            .items { margin: 15px 0; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total-section { margin-top: 15px; border-top: 1px solid #ccc; padding-top: 10px; }
            .total-line { display: flex; justify-content: space-between; margin: 3px 0; }
            .total-final { font-weight: bold; font-size: 14px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company">Minha Empresa</div>
            <div>CNPJ: 00.000.000/0001-00</div>
          </div>
          
          <div class="sale-info">
            <div><strong>Pedido:</strong> ${saleNumber}</div>
            <div><strong>Data:</strong> ${currentDate}</div>
            ${customer ? `<div><strong>Cliente:</strong> ${customer}</div>` : ''}
            <div><strong>Pagamento:</strong> ${paymentMethod}</div>
          </div>
          
          <div class="items">
            <div style="border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">
              <strong>ITENS</strong>
            </div>
            ${cartItems.map(item => `
              <div class="item">
                <div>
                  <div>${item.name}</div>
                  <div style="font-size: 12px; color: #666;">
                    ${item.quantity}x R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div>R$ ${item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="total-section">
            <div class="total-line">
              <span>Subtotal:</span>
              <span>R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            ${discount > 0 ? `
              <div class="total-line">
                <span>Desconto (${discount}%):</span>
                <span>- R$ ${discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            ` : ''}
            <div class="total-line total-final">
              <span>TOTAL:</span>
              <span>R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          
          <div class="footer">
            <div>Obrigado pela preferência!</div>
            <div>www.minhaempresa.com</div>
          </div>
        </body>
      </html>
    `
  }

  if (!saleCompleted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Venda</DialogTitle>
            <DialogDescription>
              Confirmar os dados da venda antes de finalizar
            </DialogDescription>
          </DialogHeader>
          
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Número da Venda:</span>
                <span>{saleNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Forma de Pagamento:</span>
                <span>{paymentMethod}</span>
              </div>
              {customer && (
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Cliente:</span>
                  <span>{customer}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="font-medium">Itens:</span>
                <span>{cartItems.length} produto(s)</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button 
              onClick={handleFinalizeSale}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Processando..." : "Confirmar Venda"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <DialogTitle>Venda Finalizada!</DialogTitle>
          </div>
          <DialogDescription>
            Venda processada com sucesso
          </DialogDescription>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Número da Venda:</span>
              <span className="font-bold text-green-600">{saleNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Total:</span>
              <span className="font-bold">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Data/Hora:</span>
              <span>{currentDate}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handlePrint} className="flex-1">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button onClick={onClose} className="flex-1">
            Nova Venda
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
