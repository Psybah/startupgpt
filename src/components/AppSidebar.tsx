import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from './ui/sidebar';
import { MessageSquare, FileText, BookOpen, Settings, LogOut, Users } from 'lucide-react';
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
  const { isMobile, setOpenMobile } = useSidebar();

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
  }, {
    title: "Community",
    icon: Users,
    id: 'community' as TabType,
    description: "Connect with founders & lawyers"
  }];

  const handleTabChange = (tab: TabType) => {
    onTabChange(tab);
    // Close mobile sidebar when a tab is selected
    if (isMobile) {
      setOpenMobile(false);
    }
  };

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
    <Sidebar className="border-r bg-white shadow-sm" collapsible="icon">
      <SidebarHeader className="border-b border-gray-100 p-4 lg:p-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/81864f48-4da2-4487-86ea-0757c50afeee.png" 
            alt="StartupGPT" 
            className="h-8 flex-shrink-0" 
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleTabChange(item.id)} 
                    isActive={activeTab === item.id} 
                    className="w-full justify-start p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-3"
                    tooltip={item.title}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0 text-gray-600" />
                    <div className="flex-1 text-left ml-4 group-data-[collapsible=icon]:hidden">
                      <div className="font-medium text-sm text-gray-900">{item.title}</div>
                      {/* <div className="text-xs text-gray-500 mt-1">{item.description}</div> */}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-3"
              tooltip="Settings"
            >
              <Settings className="h-4 w-4 flex-shrink-0 text-gray-600" />
              <span className="ml-3 text-sm text-gray-900 group-data-[collapsible=icon]:hidden">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="w-full justify-start p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-3"
              tooltip="Logout"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className="ml-3 text-sm group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-amber-700 leading-relaxed">
            ⚠️ AI guidance only - consult human lawyer for complex matters
          </p>
        </div>
      </SidebarFooter>
      
      {/* SidebarRail for collapse functionality */}
      <SidebarRail />
    </Sidebar>
  );
};
