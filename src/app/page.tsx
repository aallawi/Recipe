import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto height_section px-[15px] flex flex-col items-center background relative">
      <div className="flex-1 flex flex-col justify-center items-center mt-[20px] max-w-[600px] text-center">
        <div className="title text-[35px] font-[600] md:text-[50px] md:leading-[70px] text-secondary md:text-white">Discover recipes to inspire your cooking</div>
      </div>
      <div className="relative z-[2] flex justify-center items-center">
        <div className=" border-[5px] border-secondary rounded-full">
          <div className="w-[240px] h-[240px] flex justify-center items-center bg-secondary rounded-full m-[8px] ">
            <Image
              src="/images/sandwitch.png"
              width={180}
              height={180}
              alt="sandwitch"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around flex-1">
        <p className=" text-center text-[20px] max-w-[600px]">Welcome to <span className=" text-secondary"> "Recipe" </span> where we offer unique and delicious recipes for all tastes. Find everything you need to create delightful dishes.</p>
        <div className="flex justify-center items-center gap-[50px]">
          <button className="btn-default"><Link href="menu">View Menu</Link></button>
          <button className="btn-border"><Link href="favorite">My Favorites</Link></button>
        </div>
      </div>
      <span className="clip" />
    </div>
  );
}
