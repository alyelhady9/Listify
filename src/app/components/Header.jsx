"use client"

import { BsGear } from "react-icons/bs";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null;
    
    return ( 
    
    <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800">

        <p className="text-xl text-indigo-600 font-bold  select-none"><Link href={"/"}> Listify</Link></p>
          
        
       
        <div className="w-1/12">
             <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-2xl w-8 h-8 flex justify-center items-center text-indigo-600  bg-gray-200 dark:bg-gray-700 rounded "
    >
        {
            mounted && theme === "dark" ? <MdDarkMode   /> : <MdOutlineDarkMode  />
        }
   


    </button>
    
    </div>
    </div>
    
);
}
 
export default Header;