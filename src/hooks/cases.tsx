import { useContext } from "react";
import { CasesContext } from "../context/casesContext";

// Hook criado para facilidar o acesso ao contexto
export const CaseHook = () => {
  const casesContext = useContext(CasesContext);
  return casesContext;
};
