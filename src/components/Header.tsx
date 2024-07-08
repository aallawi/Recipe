"use client";
import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdFastfood, MdFavorite } from 'react-icons/md';

const Header: FC = () => {
    const pathname = usePathname();

    return (
        <div className='bg-body'>
            <div className="flex justify-between items-center p-2 max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
                <div className="text-2xl font-bold text-secondary">
                    <Link href="/">
                        <h2>Recipe</h2>
                    </Link>
                </div>
                <div className="flex gap-5">
                    <Link href="/meals">
                        <div className={`flex items-center gap-2 text-[16px] h-[34px] px-[15px] py-[2px] rounded-sm ${pathname === '/menu' ? 'bg-primary text-secondary border border-b-[5px] border-secondary' : 'bg-secondary text-white  border-secondary'}`}>
                            <MdFastfood />
                            <span>Menu</span>
                        </div>
                    </Link>
                    <Link href="/favorite">
                        <div className={`flex items-center gap-2 text-[16px] h-[34px] px-[15px] py-[2px] rounded-sm ${pathname === '/favorite' ? 'bg-primary text-secondary border border-b-[5px] border-secondary' : 'bg-secondary text-white  border-secondary'}`}>
                            <MdFavorite />
                            <span>Favorite</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
