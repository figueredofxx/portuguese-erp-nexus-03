
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  Grid2x2, 
  CirclePlus, 
  List, 
  Search, 
  Plus, 
  FileText, 
  Check, 
  Calendar, 
  ChevronDown,
  ChevronRight,
  CreditCard
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: Grid2x2,
    badge: null
  },
  { 
    title: "Ponto de Venda", 
    url: "/point-of-sale", 
    icon: CirclePlus,
    badge: "PDV"
  },
  { 
    title: "Produtos", 
    url: "/products", 
    icon: List,
    badge: null
  },
  { 
    title: "Estoque", 
    url: "/inventory", 
    icon: Search,
    badge: "5"
  },
  { 
    title: "Clientes", 
    url: "/customers", 
    icon: Plus,
    badge: null
  },
  { 
    title: "Vendas", 
    url: "/sales", 
    icon: Check,
    badge: null
  },
  { 
    title: "Financeiro", 
    url: "/financial", 
    icon: FileText,
    badge: null
  },
  { 
    title: "Relatórios", 
    url: "/reports", 
    icon: Calendar,
    badge: null
  },
  { 
    title: "Assinatura", 
    url: "/subscription", 
    icon: CreditCard,
    badge: null
  }
]

export function ERPSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['main'])
  const collapsed = state === 'collapsed'

  const isActive = (path: string) => currentPath === path

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-sidebar-background border-r border-sidebar-border`}
    >
      <SidebarContent>
        {/* Header do Sistema */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-title font-bold text-sm">ERP</span>
              </div>
              <div>
                <h1 className="font-title font-bold text-sidebar-foreground">Sistema ERP</h1>
                <p className="text-xs text-muted-foreground">Gestão Completa</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-title font-bold text-sm">ERP</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-4 py-2">
            {!collapsed && (
              <>
                <span className="font-title font-semibold text-sidebar-foreground">Menu Principal</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleGroup('main')}
                  className="h-4 w-4 p-0 hover:bg-transparent text-sidebar-foreground"
                >
                  {expandedGroups.includes('main') ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
              </>
            )}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11 px-3">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="font-text font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant={isActive(item.url) ? "secondary" : "outline"}
                              className="ml-auto h-5 px-2 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configurações */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <NavLink to="/my-business" className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-smooth">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">MB</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-text font-medium text-sm text-sidebar-foreground truncate">Meu Negócio</p>
                <p className="text-xs text-muted-foreground truncate">Configurações</p>
              </div>
            </NavLink>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
