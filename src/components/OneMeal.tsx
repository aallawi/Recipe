"use client";

import { FC } from 'react';
import Image from "next/image";
import Link from "next/link";
import "../../style/globals.css";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

interface OneMealProps {
    meal: Meal;
}

const OneMeal: FC<OneMealProps> = ({ meal }) => {
    return (
        <Link key={meal.idMeal} href={`/menu/${meal.idMeal}`} className="group">
            <div className="relative w-[250px] h-[250px]">
                <Image src="/images/bottom-right.png" height={60} width={60} className="absolute bottom-[-5px] left-[-15px] z-10" alt="Bottom right decoration" />
                <span className="absolute h-[250px] w-[250px] left-0 top-0 rotate-[5deg] bg-[#bbe4e9] group-hover:bg-primary border border-[#c2b59d] transition-all duration-300 ease-in-out" />
                <div className="absolute h-[250px] w-[250px] flex justify-center items-center bg-[#bbe4e9] group-hover:bg-primary border border-[#c2b59d] transition-all duration-300 ease-in-out">
                    <Image src={meal.strMealThumb} height={230} width={230} className="bg-cover" alt={meal.strMeal} />
                </div>
                <Image src="/images/top-left.png" height={60} width={60} className="absolute top-[-5px] right-[-15px] z-10" alt="Top left decoration" />
            </div>
            <button className="one_line text-[18px] mt-[15px] py-[10px] pl-[10px] leading-[35px] w-[250px] bg-secondary text-white group-hover:text-black group-hover:bg-primary transition-all duration-300 ease-in-out">
                {meal.strMeal}
            </button>
        </Link>
    );
};

export default OneMeal;