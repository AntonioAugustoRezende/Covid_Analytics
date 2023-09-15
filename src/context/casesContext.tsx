import { ReactNode, createContext, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { FormStateData } from "../schemas/formStateSchemas";

interface DataDate {
  day: string;
  month: string;
  year: string;
}

export interface Cases {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  broadcast: boolean;
  comments: string;
  datetime: string;
}

export interface Countries {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string;
  id?: number;
}

export interface NewCase {
  country: string;
  cases: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  day: string;
  month: string;
  year: string;
}
export interface iError {
  message: string;
}

interface CasesProviderValues {
  handleSubmitDate(data: DataDate): void;
  date: [] | Cases[];
  getAllCases: () => Promise<void>;
  cases: [] | Cases[];
  getAllCountries: () => Promise<void>;
  countries: [] | Countries[];
  getOneCountry: (data: FormStateData) => Promise<void>;
  country: Cases | null;
  globalLoading: boolean;
  setCountry: React.Dispatch<React.SetStateAction<Cases | null>>;
  getOneState: (data: FormStateData) => Promise<void>;
  state: Countries | null;
  setState: React.Dispatch<React.SetStateAction<Countries | null>>;
  setDate: React.Dispatch<React.SetStateAction<[] | Cases[]>>;
  handleSubmitModal: (data: NewCase) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  newCase: NewCase | null;
  setIsOpenResult: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenResult: boolean;
}

interface CasesProviderProps {
  children: ReactNode;
}

export const CasesContext = createContext<CasesProviderValues>(
  {} as CasesProviderValues
);

export const CasesProvider = ({ children }: CasesProviderProps) => {
  const [date, setDate] = useState<Cases[] | []>([] as Cases[]);
  const [cases, setCases] = useState<Cases[] | []>([] as Cases[]);
  const [countries, setCountries] = useState<Countries[] | []>(
    [] as Countries[]
  );
  const [country, setCountry] = useState<Cases | null>(null);
  const [state, setState] = useState<Countries | null>(null);
  const [newCase, setNewCase] = useState<NewCase | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(false);

  const getAllCases = async (): Promise<void> => {
    try {
      const { data } = await api.get("");

      setCases(data.data);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
    }
  };
  const getAllCountries = async (): Promise<void> => {
    try {
      const { data } = await api.get("/countries");

      setCountries(data.data);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
    }
  };
  const getOneCountry = async (data: FormStateData): Promise<void> => {
    const newData = Object.values(data)[0];

    const searchCountry = cases.filter((country) => country.state === newData);

    try {
      setGlobalLoading(true);
      const { data } = await api.get(
        `/brazil/uf/${searchCountry[0].uf.toLocaleLowerCase()}`
      );
      setState(null);
      setDate([]);

      setCountry(data);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
      setGlobalLoading(false);
    } finally {
      setGlobalLoading(false);
    }
    setGlobalLoading(false);
  };
  const getOneState = async (data: FormStateData): Promise<void> => {
    const newData = Object.values(data)[0];

    try {
      setGlobalLoading(true);
      const { data } = await api.get(`/${newData.toLocaleLowerCase()}`);

      setState(data.data);
      setCountry(null);
      setDate([]);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
      setGlobalLoading(false);
    } finally {
      setGlobalLoading(false);
    }
    setGlobalLoading(false);
  };

  const handleSubmitDate = async (data: DataDate): Promise<void> => {
    const newDate = data.year + data.month + data.day;

    try {
      setGlobalLoading(true);
      const { data } = await api.get(`/brazil/${newDate}`);
      console.log(data.data);

      setDate(data.data);

      setState(null);
      setCountry(null);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
      setGlobalLoading(false);
    } finally {
      setGlobalLoading(false);
    }
    setGlobalLoading(false);
  };
  const handleSubmitModal = (data: NewCase): void => {
    setNewCase(data);
    setIsOpenResult((prevState) => !prevState);
    setIsOpen((prevState) => !prevState);
  };
  return (
    <CasesContext.Provider
      value={{
        handleSubmitDate,
        date,
        getAllCases,
        cases,
        getAllCountries,
        countries,
        getOneCountry,
        country,
        globalLoading,
        setCountry,
        getOneState,
        state,
        setState,
        setDate,
        handleSubmitModal,
        setIsOpen,
        isOpen,
        newCase,
        setIsOpenResult,
        isOpenResult,
      }}
    >
      {children}
    </CasesContext.Provider>
  );
};
