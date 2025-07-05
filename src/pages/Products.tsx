
import { useState } from "react"
import { ERPLayout } from "@/components/erp-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Search, Plus, FileText, List, Pencil, Trash2 } from "lucide-react"
import { ProductFormModal } from "@/components/products/ProductFormModal"
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

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBrand, setFilterBrand] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 14 Pro 256GB",
      brand: "Apple",
      price: 4999,
      stock: 12,
      stockType: 'serial',
      warranty: "12 meses",
      status: 'active'
    },
    {
      id: "2", 
      name: "Galaxy S23 Ultra 512GB",
      brand: "Samsung",
      price: 4299,
      stock: 8,
      stockType: 'serial',
      warranty: "12 meses",
      status: 'active'
    },
    {
      id: "3",
      name: "AirPods Pro 2ª Geração",
      brand: "Apple", 
      price: 1899,
      stock: 25,
      stockType: 'quantity',
      warranty: "12 meses",
      status: 'active'
    },
    {
      id: "4",
      name: "Capinha Transparente",
      brand: "Genérica",
      price: 49,
      stock: 150,
      stockType: 'quantity',
      warranty: "3 meses",
      status: 'active'
    },
    {
      id: "5",
      name: "iPad Air 5ª Geração",
      brand: "Apple",
      price: 4199,
      stock: 2,
      stockType: 'serial',
      warranty: "12 meses",
      status: 'active'
    }
  ])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterBrand === "" || product.brand === filterBrand
    return matchesSearch && matchesFilter
  })

  const brands = Array.from(new Set(products.map(p => p.brand)))

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Esgotado", variant: "destructive" as const }
    if (stock <= 5) return { label: "Baixo", variant: "destructive" as const }
    return { label: "Normal", variant: "secondary" as const }
  }

  const handleNewProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product)
  }

  const confirmDelete = () => {
    if (deleteProduct) {
      setProducts(prev => prev.filter(p => p.id !== deleteProduct.id))
      toast.success("Produto excluído com sucesso!")
      setDeleteProduct(null)
    }
  }

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      // Editing existing product
      setProducts(prev => prev.map(p => 
        p.id === productData.id ? productData : p
      ))
    } else {
      // Adding new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString()
      }
      setProducts(prev => [...prev, newProduct])
    }
  }

  const handleImport = () => {
    toast.info("Funcionalidade de importação será implementada em breve")
  }

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-title text-foreground">Produtos</h1>
            <p className="text-muted-foreground font-text">
              Gerencie seu catálogo de produtos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleImport}>
              <FileText className="h-4 w-4 mr-2" />
              Importar
            </Button>
            <Button className="btn-primary" onClick={handleNewProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Total de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title">{products.length}</div>
              <p className="text-xs text-success">+2 novos este mês</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title">
                R$ {products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">em estoque</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title text-warning">
                {products.filter(p => p.stock <= 5).length}
              </div>
              <p className="text-xs text-muted-foreground">produtos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-text">Marcas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-title">{brands.length}</div>
              <p className="text-xs text-muted-foreground">diferentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="">Todas as marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="font-title flex items-center gap-2">
              <List className="h-5 w-5" />
              Lista de Produtos
            </CardTitle>
            <CardDescription>
              {filteredProducts.length} produtos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Garantia</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium font-text">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell className="font-semibold">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{product.stock}</span>
                          <Badge variant={stockStatus.variant} className="text-xs">
                            {stockStatus.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {product.stockType === 'serial' ? 'IMEI/SN' : 'Quantidade'}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.warranty}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={product.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {product.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal de Produto */}
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={editingProduct}
          onSave={handleSaveProduct}
        />

        {/* Dialog de Confirmação de Exclusão */}
        <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o produto "{deleteProduct?.name}"? 
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ERPLayout>
  )
}
