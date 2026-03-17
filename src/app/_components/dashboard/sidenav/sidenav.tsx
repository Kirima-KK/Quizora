import NavLinks from "./nav-links";
import { poppins } from "../../ui/font";
import Logo from "@/app/_components/dashboard/sidenav/logo";
import LogoutButton from "./logout-button";

export default function SideNav() {

  return (
    <div className={`${poppins.className} fixed flex flex-col h-screen w-16 p-2 pt-6 md:p-8 gap-16 md:w-64`}>
      <Logo />
      <div className="flex flex-col grow items-center md:items-stretch justify-between md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <LogoutButton />
      </div>
    </div>
  );
}