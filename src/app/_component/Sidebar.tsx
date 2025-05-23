'use client';

import { FaHamburger } from 'react-icons/fa';

import { usePathname } from 'next/navigation';
import {
    forumDir,
    forumNavObject,
    iconBackForward,
    ledgerNavObject,
    non_authMainDir,
    profileDir,
    profileNavObject,
    TNavObjectGroup,
} from '@/_constants/navigateConstants';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // 창 크기에 따라 사이드바 상태 관리
    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        const handleResize = () => {
            // md 브레이크포인트: 768px
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);

            if (!isMobileView) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        // 초기 실행
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [pathname]);

    // 사이드바 토글가능 상태일때 사이드바 열리면 body 스크롤 막기
    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto'; // Cleanup
        };
    }, [isOpen, isMobile]);

    return (
        <div className="fixed flex h-full">
            {/*햄버거버튼 클릭시 배경 흐리게*/}
            {isOpen && isMobile && (
                <div
                    className="absolute -top-16 -left-6 w-screen h-full bg-gray-500/70 overflow-y-hidden"
                    onClick={() => {
                        setIsOpen(false);
                    }}
                />
            )}

            {/* 사이드바 컨테이너 */}
            <div
                className={`fixed left-0 md:relative md:top-0 top-16 md:w-52 w-48 h-sidebar transition-transform duration-300
                    ${isOpen ? 'translate-x-4 bg-sky-100' : isMobile ? '-translate-x-48 text-sm' : ''} 
                    md:translate-x-0 z-40 rounded-md`}
            >
                {/* 햄버거 버튼 (사이드바 안에 위치) */}
                <button
                    className="absolute top-4 right-[-40px] p-2 text-gray-500 hover:text-white bg-blue-300 rounded-r-lg shadow md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                    <FaHamburger size={20} />
                </button>

                {/* 사이드바 내용 */}
                <aside className="overflow-y-auto h-full">
                    <div className="flex flex-col py-6 w-full px-4 h-fit">
                        <div className="flex justify-between rounded-md bg-blue-300 px-6 py-2 h-side-nav">
                            {Object.values(iconBackForward).map((icon) => {
                                //todo 뒤로가기 앞으로가기 불가능하면 버튼 비활성화
                                return (
                                    <button
                                        key={`side_${icon.keyName}`}
                                        type="button"
                                        onClick={icon.onClick}
                                        className={`cursor-pointer text-2xl transform duration-100
                                        ${icon.keyName.includes('Back') ? 'hover:pl-1 hover:text-3xl' : 'hover:pr-1 hover:text-3xl'}`}
                                    >
                                        {icon.icon}
                                    </button>
                                );
                            })}
                        </div>

                        {/*네비게이션 컴포넌트*/}
                        <div className="pt-16 flex flex-col gap-6 text-gray-500 h-fit md:text-base text-sm">
                            <SidebarNavigation pathname={pathname} />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

// 네비게이션 링크 모임 컴포넌트
function SidebarNavigation({ pathname }: { pathname: string }) {
    const navMap: { dir: string; navObject: TNavObjectGroup }[] = [
        { dir: non_authMainDir, navObject: ledgerNavObject },
        { dir: forumDir, navObject: forumNavObject },
        { dir: profileDir, navObject: profileNavObject },
    ];

    const match = navMap.find(({ dir }) => {
        return pathname.includes(dir);
    });

    return match ? makeNavByPathname(match.navObject, pathname) : null;
}

// 네비게이션 링크 컴포넌트 반환하는 함수
function makeNavByPathname(navObject: TNavObjectGroup, pathname: string) {
    return Object.values(navObject).map((nav) => {
        return (
            <Link
                key={`side_${nav.url}`}
                href={nav.url}
                className={`${nav.url === pathname ? 'bg-blue-200 text-black ' : ''} 
                                        hover:text-black
                                        flex flex-row rounded-md px-4 py-2 h-side-nav content-center items-center gap-4`}
            >
                {nav.icon}
                <p>{nav.displayName}</p>
            </Link>
        );
    });
}
