
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
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  stock: number
  stockType: 'quantity' | 'serial'
  warranty: string
  status: 'active' | 'inactive'
}

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
  onSave: (product: Omit<Product, 'id'> | Product) => void
}

export function ProductFormModal({ isOpen, onClose, product, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    stockType: product?.stockType || 'quantity' as 'quantity' | 'serial',
    warranty: product?.warranty || '',
    status: product?.status || 'active' as 'active' | 'inactive'
  })

  const brands = [
    "Apple", "Samsung", "Xiaomi", "Motorola", "LG", "Sony", "Huawei", 
    "OnePlus", "Google", "Nokia", "Realme", "Oppo", "Vivo", "Asus", "Outro"
  ]

  const warrantyPeriods = [
    { value: "3 meses", label: "3 meses" },
    { value: "6 meses", label: "6 meses" },
    { value: "12 meses", label: "12 meses" },
    { value: "18 meses", label: "18 meses" },
    { value: "24 meses", label: "24 meses" },
    { value: "36 meses", label: "36 meses" },
    { value: "Sem garantia", label: "Sem garantia" }
  ]

  const stockTypes = [
    { value: "quantity", label: "Por Quantidade" },
    { value: "serial", label: "IMEI/SN/Código de Barras" }
  ]

  const statusOptions = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.brand.trim() || formData.price <= 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    }

    if (product) {
      onSave({ ...productData, id: product.id })
      toast.success("Produto atualizado com sucesso!")
    } else {
      onSave(productData)
      toast.success("Produto cadastrado com sucesso!")
    }
    
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: 0,
      stock: 0,
      stockType: 'quantity',
      warranty: '',
      status: 'active'
    })
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-title">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: iPhone 14 Pro 256GB"
                required
              />
            </div>

            <div>
              <Label htmlFor="brand">Marca *</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a marca" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço de Venda (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="0,00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="warranty">Garantia</Label>
                <Select
                  value={formData.warranty}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, warranty: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a garantia" />
                  </SelectTrigger>
                  <SelectContent>
                    {warrantyPeriods.map((warranty) => (
                      <SelectItem key={warranty.value} value={warranty.value}>
                        {warranty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Tipo de Controle de Estoque *</Label>
              <Select
                value={formData.stockType}
                onValueChange={(value: 'quantity' | 'serial') => 
                  setFormData(prev => ({ ...prev, stockType: value }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o tipo de controle" />
                </SelectTrigger>
                <SelectContent>
                  {stockTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stock">Estoque Inicial</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive') => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary">
              {product ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
