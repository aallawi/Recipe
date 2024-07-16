import Image from "next/image";
import Link from 'next/link';
import { VscDebugBreakpointData } from "react-icons/vsc";
import { Awsome, Unique } from "../data/index"

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="height_section px-[15px] flex flex-col items-center background relative">
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
          <div className="flex justify-center items-center gap-[20px]">
            <button className="w-full btn-default h-[50px]"><Link href="menu">View Menu</Link></button>
            <button className="w-full btn-border h-[50px]"><Link href="favorite">My Favorites</Link></button>
          </div>
        </div>
        <span className="clip" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-[40px] px-[20px] my-[80px]">
        <div className="flex flex-col flex-1 max-w-[700px]">
          <h2 className="text-[40px] text-center text-secondary mb-[30px]">What Makes Us Unique</h2>
          {Unique.map((item) => (
            <div className="flex gap-[5px] mb-[20px]">
              <span><VscDebugBreakpointData color="#247291" size={22} /></span>
              <span className="text-[18px]">{item.text}</span>
            </div>
          ))}
          <button className="w-full btn-default h-[50px] max-w-[400px] mx-auto"><Link href="menu">View all meals</Link></button>
        </div>
        <div><Image src="/images/pizza.png" alt="spoon and fork" width={400} height={400} /></div>
      </div>

      <div className="py-[80px]">
        <h1 className="text-[40px] text-center text-secondary mb-[30px]">
          Our Awesome Services
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-[20px] md:gap-[60px]">
          {Awsome.map((item) => (
            <div key={item.id} className="flex justify-center items-center gap-[15px] p-[10px]">
              <div>
                <Image src={item.image} alt={item.title} width={70} height={70} />
              </div>
              <div>
                <h1 className="text-[20px] mb-[10px] text-secondary">{item.title}</h1>
                <p className="text-[16px] max-w-[200px]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



