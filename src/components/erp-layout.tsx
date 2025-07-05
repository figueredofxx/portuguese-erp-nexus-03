
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ERPSidebar } from "./erp-sidebar"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ERPLayoutProps {
  children: React.ReactNode
}

export function ERPLayout({ children }: ERPLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ERPSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center gap-4 px-4">
            <SidebarTrigger className="shrink-0 text-card-foreground" />
            
            <div className="flex-1 flex items-center gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos, clientes, vendas..." 
                  className="pl-10 bg-background text-foreground border-input"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-foreground border-input">
                  Suporte
                </Button>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">IZ</span>
                </div>
              </div>
            </div>
          </header>

          {/* Conteúdo Principal */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
