"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";
import "../../../style/globals.css"

interface Category {
    strCategory: string;
}

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

function Meals() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    // Categories
    const getCategories = async () => {
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        console.log("getCategories");
        return data.categories;
    };

    const {
        data: categories,
        isLoading: categoryIsLoading,
        isError: categoryIsError,
        error: categoryError,
    } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    // Meals By Category
    const getMealsByCategory = async ({ queryKey }: { queryKey: [string, string] }) => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${queryKey[1]}`);
        return data?.meals || [];
    };

    const {
        data: mealsByChosen,
        isLoading: loadingByChosen,
        isError: errorByChosen,
    } = useQuery<Meal[]>({
        queryKey: ["mealsByCategory", selectedCategory],
        queryFn: getMealsByCategory,
        enabled: query === "",
    });

    // Meals By Query
    const getMealsByQuery = async ({ queryKey }: { queryKey: [string, string] }) => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queryKey[1]}`);
        return data?.meals || [];
    };

    const {
        data: mealsByQuery,
        isLoading: loadingByQuery,
        isError: errorByQuery,
    } = useQuery<Meal[]>({
        queryKey: ["mealsByQuery", query],
        queryFn: getMealsByQuery,
        enabled: query !== "",
    });


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchText) {
                setQuery(searchText);
                setSelectedCategory("");
            } else {
                setQuery("");
                if (categories) {
                    setSelectedCategory(categories[0].strCategory);
                }
            }
        }, 300);
        return () => {
            setQuery("");
            clearTimeout(timeout);
        };
    }, [searchText, categories]);

    useEffect(() => {
        if (categories) {
            setSelectedCategory(categories[0].strCategory);
        }
    }, [categories]);


    return (
        <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] pt-[40px]">
            <input
                value={searchText}
                className=" w-full max-w-[600px] mx-auto border-[2px] border-secondary rounded-md mb-[20px] h-[40px] outline-none px-[10px] text-[17px]"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 justify-center flex-wrap gap-[10px] pb-[50px]">
                {categories?.map((item, index) => (
                    <div key={index}
                        className={`${item.strCategory === selectedCategory ? "bg-primary text-secondary font-[700] border-b-[2px] border-r-[2px] border-secondary " : "bg-secondary text-white"} text-center rounded-md px-[20px] py-[10px] border-b-[2px] text-[18px] cursor-pointer`}
                        onClick={() => {
                            setSelectedCategory(item.strCategory);
                            setQuery("");
                            setSearchText("");
                        }} >
                        {item.strCategory}
                    </div>
                ))}
            </div>

            {categoryIsLoading || loadingByChosen && (
                <div className="flex justify-center pb-[50px]">
                    <FadeLoader
                        color="#247291"
                        height={20}
                        radius={2}
                        width={4}
                    />
                </div>
            )}

            <div className=" grid grid-cols-2 md:grid-cols-4 gap-[20px] pb-[50px]">
                {mealsByChosen?.map((meal) => (
                    <Link key={meal.idMeal} href={`/meals/${meal.idMeal}`} className=" p-[15px] bg-stone-200 rounded-md">
                        <Image src={meal.strMealThumb} height="380" width="380" className="bg-cover rounded-md" alt={meal.strMeal} />
                        <h2 className="pt-[20px] text-[16px] font-[600] one_line">{meal.strMeal}</h2>
                    </Link>
                ))}

                {mealsByQuery?.map((meal) => (
                    <Link key={meal.idMeal} href={`/meals/${meal.idMeal}`} className=" p-[15px] bg-stone-200 rounded-md">
                        <Image src={meal.strMealThumb} height="380" width="380" className="bg-cover rounded-md" alt={meal.strMeal} />
                        <h2 className="pt-[20px] text-[16px] font-[600] one_line">{meal.strMeal}</h2>
                    </Link>
                ))}
            </div>

            {mealsByChosen?.length === 0 && mealsByQuery?.length === 0 && (
                <p className="text-secondary text-[25px] text-center pb-[30px]">No meals found</p>
            )}

        </div>
    );
}

export default Meals;