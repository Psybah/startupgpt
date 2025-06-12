
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from './ui/sidebar';
import { MessageSquare, FileText, BookOpen, Settings, HelpCircle, ChevronLeft } from 'lucide-react';
import { TabType } from '../pages/Index';
import { useSidebar } from './ui/sidebar';

interface AppSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onTabChange
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const menuItems = [{
    title: "Chat Assistant",
    icon: MessageSquare,
    id: 'chat' as TabType,
    description: "AI legal consultation"
  }, {
    title: "Document Generator",
    icon: FileText,
    id: 'documents' as TabType,
    description: "Generate legal documents"
  }, {
    title: "Knowledge Base",
    icon: BookOpen,
    id: 'knowledge' as TabType,
    description: "Legal resources & guides"
  }];

  return (
    <Sidebar className="border-r bg-sidebar transition-all duration-300">
      <SidebarHeader className="border-b p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
              alt="StartupGPT" 
              className="h-8 w-8 flex-shrink-0" 
            />
            {!isCollapsed && (
              <div className="hidden md:block">
                <h2 className="font-clash font-bold text-lg text-primary">StartupGPT</h2>
                <p className="text-xs text-muted-foreground">Legal Assistant</p>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <SidebarTrigger className="h-8 w-8" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 md:px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.id)} 
                    isActive={activeTab === item.id} 
                    className={`w-full justify-start p-4 md:p-3 hover:bg-sidebar-accent rounded-lg transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'hover:bg-sidebar-accent'
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${
                      activeTab === item.id ? 'text-primary-foreground' : 'text-sidebar-foreground'
                    }`} />
                    {!isCollapsed && (
                      <div className="flex-1 text-left ml-3 min-w-0">
                        <div className={`font-medium text-sm truncate ${
                          activeTab === item.id ? 'text-primary-foreground' : 'text-sidebar-foreground'
                        }`}>
                          {item.title}
                        </div>
                        <div className={`text-xs truncate ${
                          activeTab === item.id 
                            ? 'text-primary-foreground/80' 
                            : 'text-sidebar-foreground/60'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-2">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start p-3 hover:bg-sidebar-accent rounded-lg transition-all duration-200"
              tooltip={isCollapsed ? "Settings" : undefined}
            >
              <Settings className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start p-3 hover:bg-sidebar-accent rounded-lg transition-all duration-200"
              tooltip={isCollapsed ? "Help & Support" : undefined}
            >
              <HelpCircle className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">Help & Support</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {!isCollapsed && (
          <div className="mt-4 p-3 bg-sidebar-accent rounded-lg">
            <p className="text-xs text-sidebar-foreground/60 leading-relaxed">
              ⚠️ AI guidance only - consult human lawyer for complex matters
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
