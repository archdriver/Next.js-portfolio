"use client";

import BlogContent from "@/components/BlogContent";
import Hero from "@/components/Hero";
import { client } from "@/lib/createClient";
import { groq } from "next-sanity";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

export const revalidate = 30;
const query = groq`*[_type == 'post']{
...,
author->,
categories[]->,
publishedAt
} | order(publishedAt desc)[$start..$end]`;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage - 1;
      const fetchedPosts = await client.fetch(query, {
        start: startIndex,
        end: endIndex,
      });
      const fetchedTotalPosts = await client.fetch(
        groq`count(*[_type == 'post'])`,
      );
      setPosts(fetchedPosts);
      setTotalPosts(fetchedTotalPosts);
    };

    fetchData();
  }, [currentPage]); // currentPage が変更されるたびに fetchData を実行

  const hasMorePages =
    (currentPage - 1) * postsPerPage + posts.length < totalPosts;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <main>
        <Hero />
        <BlogContent posts={posts} />
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasMorePages={hasMorePages}
        />
      </main>
    </>
  );
}
