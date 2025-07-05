
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface CustomerFormProps {
  customer?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerForm({ customer, open, onOpenChange }: CustomerFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nome: "",
    documento: "",
    tipo: "CPF",
    email: "",
    telefone: "",
    endereco: "",
    observacoes: ""
  })

  // Load customer data when editing
  useEffect(() => {
    if (customer) {
      setFormData({
        nome: customer.nome || "",
        documento: customer.documento || "",
        tipo: customer.tipo || "CPF",
        email: customer.email || "",
        telefone: customer.telefone || "",
        endereco: customer.endereco || "",
        observacoes: customer.observacoes || ""
      })
    } else {
      setFormData({
        nome: "",
        documento: "",
        tipo: "CPF",
        email: "",
        telefone: "",
        endereco: "",
        observacoes: ""
      })
    }
  }, [customer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.nome || !formData.documento || !formData.email || !formData.telefone) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    console.log("Saving customer:", formData)
    
    toast({
      title: customer ? "Cliente atualizado!" : "Cliente cadastrado!",
      description: customer 
        ? `${formData.nome} foi atualizado com sucesso.`
        : `${formData.nome} foi cadastrado com sucesso.`,
    })

    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formatDocument = (value: string, type: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "")
    
    if (type === "CPF") {
      // Format CPF: 000.000.000-00
      return numbers
        .slice(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        .replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3")
        .replace(/(\d{3})(\d{3})/, "$1.$2")
    } else {
      // Format CNPJ: 00.000.000/0000-00
      return numbers
        .slice(0, 14)
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4")
        .replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3")
        .replace(/(\d{2})(\d{3})/, "$1.$2")
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers
      .slice(0, 11)
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
      .replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
      .replace(/(\d{2})(\d{4})/, "($1) $2")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {customer ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {customer 
              ? "Edite as informações do cliente."
              : "Cadastre um novo cliente no sistema."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="nome">Nome Completo / Razão Social *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Digite o nome completo ou razão social"
                required
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de Documento *</Label>
              <Select 
                value={formData.tipo} 
                onValueChange={(value) => {
                  handleInputChange("tipo", value)
                  handleInputChange("documento", "") // Clear document when type changes
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CPF">CPF</SelectItem>
                  <SelectItem value="CNPJ">CNPJ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="documento">
                {formData.tipo === "CPF" ? "CPF" : "CNPJ"} *
              </Label>
              <Input
                id="documento"
                value={formData.documento}
                onChange={(e) => handleInputChange("documento", formatDocument(e.target.value, formData.tipo))}
                placeholder={formData.tipo === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="endereco">Endereço Completo</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Rua, número, bairro, cidade, estado, CEP"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                placeholder="Observações adicionais sobre o cliente..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {customer ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
