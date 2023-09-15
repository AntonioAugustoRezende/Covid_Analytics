import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

// Função de rotas cria com react-router-dom
export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
