import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
function App() {
  return (
    <>
      <Header />
      <div className="">
        <Outlet />
      </div>
    </>
  );
}

export default App;
