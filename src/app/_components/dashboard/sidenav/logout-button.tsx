'use client'

import LogoutIcon from "@/app/_assets/icons/ri_logout-box-fill.svg";
import { useLogout } from "@/app/_hooks/useSubmit";

export default function LogoutButton() {
  const { isLoading, logout } = useLogout();

  async function handleLogout(event: React.MouseEvent<HTMLElement>): Promise<void> {
    event.preventDefault();

    logout();
  }

  return (
    <>
      <form className="mt-auto flex justify-center md:justify-start text-[var(--theme-grey)] hover:bg-sky-100 hover:text-blue-600">
        <button
          onClick={handleLogout}
          className={`font-bold flex w-[48px] h-[48px] md:w-full grow items-center justify-center gap-2 rounded-md p-1 md:p-3 text-sm text-[var(--theme-grey)] font-medium md:flex-none md:justify-start hover:text-blue-600`}>
          <LogoutIcon className="w-8 h-8 md:h-6 text-[var(--theme-blue)]" />
          <p className={`font-semibold hidden md:block`}>Log Out</p>
        </button>
      </form>
    </>
  );
}