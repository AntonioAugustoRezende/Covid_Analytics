import { CasesProvider } from "./context/casesContext";
import { PageRoutes } from "./routes";

function App() {
  // Contexto envolta das rotas para as paginas terem acesso a ela
  return (
    <>
      <CasesProvider>
        <PageRoutes />
      </CasesProvider>
    </>
  );
}

export default App;
