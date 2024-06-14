"use client";

import CategoryBlogContent from "./CategoryBlogContent";
import Hero from "@/components/Hero";
import { client } from "@/lib/createClient";
import { groq } from "next-sanity";
import { useState, useEffect } from "react";
import FrontScrollButton from "@/components/FrontScrollButton";
const { useParams } = require('next/navigation');

export const revalidate = 30;

const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->,
  publishedAt
} | order(publishedAt desc)`;

export default function Home() {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await client.fetch(query);
      setPosts(fetchedPosts);
    };

    fetchData();
  }, []);

  return (
    <main>
      <Hero />
      {params.slug && (
        <CategoryBlogContent posts={posts} category={params.slug} />
      )}
            <FrontScrollButton/>
    </main>
  );
}
