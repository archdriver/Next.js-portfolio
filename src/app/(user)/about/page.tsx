import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
// import { FaXTwitter } from "react-icons/fa6";
// import { SiBluesky } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";

const About = () => {
  return (
    <Container className="mb-10">
      <div className="flex flex-col md:flex-row items-center mb-10">
        <Image
          src={"/wallpaper.png"}
          width={500}
          height={500}
          alt="main image"
          className="object-cover w-full"
        />
        <div className="w-full md:w-1/3 mt-5 md:mt-0 flex flex-col items-center gap-5 px-4">
          <Image
            src={"/profile.png"}
            width={200}
            height={200}
            alt="author image"
            className="w-32 h-32 rounded-full object-cover"
          />
          <p className="text-3xl text-[#5442ae] font-semibold">Tomoya Sagara</p>
          <div className="flex items-center gap-3">
            <Link
              href={"https://github.com/archdriver/Next.js-portfolio"}
              target="blank"
              rel="noopener"
              aria-label="Github Icon"
            >
              <FaGithub className="w-7 h-7 bg-white text-black text-xl flex items-center justify-center hover:bg-gray-300 duration-200" />
            </Link>
          </div>
          <p className="text-center tracking-wide text-sm">
            このポートフォリオを閲覧いただき、ありがとうございます。
          </p>
          <p className="text-center tracking-wide text-sm">
            このサイトはNext.js、Tailwind
            CSS、Sanityなどのツールを使って開発したシンプルなブログサイトです。
          </p>
          <p className="text-center tracking-wide text-sm">
            Thank you for viewing this portfolio.
          </p>

          <p className="text-center tracking-wide text-sm">
            This site is a simple blog created using Next.js, Tailwind CSS,
            Sanity, and other tools.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
