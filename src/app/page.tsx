import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className=" max-w-[1200px] mx-auto min-h-screen flex flex-col items-center background relative">
      <div className=" flex-1 flex flex-col justify-center items-center pt-[40px] max-w-[600px] text-center">
        <h1 className=" font-[800]">Discover <span className=" text-secondary"> recipes </span> to inspire your cooking</h1>
        <span className=" relative w-[200px] h-[3px] bg-secondary my-[10px]" />
        <p>Explore diverse recipes to inspire your culinary creations.</p>
      </div>
      <div className="flex-1 relative z-[2] flex justify-center items-center">
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
      <div className="flex-1">
        <p className=" text-center max-w-[600px]">Welcome to <span className=" text-secondary"> "Recipe" </span> where we offer unique and delicious recipes for all tastes. Find everything you need to create delightful dishes.

        </p>
        <div className="mt-[40px] flex justify-center items-center gap-[50px]">
          <button className="btn-default"><Link href="menu">View Menu</Link></button>
          <button className="btn-border"><Link href="favorite">My Favorites</Link></button>
        </div>
      </div>
      <span className="clip" />
    </div>
  );
}
