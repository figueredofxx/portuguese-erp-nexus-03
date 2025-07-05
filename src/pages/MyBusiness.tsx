
import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Building, Users, Settings, Plus, Edit, Trash2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockStores = [
  {
    id: 1,
    nome: "Loja Principal",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    telefone: "(11) 99999-9999",
    responsavel: "Maria Santos",
    status: "Ativa"
  },
  {
    id: 2,
    nome: "Filial Shopping",
    endereco: "Shopping Center, Loja 205 - São Paulo - SP",
    telefone: "(11) 88888-8888",
    responsavel: "João Silva",
    status: "Ativa"
  }
]

const mockUsers = [
  {
    id: 1,
    nome: "Maria Santos",
    email: "maria@empresa.com",
    role: "Administrador",
    loja: "Todas",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "João Silva",
    email: "joao@empresa.com",
    role: "Gerente",
    loja: "Filial Shopping",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Ana Costa",
    email: "ana@empresa.com",
    role: "Vendedor",
    loja: "Loja Principal",
    status: "Ativo"
  }
]

export default function MyBusiness() {
  const [companyData, setCompanyData] = useState({
    nome: "Minha Empresa LTDA",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Principal, 100 - Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    telefone: "(11) 99999-9999",
    email: "contato@minhaempresa.com",
    logo: ""
  })

  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [newStore, setNewStore] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    responsavel: ""
  })
  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    role: "",
    loja: "",
    senha: ""
  })

  const { toast } = useToast()

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Dados atualizados!",
      description: "As informações da empresa foram salvas com sucesso.",
    })
  }

  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Loja cadastrada!",
      description: `${newStore.nome} foi adicionada com sucesso.`,
    })
    setIsStoreDialogOpen(false)
    setNewStore({ nome: "", endereco: "", telefone: "", responsavel: "" })
  }

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Usuário cadastrado!",
      description: `${newUser.nome} foi adicionado com sucesso.`,
    })
    setIsUserDialogOpen(false)
    setNewUser({ nome: "", email: "", role: "", loja: "", senha: "" })
  }

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meu Negócio</h1>
            <p className="text-muted-foreground">
              Configure sua empresa, lojas e usuários
            </p>
          </div>
        </div>

        <Tabs defaultValue="company" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="stores" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Lojas
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Configure os dados básicos da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="logo">Logotipo da Empresa</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          {companyData.logo ? (
                            <img src={companyData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Upload className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <Button type="button" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Enviar Logo
                        </Button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="nome">Razão Social / Nome da Empresa</Label>
                      <Input
                        id="nome"
                        value={companyData.nome}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, nome: e.target.value }))}
                        placeholder="Nome completo da empresa"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={companyData.cnpj}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, cnpj: e.target.value }))}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={companyData.telefone}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, telefone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companyData.email}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="contato@empresa.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={companyData.endereco}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, endereco: e.target.value }))}
                        placeholder="Rua, número, bairro"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        value={companyData.cidade}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, cidade: e.target.value }))}
                        placeholder="Cidade"
                      />
                    </div>

                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select value={companyData.estado} onValueChange={(value) => 
                        setCompanyData(prev => ({ ...prev, estado: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={companyData.cep}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, cep: e.target.value }))}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stores" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Lojas e Filiais</CardTitle>
                  <CardDescription>
                    Gerencie suas lojas e pontos de venda
                  </CardDescription>
                </div>
                <Dialog open={isStoreDialogOpen} onOpenChange={setIsStoreDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Loja
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Loja</DialogTitle>
                      <DialogDescription>
                        Cadastre uma nova loja ou filial
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleStoreSubmit} className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="store-nome">Nome da Loja</Label>
                          <Input
                            id="store-nome"
                            value={newStore.nome}
                            onChange={(e) => setNewStore(prev => ({ ...prev, nome: e.target.value }))}
                            placeholder="Ex: Filial Centro"
                          />
                        </div>
                        <div>
                          <Label htmlFor="store-endereco">Endereço Completo</Label>
                          <Textarea
                            id="store-endereco"
                            value={newStore.endereco}
                            onChange={(e) => setNewStore(prev => ({ ...prev, endereco: e.target.value }))}
                            placeholder="Rua, número, bairro, cidade, estado, CEP"
                          />
                        </div>
                        <div>
                          <Label htmlFor="store-telefone">Telefone</Label>
                          <Input
                            id="store-telefone"
                            value={newStore.telefone}
                            onChange={(e) => setNewStore(prev => ({ ...prev, telefone: e.target.value }))}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <Label htmlFor="store-responsavel">Responsável</Label>
                          <Input
                            id="store-responsavel"
                            value={newStore.responsavel}
                            onChange={(e) => setNewStore(prev => ({ ...prev, responsavel: e.target.value }))}
                            placeholder="Nome do gerente/responsável"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsStoreDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Cadastrar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Endereço</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{store.nome}</TableCell>
                        <TableCell>{store.endereco}</TableCell>
                        <TableCell>{store.telefone}</TableCell>
                        <TableCell>{store.responsavel}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {store.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Usuários do Sistema</CardTitle>
                  <CardDescription>
                    Gerencie os usuários e suas permissões
                  </CardDescription>
                </div>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Usuário</DialogTitle>
                      <DialogDescription>
                        Cadastre um novo usuário no sistema
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUserSubmit} className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="user-nome">Nome Completo</Label>
                          <Input
                            id="user-nome"
                            value={newUser.nome}
                            onChange={(e) => setNewUser(prev => ({ ...prev, nome: e.target.value }))}
                            placeholder="Nome do usuário"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-email">E-mail</Label>
                          <Input
                            id="user-email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@exemplo.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-role">Função</Label>
                          <Select value={newUser.role} onValueChange={(value) => 
                            setNewUser(prev => ({ ...prev, role: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Administrador">Administrador</SelectItem>
                              <SelectItem value="Gerente">Gerente</SelectItem>
                              <SelectItem value="Vendedor">Vendedor</SelectItem>
                              <SelectItem value="Estoquista">Estoquista</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="user-loja">Loja</Label>
                          <Select value={newUser.loja} onValueChange={(value) => 
                            setNewUser(prev => ({ ...prev, loja: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a loja" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Todas">Todas as Lojas</SelectItem>
                              <SelectItem value="Loja Principal">Loja Principal</SelectItem>
                              <SelectItem value="Filial Shopping">Filial Shopping</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="user-senha">Senha Inicial</Label>
                          <Input
                            id="user-senha"
                            type="password"
                            value={newUser.senha}
                            onChange={(e) => setNewUser(prev => ({ ...prev, senha: e.target.value }))}
                            placeholder="Senha temporária"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Cadastrar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Loja</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.nome}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.loja}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  )
}
