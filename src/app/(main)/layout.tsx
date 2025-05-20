import { Footer7 } from "@/components/footer7";
import { Navbar5 } from "@/components/navbar5";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col min-h-screen">
      <Navbar5 />
      <main className="flex-grow">
        {children}
      </main>
      <Footer7 />
    </div>
  );
}