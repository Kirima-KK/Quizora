import { poppins } from "../../_components/ui/font";
import { Login } from "../../_components/login";

export default function Page() {
  return (
    <div className={`${poppins.className} flex flex-col md:flex-row h-screen`}>
      <Login />
    </div >
  );
}