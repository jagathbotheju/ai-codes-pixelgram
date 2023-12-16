import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none md:border-r lg:w-64">
        <SideNav />
      </div>

      <div className="flex flex-col w-full">
        <Header />
        <div className="mx-auto mt-12 flex w-full max-w-7xl flex-1 flex-grow sm:p-6 md:mt-0 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
