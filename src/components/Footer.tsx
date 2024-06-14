import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <Container className="p-10 bg-black text-gray-100 flex items-center justify-end">
      <Logo title="Next.js Blog Portofolio" className="text-white" />
      <div className="ml-auto">
        <p className="text-sm text-gray-300">
          © 2024 Tomoya Sagara. All Rights Reserved.
        </p>
        <Link
                href={"/privacy"}>
          <p className="text-sm text-gray-300">Privacy Policy</p>
        </Link>
      </div>
    </Container>
  );
};

export default Footer;
