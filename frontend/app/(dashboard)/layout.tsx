import Navbar from "@/app/(dashboard)/_components/navbar";
import Sidebar from "./_components/sidebar";
const DashnoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex md:pt-[80px] h-full w-56 fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      <main className="md:pl-56 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default DashnoardLayout;
