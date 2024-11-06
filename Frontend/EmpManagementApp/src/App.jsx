import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import getRoutes from "./Router/routes";
import Router from "./Router/Router";


function App() {
  const [allRoutes, setAllRoutes] = useState([...getRoutes()]);

  useEffect(() => {
    // const routes = getRoutes();

    setAllRoutes([...allRoutes, ...getRoutes()])
  }, [])

  return <Router allRoutes={allRoutes}/>;
}

export default App;
