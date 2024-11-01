import MainLayout from "../../layout/MainLayout"
import employeeRoutes from "./employeeRoutes"
import managerRoutes from './managerRoute';



const getRoutes = () => {
  const allRoutes = [
    ...employeeRoutes,
    ...managerRoutes
  ]

  return {
    path: '/',
    element: <MainLayout/>,
    children: allRoutes
  }
}

export default getRoutes