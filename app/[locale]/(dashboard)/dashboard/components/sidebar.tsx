// sidebar.tsx
"use client";

import Logo from "./logo";
import SideBarRoutes from "./sidebar-routes";

const SideBar = () => {
  
 
//   if (isLoading) {
//     return (
//       <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//         <div className="p-6">
//           <Logo />
//         </div>
//         <div className="flex flex-col w-full">
//           <div className="flex items-center gap-x-2 p-4">
//             <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
//             <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
//           </div>
//           <div className="flex items-center gap-x-2 p-4">
//             <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
//             <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
//           </div>
//           <div className="flex items-center gap-x-2 p-4">
//             <Skeleton className="h-6 w-6 bg-slate-200 rounded-md" />
//             <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-md" />
//           </div>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
