import { useEffect } from "react";
import { Board, Navbar } from "./components";
import { useAppSelector } from "./store";
import Aside from "./components/Aside";

function App() {
  const theme = useAppSelector((state) => state.theme);
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar />
      <main>
        <Aside />
        <Board />
      </main>
    </>
  );
}

export default App;
