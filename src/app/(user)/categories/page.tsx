"use client"

import { client } from "@/lib/createClient";
import { groq } from "next-sanity";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { Category } from "../../../../types"
import Link from "next/link";

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesQuery = groq`*[_type == "category"] | order(title asc)`;
            const fetchedCategories = await client.fetch(categoriesQuery);
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    return (
        <main>
            <Hero />
            <div className="flex justify-center my-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Categories</h2>
                    <ul className="flex flex-wrap justify-center">
                        {categories.map((category) => (
                            <li
                                key={category._id}
                                className="text-lg px-4 py-2 rounded-full bg-gray-200 mx-2 my-1"
                            >
                                <Link
                                href={`/categories/${category.title}`}>
                                {category.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default CategoryList;
