import MobileSideBar from "./mobile-sidebar"
import NavBarRoutes from "./navbar-routes"

const NavBar = () => {
  return (
    <div className='p-4  h-full flex  items-center shadow-sm  dark:border-b bg-background'>
        <MobileSideBar/>
        <NavBarRoutes/>

    </div>
  )
}

export default NavBar