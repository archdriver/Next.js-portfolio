import Image from "next/image";
import Link from "next/link";
import banner from "@/images/bannerImg.png";

const Hero = () => {
  return (
    <>
        <Image
          src={banner}
          alt="banner image"
          className="w-full max-h-[76.4vh] object-contain"
        />
    </>
  );
};

export default Hero;
