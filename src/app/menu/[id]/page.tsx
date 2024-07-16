"use client";

import axios from "axios";
import Image from "next/image";
import { FadeLoader } from "react-spinners";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { BsPinMapFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import "../../../../style/globals.css";
import { Meal, IngredientWithMeasure } from "../../../types/index"


const SingleMeal: FC = () => {
    const params = useParams();
    const { id } = params;
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [ingredientsWithMeasures, setIngredientsWithMeasures] = useState<IngredientWithMeasure[]>([]);

    const getMeal = async (id: string): Promise<Meal | undefined> => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        return data?.meals?.[0];
    };

    const options = {
        queryKey: ["getMeal", id as string],
        queryFn: () => getMeal(id as string),
    };

    const { data, isLoading, isError }: UseQueryResult<Meal | undefined> = useQuery(options);

    const savedMeal = (id: string, saveOrNot: boolean) => {
        setIsSaved(saveOrNot);
        if (typeof window !== "undefined") {
            const savedMeals = localStorage.getItem('savedMeals');
            if (savedMeals) {
                const parsedSavedMeals: string[] = JSON.parse(savedMeals);
                if (saveOrNot) {
                    parsedSavedMeals.push(id);
                    localStorage.setItem('savedMeals', JSON.stringify(parsedSavedMeals));
                } else {
                    const updatedMeals = parsedSavedMeals.filter(mealId => mealId !== id);
                    localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
                }
            } else {
                localStorage.setItem('savedMeals', JSON.stringify(saveOrNot ? [id] : []));
            }
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedMeals: string[] = JSON.parse(localStorage.getItem('savedMeals') || '[]');
            setIsSaved(savedMeals.includes(id.toString()));
        }
    }, [id]);

    useEffect(() => {
        if (data) {
            const ingredients = Object.keys(data)
                .filter((key) => key.startsWith("strIngredient"))
                .filter((key) => data[key] !== "" && data[key] !== null);

            const ingredientsWithMeasures = ingredients.map((key, index) => ({
                index: index + 1,
                ingredient: data[key] as string,
                measure: data[`strMeasure${index + 1}`] as string,
            }));
            setIngredientsWithMeasures(ingredientsWithMeasures);
        }
    }, [data]);

    return (
        <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] pt-[40px]">
            {data && (
                <div>
                    {/* img & title */}
                    <div className="flex justify-center gap-[30px] mb-[40px] flex-col sm:flex-row sm:gap-[40px]">
                        {/* img */}
                        <div className="relative w-[300px] h-[300px] mx-auto">
                            <Image src="/images/bottom-right.png" height={60} width={60} className="absolute bottom-[-5px] left-[-18px] z-10" alt="Bottom right decoration" />
                            <span className="absolute h-[300px] w-[300px] left-0 top-0 rotate-[5deg] bg-[#dad6cf] border border-[#c2b59d] transition-all duration-300 ease-in-out" />
                            <div className="absolute h-[300px] w-[300px] flex justify-center items-center bg-[#dad6cf] border border-[#c2b59d] transition-all duration-300 ease-in-out">
                                <Image src={data.strMealThumb} height={280} width={280} className="bg-cover" alt={data.strMeal} />
                            </div>
                            <Image src="/images/top-left.png" height={60} width={60} className="absolute top-[-5px] right-[-18px] z-10" alt="Top left decoration" />
                        </div>
                        {/* title */}
                        <div className="flex flex-col justify-between gap-[15px] flex-1">
                            <p className="title text-center text-[40px] text-secondary md:text-white sm:text-left mb-[15px]">{data.strMeal}</p>
                            <div className="flex gap-[8px] items-center text-[18px]">
                                <span>
                                    <BsPinMapFill color="#247291" size={20} />
                                </span>
                                <span>
                                    Area : {data.strArea}
                                </span>
                            </div>
                            <div className="flex gap-[8px] items-center text-[18px]">
                                <span>
                                    <MdCategory color="#247291" size={20} />
                                </span>
                                <span>
                                    Category : {data.strCategory}
                                </span>
                            </div>
                            {data.strTags && (
                                <div className="flex gap-[8px] items-center text-[18px]">
                                    <span>
                                        <IoMdPricetags color="#247291" size={20} />
                                    </span>
                                    <span>
                                        Tags : {data.strTags}
                                    </span>
                                </div>
                            )}

                            {/* btns */}
                            <div className="flex items-center gap-4">
                                {data.strSource && (
                                    <button className="btn-border">
                                        <a href={data.strSource} target="_blank" rel="Sources">
                                            Sources
                                        </a>
                                    </button>
                                )}
                                {data.strYoutube && (
                                    <button className="btn-border">
                                        <a href={data.strYoutube} target="_blank" rel="Sources">
                                            Watch video
                                        </a>
                                    </button>
                                )}
                            </div>

                            {/* btn favorite */}
                            {isSaved ? (
                                <button className="flex items-center justify-center gap-[6px] h-[45px] w-fit px-[20px] bg-primary border border-black" onClick={() => savedMeal(data.idMeal, false)} >
                                    <FaStar /> <span>Remove from favorite meals</span>
                                </button>
                            ) : (
                                <button className="flex items-center justify-center gap-[6px] btn-default h-[45px] w-fit px-[20px]" onClick={() => savedMeal(data.idMeal, true)} >
                                    <FaStar /> <span>Add to favorite meals</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Ingredients */}
                    {ingredientsWithMeasures && (
                        <div className="my-[50px] md:flex md:flex-1 md:justify-center md:items-end">
                            <div className="md:flex-1">
                                <h1 className="text-[40px] text-secondary mb-[15px]">Ingredients : </h1>
                                <table className=" w-full max-w-[800px]">
                                    <tbody>
                                        {ingredientsWithMeasures.map((item) => (
                                            <tr key={item.index} className={`${item.index % 2 === 0 ? "bg-[#bbe4e9]" : "bg-[#79c2d0]"} hover:bg-[#5585b5] hover:text-white text-[18px]`} >
                                                <td className="w-1/2 pl-[10px]">
                                                    {item.index} - {item.ingredient}
                                                </td>
                                                <td className="w-1/2 pl-[10px]">
                                                    {item.measure}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="hidden md:flex-1 md:block md:items-center">
                                <Image src="/images/cooking.svg" className="mx-auto" alt="Cooking SVG" width={300} height={300} />
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    {data.strInstructions && (
                        <div className="pb-[80px]">
                            <h1 className="text-[40px] text-secondary mb-[15px]">Instructions : </h1>
                            {data.strInstructions.split(/(?<!\d)\.(?=\s|$)/).filter((sentence) => sentence.trim() !== '').map((sentence) => (
                                <div className="flex gap-[6px] mb-[10px]">
                                    <span>
                                        <VscDebugBreakpointData color="#247291" size={25} />
                                    </span>
                                    <span key={sentence} className="text-[18px]">
                                        {sentence} .
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isLoading && (
                <div className="flex justify-center pb-[50px]">
                    <FadeLoader
                        color="#247291"
                        height={20}
                        radius={2}
                        width={4}
                    />
                </div>
            )}
        </div >
    );
}

export default SingleMeal;
