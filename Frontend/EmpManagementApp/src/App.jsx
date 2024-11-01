import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import getRoutes from "./Router/routes";
import Router from "./Router/Router";


function App() {
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    const routes = getRoutes();

    setAllRoutes([...allRoutes, routes])
  }, [])

  return <Router allRoutes={allRoutes}/>;
}

export default App;
