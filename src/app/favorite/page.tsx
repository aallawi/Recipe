"use client";
import React, { useState, useEffect } from "react";
import { useQueries, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import OneMeal from "@/components/OneMeal";
import { FadeLoader } from "react-spinners";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strArea: string;
    strCategory: string;
    strTags?: string;
    strSource?: string;
    strYoutube?: string;
    [key: string]: any;
}

export default function Favorite() {
    const [savedMealsIds, setSavedMealsIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedMeals = localStorage.getItem("savedMeals");
        if (savedMeals) {
            setSavedMealsIds(JSON.parse(savedMeals));
        }
        setIsLoading(false);
    }, []);

    const getMeal = async (id: string): Promise<Meal> => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        return data?.meals?.[0];
    };

    const queries: UseQueryOptions<Meal, Error>[] = savedMealsIds.map((id) => ({
        queryKey: ["getMeal", id],
        queryFn: () => getMeal(id),
    }));

    const queryResults: UseQueryResult<Meal, Error>[] = useQueries({ queries });

    const removeMeal = (id: string) => {
        const savedMeals = localStorage.getItem("savedMeals");
        if (savedMeals) {
            const savedMealsArray: string[] = JSON.parse(savedMeals);
            const index = savedMealsArray.indexOf(id);
            if (index > -1) {
                savedMealsArray.splice(index, 1);
                localStorage.setItem("savedMeals", JSON.stringify(savedMealsArray));
                setSavedMealsIds(savedMealsArray);
            }
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] py-[40px]">
            <h1 className="text-[40px] text-secondary mb-[40px]">My Saved Meal List :</h1>
            {isLoading ? (
                <div className="flex justify-center pb-[50px]">
                    <FadeLoader
                        color="#247291"
                        height={20}
                        radius={2}
                        width={4}
                    />
                </div>
            ) : (
                <div className="flex flex-wrap items-center gap-x-[40px] gap-y-[60px] md:gap-y-[80px] pb-[50px]">
                    {queryResults.length > 0 && queryResults.some((result) => result.data) ? (
                        queryResults.map((item) => (
                            item.data && (
                                <div key={item.data?.idMeal}>
                                    <OneMeal meal={item.data} />
                                    <button onClick={() => removeMeal(item.data?.idMeal)} className="one_line text-[18px] mt-[5px] py-[10px] pl-[10px] leading-[35px] w-[250px] text-white bg-red-600 hover:bg-red-800 transition-all duration-300 ease-in-out cursor-pointer">
                                        Remove
                                    </button>
                                </div>
                            )
                        ))
                    ) : (
                        <div className="text-center text-[20px]">No saved meals found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
