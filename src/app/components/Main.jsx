"use client"

import Weekly from "./WeeklyTasks";
import Todo from "./Daily";
import Todos from "./test";


const Main = () => {

    return ( 
    
    <div className=" w-full min-h-[calc(100vh-4rem)] pb-6  flex justify-center dark:bg-gray-900 ">
        <div className="w-10/12 mt-16 flex  justify-between max-lg:flex-col max-lg:w-11/12 ">

           
            <Todo />
            <div className="w-[0.15rem]  max-lg:w-full max-lg:h-1 max-lg:my-10 bg-indigo-600"></div>
            <Weekly/>
            
        </div>
    </div> );
}
 
export default Main;
