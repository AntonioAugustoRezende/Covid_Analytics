import { useContext } from "react";
import { CasesContext } from "../context/casesContext";

export const CaseHook = () => {
  const casesContext = useContext(CasesContext);
  return casesContext;
};
