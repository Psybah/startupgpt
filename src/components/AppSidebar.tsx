import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { MessageSquare, FileText, BookOpen, Settings, HelpCircle } from 'lucide-react';
import { TabType } from '../pages/Index';
interface AppSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}
export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onTabChange
}) => {
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
  return <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center space-x-3">
          <img src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" alt="StartupGPT" className="h-8" />
          <div>
            
            
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onTabChange(item.id)} isActive={activeTab === item.id} className="w-full justify-start p-3 hover:bg-sidebar-accent">
                    <item.icon className="mr-3 h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-sidebar-foreground/60">{item.description}</div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <HelpCircle className="mr-3 h-4 w-4" />
              Help & Support
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-4 p-3 bg-sidebar-accent rounded-lg">
          <p className="text-xs text-sidebar-foreground/60">
            ⚠️ AI guidance only - consult human lawyer for complex matters
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>;
};