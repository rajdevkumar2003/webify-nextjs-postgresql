import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row justify-between p-4 bg-[#6495ED]">
      <Image 
        src="/logo.svg"
        width={40}
        height={40}
        alt="logo"
      />
      <div className="flex flex-row justify-between gap-6">
        <Button variant="ghost" className="bg-blue-300">Sign In</Button>
        <Button className=" bg-blue-800">Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
