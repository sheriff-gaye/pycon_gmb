"use client"

import { usePathname } from "next/navigation";
import BlogSection from "../components/blog";


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