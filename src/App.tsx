import { CasesProvider } from "./context/casesContext";
import { PageRoutes } from "./routes";

function App() {
  return (
    <>
      <CasesProvider>
        <PageRoutes />
      </CasesProvider>
    </>
  );
}

export default App;
