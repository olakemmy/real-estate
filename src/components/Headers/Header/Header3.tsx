import React, { FC, useEffect, useRef, useState } from 'react';
import Logo from '@/shared/Logo';
import useOutsideAlerter from '@/hooks/useOutsideAlerter';
import AvatarDropdown from './AvatarDropdown';
import MenuBar from '@/shared/MenuBar';
import { SearchTab } from '../HeroSearchForm/HeroSearchForm';
import HeroSearchForm2MobileFactory from '../HeroSearchForm2Mobile/HeroSearchForm2MobileFactory';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeroSearchFormSmall from '../HeroSearchFormSmall/HeroSearchFormSmall';
import { StaySearchFormFields } from '../type';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { fetchUserProperties } from '@/features/user/userApi';
import { setSearchActiveTab } from '@/features/properties/propertiesSlice';
import { FiMail } from 'react-icons/fi';
import { useAppDispatch } from '@/features/properties/propertiesApi';

interface Header3Props {
  className?: string;
}

let WIN_PREV_POSITION = 0;
if (typeof window !== 'undefined') {
  WIN_PREV_POSITION = (window as any).pageYOffset;
}

const Header3: FC<Header3Props> = ({ className = '' }) => {
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const { token } = useSelector((state: any) => state.user);
  const { userInfo, users } = useSelector((state: any) => state.user);
  const currentUserId = userInfo?.user?.id;

  const headerInnerRef = useRef<HTMLDivElement>(null);
  //
  const [showHeroSearch, setShowHeroSearch] =
    useState<StaySearchFormFields | null>();
  //
  const [currentTab, setCurrentTab] = useState<SearchTab>('Buy');

  //
  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null);
    setCurrentTab('Buy');
  });

  let pathname = usePathname();
  //

  useEffect(() => {
    setShowHeroSearch(null);
  }, [pathname]);

  // HIDDEN WHEN SCROLL EVENT
  useEffect(() => {
    window.addEventListener('scroll', handleEvent);
    return () => {
      window.removeEventListener('scroll', handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm);
  };

  const handleHideSearchForm = () => {
    if (!document.querySelector('#nc-Header-3-anchor')) {
      return;
    }
    //
    let currentScrollPos = window.pageYOffset;
    if (
      WIN_PREV_POSITION - currentScrollPos > 100 ||
      WIN_PREV_POSITION - currentScrollPos < -100
    ) {
      setShowHeroSearch(null);
    } else {
      return;
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  //
  const renderHeroSearch = () => {
    return (
      <div
        className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${
          showHeroSearch
            ? 'visible'
            : 'pointer-events-none invisible -translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0'
        }`}
      >
        <div className={`mx-auto w-full max-w-4xl pb-6`}>
          <HeroSearchFormSmall
            defaultFieldFocus={showHeroSearch || undefined}
            onTabChange={setCurrentTab}
            defaultTab={currentTab}
            setShowHeroSearch={setShowHeroSearch}
          />
        </div>
      </div>
    );
  };

  const renderButtonOpenHeroSearch = () => {
    return (
      <div
        className={`relative flex w-full items-center justify-between rounded-full border border-neutral-200 shadow transition-all hover:shadow-md dark:border-neutral-6000 ${
          showHeroSearch
            ? 'pointer-events-none invisible -translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0'
            : 'visible'
        }`}
      >
        <div className='flex items-center text-sm font-medium'>
          <span
            onClick={() => {
              setShowHeroSearch('Buy');
              dispatch(setSearchActiveTab('Buy'));
            }}
            className='block cursor-pointer py-3 pl-5 pr-4'
          >
            Buy
          </span>
          <span className='h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700'></span>
          <span
            onClick={() => {
              setShowHeroSearch('Rent');
              dispatch(setSearchActiveTab('Rent'));
            }}
            className='block cursor-pointer px-4 py-3 '
          >
            Rent
          </span>
        </div>

        <div
          className='ml-auto flex-shrink-0 cursor-pointer pr-2'
          onClick={() => setShowHeroSearch('Buy')}
        >
          <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary-500  text-white'>
            <MagnifyingGlassIcon className='h-5 w-5' />
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed inset-0 top-0 z-40 bg-black/30 transition-opacity will-change-[opacity] dark:bg-black/50  ${
          showHeroSearch ? 'visible' : 'pointer-events-none invisible opacity-0'
        }`}
      ></div>
      {showHeroSearch && <div id='nc-Header-3-anchor'></div>}
      <header
        ref={headerInnerRef}
        className={`sticky top-0 z-50 ${className} shadow-sm dark:border-b dark:border-neutral-700`}
      >
        <div
          className={`absolute inset-x-0 top-0 h-full bg-white transition-transform will-change-[transform,opacity] dark:bg-neutral-900
          ${showHeroSearch ? 'duration-75' : ''} 
          ${
            showHeroSearch
              ? currentTab === 'Buy' || currentTab === 'Rent'
                ? 'scale-y-[4.4]'
                : 'scale-y-[3.4]'
              : ''
          }`}
        ></div>
        <div className='relative flex h-[88px] px-4 lg:container'>
          <div className='flex flex-1 justify-between'>
            <div className='relative z-10 hidden flex-1 items-center md:flex'>
              <Logo />
            </div>

            <div className='mx-auto flex flex-[2] lg:flex-none'>
              <div className='hidden flex-1 self-center lg:flex'>
                {renderButtonOpenHeroSearch()}
              </div>
              <div className='mx-auto w-full max-w-lg flex-1 self-center lg:hidden'>
                <HeroSearchForm2MobileFactory />
              </div>
              {renderHeroSearch()}
            </div>

            <div className='relative z-10 hidden flex-1 justify-end text-neutral-700 dark:text-neutral-100 md:flex'>
              <div className=' flex items-center space-x-1'>
                {token || session ? (
                  <Link
                    href={'/create-listing'}
                    className='hidden items-center self-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300 xl:inline-flex'
                  >
                    List your property
                  </Link>
                ) : (
                  ''
                )}
                {token || session ? <AvatarDropdown /> : ''}

                {!token && !session ? (
                  <div className='flex items-center justify-center space-x-3'>
                    <Link href={'/signup'}>
                      <button type='button' className='cursor-pointer'>
                        Sign up
                      </button>
                    </Link>
                    <Link href={'/login'}>
                      <button type='button' className='cursor-pointe'>
                        Log in
                      </button>
                    </Link>
                  </div>
                ) : null}

                <MenuBar />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
