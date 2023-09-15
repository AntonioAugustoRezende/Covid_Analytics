import { ReactNode, createContext, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { FormStateData } from "../schemas/formStateSchemas";

// Interfaces dos dados recebidos da API

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

// Interface de Erro que vem do Axios
export interface iError {
  message: string;
}

// Interface do contexto
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

// Interface padrão do contexto para receber childrens
interface CasesProviderProps {
  children: ReactNode;
}

// Metodo para criar o contexto
export const CasesContext = createContext<CasesProviderValues>(
  {} as CasesProviderValues
);

export const CasesProvider = ({ children }: CasesProviderProps) => {
  //  Estados para armazenar dados vindo da API para serem renderizados

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

  // Função responsável por fazer a requisição e pegar todos os Estados e seus dados
  const getAllCases = async (): Promise<void> => {
    try {
      const { data } = await api.get("");

      // Informação armazenadas em um estado
      setCases(data.data);
    } catch (error) {
      // Caso ocorra algum erro será pego pelo catch e renderizado no console
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
    }
  };

  // Função para pegar todos os países
  // Segue a mesma lógica da anterior
  const getAllCountries = async (): Promise<void> => {
    try {
      const { data } = await api.get("/countries");

      setCountries(data.data);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
    }
  };

  //Função para resgatar informações de um Estado
  const getOneCountry = async (data: FormStateData): Promise<void> => {
    // Isolei o valor do objeto que o usuário selecionou o Select
    const newData = Object.values(data)[0];

    // O dado do Select vem o nome do estado por extenso
    // Por isso, tive que filtrar a informação para apenas pegar as iniciais que deveriam ser
    // colocadas no endpoint da requisição
    const searchCountry = cases.filter((country) => country.state === newData);

    //  Requição com a uf que o usuário selecionou
    try {
      // Estado para ser a condição do Loading entrar na tela para os dados serem carregados
      setGlobalLoading(true);
      const { data } = await api.get(
        `/brazil/uf/${searchCountry[0].uf.toLocaleLowerCase()}`
      );

      // Estado que armazena as informaçoes de data e países são setados para valores iniciais
      // para não dar conflito
      setState(null);
      setDate([]);

      // Dado do Estado armazendo em um estado para ser renderizado na tela
      setCountry(data);
    } catch (error) {
      const currentError = error as AxiosError<iError>;
      console.error(currentError.message);
      setGlobalLoading(false);
    } finally {
      // Quando a requição termina/erro estado do loading é setado para o estado inicial
      // para o componente loading sair da tela
      setGlobalLoading(false);
    }
    setGlobalLoading(false);
  };

  // Função para fazer a requição de 1 país e armazenar em um estado
  // Logica parecida com a anterior
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

  // Função para fazer a requição por data e armazenar em um estado
  // Logica parecida com a anterior
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

  // Função para resgatar os dados preenchidos no Modal e armazenar em um estado
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
