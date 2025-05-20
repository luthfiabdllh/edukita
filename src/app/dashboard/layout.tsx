// app/dashboard/layout.tsx
import { Footer7 } from "@/components/footer7";
import MainLayout from "@/components/mainLayout";
import { Navbar5 } from "@/components/navbar5";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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
