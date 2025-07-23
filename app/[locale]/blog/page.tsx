"use client"

import BlogSection from "@/app/[locale]/components/blog";
import { usePathname } from "next/navigation";


const Blog=()=>{
     const pathname = usePathname();
      const currentLocale = pathname.split("/")[1] || "en";
    return(
        <div>
            <BlogSection currentLocale={currentLocale} />
        </div>
        

    )
}

export default Blog;