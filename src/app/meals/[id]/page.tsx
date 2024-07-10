"use client";

import axios from "axios";
import Image from "next/image";
import { FadeLoader } from "react-spinners";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MdArrowForwardIos } from 'react-icons/md';
import { FaStar } from "react-icons/fa6";
interface Meal {
    idMeal: string;
    [key: string]: any;
}


const SingleMeal: FC = () => {
    const params = useParams();
    const { id } = params;
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [showFullText, setShowFullText] = useState(false);

    const getSingleMeal = async (id: string): Promise<Meal | undefined> => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(data?.meals?.[0]);
        return data?.meals?.[0];
    };

    const options = {
        queryKey: ["getSingleMeal", id as string],
        queryFn: () => getSingleMeal(id as string),
    };

    const { data, isLoading, isError }: UseQueryResult<Meal | undefined> = useQuery(options);

    useEffect(() => {
        const checkSavedMeals = () => {
            if (localStorage.getItem("savedMeals")) {
                const savedMeals: string[] = JSON.parse(localStorage.getItem("savedMeals") || "[]");
                // setIsSaved(savedMeals.includes(id));
            } else {
                localStorage.setItem("savedMeals", JSON.stringify([]));
            }
        };

        checkSavedMeals();
    }, [id]);

    const firstLine = data?.strInstructions.slice(0, 200);

    const handleShow = (moreOrless) => {
        setShowFullText(moreOrless);
    };

    const savedMeal = (saveOrNot) => {
        setIsSaved(saveOrNot);
    };

    return (
        <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] pt-[40px]">
            {data && (
                <div>
                    {/* img & title */}
                    <div className="flex justify-center gap-[30px] mb-[30px] flex-col sm:flex-row sm:gap-[40px]">
                        {/* img */}
                        <div className="relative w-[300px] h-[300px] mx-auto">
                            <Image src="/images/bottom-right.png" height={60} width={60} className="absolute bottom-[-5px] left-[-18px] z-10" alt="Bottom right decoration" />
                            <span className="absolute h-[300px] w-[300px] left-0 top-0 rotate-[5deg] bg-[#dad6cf] border border-[#c2b59d] transition-all duration-300 ease-in-out" />
                            <div className="absolute h-[300px] w-[300px] flex justify-center items-center bg-[#dad6cf] border border-[#c2b59d] transition-all duration-300 ease-in-out">
                                <Image src={data?.strMealThumb} height={280} width={280} className="bg-cover" alt={data?.strMeal} />
                            </div>
                            <Image src="/images/top-left.png" height={60} width={60} className="absolute top-[-5px] right-[-18px] z-10" alt="Top left decoration" />
                        </div>
                        {/* title */}
                        <div className="flex flex-col justify-between gap-[15px] flex-1">
                            <p className="text-[25px] font-[800] text-center text-secondary sm:text-left">{data?.strMeal}</p>
                            <p className="text-[16px]">Area : {data?.strArea}</p>
                            <p className="text-[16px]">Category : {data?.strCategory}</p>

                            {data?.strTags && (
                                <p className="text-[16px]">Tags : {data?.strTags}</p>
                            )}

                            {/* btns */}
                            <div className="flex items-center gap-4">
                                {data.strSource && (
                                    <button className="btn-border">
                                        <a href={data?.strSource} target="_blank" rel="Sources">
                                            Sources
                                        </a>
                                    </button>
                                )}
                                {data.strYoutube && (
                                    <button className="btn-border" onClick={() => savedMeal}>
                                        <a href={data?.strYoutube} target="_blank" rel="Sources">
                                            Watch video
                                        </a>
                                    </button>
                                )}
                            </div>

                            {/* btn favorite */}
                            {isSaved ? (
                                <button className="flex items-center justify-center gap-[6px] h-[45px] w-fit px-[20px] bg-primary" onClick={() => savedMeal(false)} >
                                    <FaStar /> <span>Added to favorite meals</span>
                                </button>
                            ) : (
                                <button className="flex items-center justify-center gap-[6px] btn-border h-[45px] w-fit px-[20px]" onClick={() => savedMeal(true)} >
                                    <FaStar /> <span>Add to favorite meals</span>
                                </button>
                            )}
                        </div>
                    </div>


                    {/* des */}
                    <div className=" text-[12px] font-[500] mb-[30px]">
                        <span className=" text-[16px] font-[600] text-secondary underline">Description of how the meal is made</span> : {" "}
                        {showFullText ? data?.strInstructions : firstLine}

                        {showFullText ? (
                            <button onClick={() => handleShow(false)} className="text-blue-600 hover:underline">
                                View Less
                            </button>
                        ) : (
                            <button onClick={() => handleShow(true)} >
                                <span className="flex items-center text-blue-600 hover:underline gap-[5px] group">
                                    ... View More
                                    <MdArrowForwardIos className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </button>
                        )}
                    </div>
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

        </div>
    );
}

export default SingleMeal;
