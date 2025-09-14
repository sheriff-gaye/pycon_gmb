import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
    
        <Image src="/images/logo.png" alt="image" height={90} width={90}/>
       
    </Link>
  );
};

export default Logo;
