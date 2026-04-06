import "@/app/_components/ui/globals.css";
import SearchBar from "../../_components/search-bar";
import SideNav from "../../_components/dashboard/sidenav/sidenav";
import Avatar from "../../_components/dashboard/profile/avatar";
import { Breadcrumb } from "../../_components/breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideNav />
      <div className="flex flex-col flex-1 min-h-screen ml-16 md:ml-64">
        <header className="flex md:h-[89px] sm:h-[64px] items-center px-2 mx-4 md:px-8 py-4 bg-white">
          <SearchBar placeholder="Search Quiz" />
          <Avatar />
        </header>
        <Breadcrumb />
        <main className="flex flex-1 p-6 md:p-8 shadow-xl mr-4 md:mr-8 md:mb-4 h-fit rounded-lg">{children}</main>
      </div>
    </div>
  );
}
