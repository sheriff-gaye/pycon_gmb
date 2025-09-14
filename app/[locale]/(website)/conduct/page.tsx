"use client"

import { usePathname } from "next/navigation";
import CodeOfConduct from "../components/code_of_conduct"


const Code=()=>{
      const pathname = usePathname();
      const currentLocale = pathname.split("/")[1] || "en";
    return(
        <div>
            <CodeOfConduct currentLocale={currentLocale}/>
        </div>
    )
}


export default Code