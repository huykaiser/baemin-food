"use client";

import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';
import { foodAPI, categoryAPI } from '@/services/api';

const CATEGORY_MAPPING = {
    'chicken': 1,
    'burger': 2,
    'rice noodle': 3,
    'noodle': 4
};

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const category = searchParams?.get('category') || null;

    console.log("Current category from search params:", category);
    const [foods, setFoods] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchFoodsByCategory = async () => {
            if (!category) return;
            
            try {
                setLoading(true);
                setError(null);
                
                // Get category ID from the mapping
                const categoryId = CATEGORY_MAPPING[category as keyof typeof CATEGORY_MAPPING];

                if (!categoryId) {
                    console.warn(`No mapping found for category: ${category}`);
                    return;
                }
                
                const { data } = await foodAPI.getByCategory(categoryId);

                if (data) {
                    setFoods(data);
                } else {
                    setFoods([]);
                }
            } catch (err) {
                // console.error("Error fetching foods by category:", err);
                setError("Failed to load foods for this category");
                setFoods([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFoodsByCategory();
    }, [category]);
    
    // Fallback data for demonstration
    const fallbackItems = [{
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '2',
        name: 'Bún Bò Huế - Quận 1',
        address: '25 Lê Lợi, Quận 1, TP. HCM',
        img: '/food/bun-bo-hue.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '3',
        name: 'Burger King - Nguyễn Huệ',
        address: '76 Nguyễn Huệ, Quận 1, TP. HCM',
        img: '/food/burger-king.png',
        kind: 'Quán Ăn',
    }];

    // Format foods data for display
    const foodItems = loading 
        ? [] 
        : foods.length > 0 
            ? foods.map(food => ({
                id: food.food_id.toString(),
                name: food.name,
                address: food.address || 'NaN',
                img: food.image_url || '/food/ga1.jpg',
                kind: food.kind || 'Quán Ăn'
              })) 
            : fallbackItems;
    
    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>
            </div>
            <div className='my-3 flex flex-row'>
                {category ? (
                    <span className='font-medium text-lg'>{category}</span>
                ) : (
                    <span className='text-gray-500'>Tất cả các món</span>
                )}
                {loading && <span className="ml-2 text-sm text-blue-500">Loading...</span>}
                {error && <span className="ml-2 text-sm text-red-500">{error}</span>}
            </div>
            <ResultFood items={foodItems} />
        </>
    );
};

export default Page;