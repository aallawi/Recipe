import Link from 'next/link';
import Image from "next/image";
import "../../style/globals.css"

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col gap-[15px] py-[20px] items-center justify-center text-black bg-primary">
            <div className="text-[35px] flex md:text-[40px] font-bold text-secondary">
                <Link href="/">
                    <h2>Recipe</h2>
                </Link>
                <Image src="/images/spoon-and-fork.svg" className="mx-auto" alt="spoon and fork" width={40} height={40} />
            </div>
            <div>Find the perfect meal recipe for you &#127828;</div>
            <div className="text-[14px]">
                © Copyright 2024 developed by <Link href="https://allawi.netlify.app/" target="_blank" rel="Sources" className=" text-secondary">Ahmed Allawi</Link>.All rights reserved
            </div>
        </div>
    );
};

export default Footer;
