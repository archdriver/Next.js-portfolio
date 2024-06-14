// page.tsx
import { groq } from "next-sanity";
import { Post } from "../../../../../types";
import { client, urlFor } from "@/lib/createClient";
import Container from "@/components/Container";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/RichText";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
// import { SiBluesky } from "react-icons/si";
import Head from "next/head";
import banner from "@/images/bannerImg.png";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`;

  const post: Post = await client.fetch(query, { slug: params.slug });

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: urlFor(post.mainImage).url(),
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [urlFor(post.mainImage).url()],
      card: "summary_large_image",
    },
  };
};

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`;

  const post: Post = await client.fetch(query, { slug });

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.description} />
        <meta name="twitter:image" content={urlFor(post.mainImage).url()} />
      </Head>
      <Container className="mb-10">
        <div className="flex items-center mb-10">
          <div className="w-full md:w-2/3">
            {post?.mainImage ? (
              <Image
                src={urlFor(post.mainImage).url()}
                width={500}
                height={500}
                alt={`Main image for ${post?.title}`}
                priority={true}
                className="object-cover w-full"
              />
            ) : (
              <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                No image available
              </div>
            )}
          </div>
          <div className="w-1/3 hidden md:inline-flex flex-col items-center gap-5 px-4">
            {post?.author?.image && (
              <Image
                src={urlFor(post.author.image).url()}
                width={200}
                height={200}
                alt="author image"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
            <p className="text-3xl text-[#5442ae] font-semibold">
              {post?.author?.name || ""}
            </p>
            <p className="text-center tracking-wide text-sm">
              {post?.author?.description || ""}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={"https://github.com/VisionDriver/Next.js-portfolio"}
                target="blank"
                rel="noopener"
                aria-label="Github Icon"
              >
                <FaGithub className="w-7 h-7 bg-white text-black text-xl flex items-center justify-center hover:bg-gray-300 duration-200" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto block max-w-xs"></div>
        <div className="px-3">
          <PortableText value={post?.body} components={RichText} />
        </div>
      </Container>
    </>
  );
};

export default SlugPage;
