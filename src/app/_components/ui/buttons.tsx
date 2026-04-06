import { ButtonInfo } from "@/app/_lib/definition";
import { Spinner } from "@heroui/react";

export const BlueButton = ({ info }: { info: ButtonInfo }) => {
  return (
    <>
      <button
        disabled={info.isDisabled}
        type={info.type}
        className={`flex justify-center items-center ${info.size} px-6 py-2 bg-[var(--theme-blue)] text-white text-xl font-semibold rounded-lg
            hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]`}
        onClick={info.onClick}
      >
        {info.isLoading ? <Spinner size="lg" className="text-white" /> : info.label}
      </button>
    </>
  );
}

export const WhiteButton = ({ info }: { info: ButtonInfo }) => {
  return (
    <>
      <button
        disabled={info.isDisabled}
        type={info.type}
        className={`flex justify-center items-center z-10 px-6 py-2 ${info.size} bg-white text-[var(--theme-blue)] text-xl font-semibold rounded-lg border border-s border-[var(--theme-blue)]
            hover:bg-[var(--theme-blue)] hover:text-white`}
        onClick={info.onClick}
      >
        {info.isLoading ? <Spinner size="lg" className="text-[var(--theme-blue)]" /> : info.label}
      </button>
    </>
  );
}