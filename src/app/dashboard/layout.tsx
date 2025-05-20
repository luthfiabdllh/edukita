import MainLayout from "@/components/mainLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainLayout>{children}</MainLayout>
    </SidebarProvider>
  );
}
