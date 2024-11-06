import { useEffect, useState } from "react";
import getRoutes from "./Router/routes";
import Router from "./Router/Router";


function App() {
  const [allRoutes, setAllRoutes] = useState(getRoutes());

  useEffect(() => {
    // const routes = getRoutes();
    setAllRoutes(getRoutes())
  }, [])

  return <Router allRoutes={allRoutes}/>;
}

export default App;
