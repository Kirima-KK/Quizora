'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { poppins } from './ui/font';
import { useSearchParams, usePathname, useRouter, redirect } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (!term) {
      params.delete('query');
    } else {
      params.set('query', term);
      params.set('page', "1");
    }

    replace(`${pathname}?${params.toString()}`);
    redirect(`/dashboard/search-result?${params.toString()}`);
  }

  return (
    <div className='relative flex flex-1 flex-shrink-0 items-center justify-center'>
      <button
        type="submit"
        onClick={() => handleSearch(searchValue)}
      >
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--theme-blue)]" />
      </button>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="default-search"
        className={`${poppins.className} text-xs md:text-sm w-full pl-10 pr-4 py-2 rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={placeholder}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(searchValue) }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}