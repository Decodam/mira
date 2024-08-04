import Sidebar from "@/components/sidebar";


export default function AppLayout({children}) {
  return (
    <div className="h-svh w-svw flex overflow-hidden">
      <Sidebar />
      <div className="bg-muted flex-1">
        {children}
      </div>
    </div>
  );
}