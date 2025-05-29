"use client";

import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';
import { foodAPI, categoryAPI } from '@/services/api';

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const category = searchParams?.get('category') || null;
    
    const items=[{
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
]
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
            </div>
            <ResultFood items={items} />
        </>
    )
}
export default Page;