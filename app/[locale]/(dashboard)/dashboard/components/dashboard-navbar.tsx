import { HeroProps } from "@/app/[locale]/(website)/components/interfaces/interface"
import MobileSideBar from "./mobile-sidebar"
import NavBarRoutes from "./navbar-routes"

const NavBar = ({currentLocale}: HeroProps) => {
  return (
    <div className='p-4  h-full flex  items-center shadow-sm  dark:border-b'>
        <MobileSideBar/>
        <NavBarRoutes/>

    </div>
  )
}

export default NavBar