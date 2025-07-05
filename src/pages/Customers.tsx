
import { useState, useMemo } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, Edit, Eye, Users, Phone, Mail } from "lucide-react"
import { CustomerForm } from "@/components/customers/CustomerForm"
import { CustomerHistory } from "@/components/customers/CustomerHistory"

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    nome: "João Silva Santos",
    documento: "123.456.789-01",
    tipo: "CPF",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-1111",
    endereco: "Rua das Flores, 123 - Centro - São Paulo/SP",
    totalCompras: 2850.50,
    ultimaCompra: "2024-01-15",
    status: "ativo"
  },
  {
    id: 2,
    nome: "Maria Oliveira Ltda",
    documento: "12.345.678/0001-90",
    tipo: "CNPJ",
    email: "contato@mariaoliveira.com.br",
    telefone: "(11) 98888-2222",
    endereco: "Av. Paulista, 456 - Bela Vista - São Paulo/SP",
    totalCompras: 15750.00,
    ultimaCompra: "2024-01-20",
    status: "ativo"
  },
  {
    id: 3,
    nome: "Carlos Ferreira",
    documento: "987.654.321-09",
    tipo: "CPF",
    email: "carlos.ferreira@email.com",
    telefone: "(11) 97777-3333",
    endereco: "Rua dos Comerciantes, 789 - Vila Madalena - São Paulo/SP",
    totalCompras: 680.25,
    ultimaCompra: "2023-12-28",
    status: "inativo"
  },
  {
    id: 4,
    nome: "Ana Beatriz Costa",
    documento: "456.789.123-45",
    tipo: "CPF",
    email: "ana.costa@email.com",
    telefone: "(11) 96666-4444",
    endereco: "Alameda Santos, 321 - Jardins - São Paulo/SP",
    totalCompras: 4200.80,
    ultimaCompra: "2024-01-18",
    status: "ativo"
  },
  {
    id: 5,
    nome: "Tech Solutions Corp",
    documento: "98.765.432/0001-10",
    tipo: "CNPJ",
    email: "vendas@techsolutions.com.br",
    telefone: "(11) 95555-5555",
    endereco: "Rua Inovação, 1000 - Vila Olímpia - São Paulo/SP",
    totalCompras: 28500.00,
    ultimaCompra: "2024-01-22",
    status: "ativo"
  }
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return mockCustomers

    return mockCustomers.filter(customer =>
      customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.documento.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.telefone.includes(searchTerm)
    )
  }, [searchTerm])

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer)
    setShowForm(true)
  }

  const handleViewHistory = (customer: any) => {
    setSelectedCustomer(customer)
    setShowHistory(true)
  }

  const handleNewCustomer = () => {
    setSelectedCustomer(null)
    setShowForm(true)
  }

  const activeCustomers = mockCustomers.filter(c => c.status === "ativo").length
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalCompras, 0)

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie sua base de clientes e histórico de compras
            </p>
          </div>
          <Button onClick={handleNewCustomer} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCustomers.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeCustomers} ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                De todos os clientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {(totalRevenue / mockCustomers.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Por cliente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Lista de Clientes</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, documento, email ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Total Compras</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        <div className="text-muted-foreground">
                          {searchTerm ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado."}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.nome}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {customer.endereco}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-mono">{customer.documento}</div>
                            <Badge variant="outline" className="text-xs">
                              {customer.tipo}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{customer.email}</div>
                            <div className="text-sm text-muted-foreground">{customer.telefone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            R$ {customer.totalCompras.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(customer.ultimaCompra).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.status === "ativo" ? "default" : "secondary"}>
                            {customer.status === "ativo" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewHistory(customer)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredCustomers.length > 0 && (
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {filteredCustomers.length} de {mockCustomers.length} clientes
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Form Modal */}
        <CustomerForm
          customer={selectedCustomer}
          open={showForm}
          onOpenChange={setShowForm}
        />

        {/* Customer History Modal */}
        <CustomerHistory
          customer={selectedCustomer}
          open={showHistory}
          onOpenChange={setShowHistory}
        />
      </div>
    </ERPLayout>
  )
}
