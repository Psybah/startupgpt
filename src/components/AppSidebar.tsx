
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from './ui/sidebar';
import { MessageSquare, FileText, BookOpen, Settings, LogOut } from 'lucide-react';
import { TabType } from '../pages/Index';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Error signing out');
        console.error('Error signing out:', error);
      } else {
        toast.success('Signed out successfully');
        // Clear any local storage items related to onboarding
        localStorage.removeItem('startupgpt_onboarding_completed');
        // Reload the page to reset the app state
        window.location.reload();
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast.error('Unexpected error occurred');
    }
  };

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
            alt="StartupGPT" 
            className="h-8 w-8" 
          />
          {/* No text beside logo on any screen size */}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.id)} 
                    isActive={activeTab === item.id} 
                    className="w-full justify-start p-4 hover:bg-sidebar-accent transition-colors duration-200 group-data-[collapsible=icon]:justify-center"
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left ml-3 group-data-[collapsible=icon]:hidden">
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-sidebar-foreground/60 mt-0.5">{item.description}</div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start p-3 hover:bg-sidebar-accent transition-colors duration-200 group-data-[collapsible=icon]:justify-center">
              <Settings className="h-4 w-4 flex-shrink-0" />
              <span className="ml-3 group-data-[collapsible=icon]:hidden">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="w-full justify-start p-3 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group-data-[collapsible=icon]:justify-center"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className="ml-3 group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-4 p-3 bg-sidebar-accent rounded-lg group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-sidebar-foreground/60">
            ⚠️ AI guidance only - consult human lawyer for complex matters
          </p>
        </div>
      </SidebarFooter>
      
      {/* Add SidebarRail for collapse functionality */}
      <SidebarRail />
    </Sidebar>
  );
};
