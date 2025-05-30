"use client";

import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { categoryAPI, foodAPI } from "@/services/api";

interface Category {
    name: string;
    imageSrc: string;
    description: string;
}

interface Food {
    food_id: number;
    name: string;
    address?: string;
    image_url?: string;
    category_id?: number;
    kind?: string;
    price?: number;
    description?: string;
}

export default function Home() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [foodsLoading, setFoodsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [foodsError, setFoodsError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data } = await categoryAPI.getAll();

                const formattedCategories = data.map((category: any) => ({
                    name: category.name,
                    imageSrc: category.image_url || `/images/${category.name}.png`,
                    description: category.description || "Thức ăn nhanh"
                }));
                
                setCategories(formattedCategories);
                setError(null);
            } catch (err) {
                setError("Failed to load categories. Please try again later.");
                // Use hardcoded data as fallback in case of API failure
                setCategories([
                    { name: "Chicken", imageSrc: "/images/Ga.png", description: "Thức ăn nhanh" },
                    { name: "Burger", imageSrc: "/images/burger.jpg", description: "Thức ăn nhanh" },
                    { name: "Rice Noodle", imageSrc: "/images/noddle.png", description: "Thức ăn nhanh" },
                    { name: "Noodle", imageSrc: "/images/noddle.png", description: "Thức ăn nhanh" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCategories();
    }, []);
    
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setFoodsLoading(true);
                const { data } = await foodAPI.getAll();
                
                if (data && data.data) {
                    setFoods(data.data);
                    setFoodsError(null);
                } else {
                    throw new Error("Invalid data format received from API");
                }
            } catch (err) {
                // console.error("Error fetching foods:", err);
                setFoodsError("Failed to load foods. Please try again later.");
            } finally {
                setFoodsLoading(false);
            }
        };
        
        fetchFoods();
    }, []);
    
    const handleCategoryClick = (categoryName: string) => {
        // Navigate to category page with the category name as a query parameter
        router.push(`/sreach?category=${encodeURIComponent(categoryName)}`);
    };

    const banneritems = [
        {
            id: '1',
            name: 'anh 1',
            url: '/images/map1.png',
        },
        {
            id: '2',
            name: 'anh 2',
            url: '/images/map2.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map3.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map4.png',
        }
    ]
    
    // Create the TodayFood object with the fetched foods data
    const TodayFood = {
        title: 'Hôm Nay ăn gì',
        items: foodsLoading 
            ? [] 
            : foods.map(food => ({
                id: food.food_id.toString(),
                name: food.name,
                address: food.address || 'NaN',
                img: food.image_url || '/food/ga1.jpg',
                kind: food.kind || 'Quan An'
            }))
    }

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
                    <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
                        <span>Menu</span>
                        {loading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 py-2 px-3">{error}</div>
                        ) : (
                            categories.map((category) => (
                                <div 
                                    key={category.name} 
                                    className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <div className="flex flex-row items-center gap-1">
                                        <Image src={category.imageSrc} width={30} height={30} alt={category.description} />
                                        <span>{category.name}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banneritems} ></ScrollBar>
                    {foodsLoading ? (
                        <div className="bg-white rounded-2xl w-full min-h-[300px] flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : foodsError ? (
                        <div className="bg-white rounded-2xl w-full min-h-[300px] flex items-center justify-center text-red-500 p-4">
                            {foodsError}
                        </div>
                    ) : (
                        <ScrollFood items={TodayFood}></ScrollFood>
                    )}
                </div>
            </div>
        </>
    )
}