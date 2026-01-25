import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderOpen,
  Settings,
  BarChart3,
  LogOut,
  ImageIcon,
  Tag,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNavItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Categories", url: "/admin/categories", icon: FolderOpen },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", url: "/admin/customers", icon: Users },
];

const managementItems = [
  { title: "Media Library", url: "/admin/medialibrary", icon: ImageIcon },
  { title: "Promotions", url: "/admin/promotions", icon: Tag },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar 
      className="border-r border-sidebar-border bg-sidebar"
      collapsible="icon"
    >
      {/* Logo */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Y</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-sidebar-foreground tracking-wider text-sm">YELLOW</h1>
              <p className="text-[10px] text-sidebar-foreground/60 tracking-widest">ADMIN</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <Separator className="bg-sidebar-border" />

      <SidebarContent className="px-2 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs font-medium uppercase tracking-wider mb-2">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                    className="h-10"
                  >
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs font-medium uppercase tracking-wider mb-2">
            {!collapsed && "Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                    className="h-10"
                  >
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 mt-auto">
        <Separator className="bg-sidebar-border mb-4" />
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground text-sm">
              AD
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">admin@yellow.com</p>
            </div>
          )}
          {!collapsed && (
            <button className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
              <LogOut className="h-4 w-4 text-sidebar-foreground/70" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
