import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex-1">
          <div className="h-[calc(100vh-4rem)] w-full border bg-card overflow-hidden relative">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
