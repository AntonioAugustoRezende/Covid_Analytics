import { useForm } from "react-hook-form";

import { Select } from "./Select";
import { Countries } from "../pages/Home";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStateData, formStateSchema } from "../schemas/formStateSchemas";
import { CaseHook } from "../hooks/cases";

interface InputsProps {
  title: string;
  titleButton: string;
  country?: Countries[];
}

export default function InputState({
  title,
  country,
  titleButton,
}: InputsProps) {
  const { register, handleSubmit } = useForm<FormStateData>({
    resolver: zodResolver(formStateSchema),
  });

  const { getOneState } = CaseHook();
  return (
    <form
      onSubmit={handleSubmit(getOneState)}
      className="flex flex-col w-full mb-10"
    >
      <Select
        label={title}
        register={register("data")}
        defaultValues="Escolha uma opção"
      >
        {country?.map((states, index) => {
          return (
            <option key={index} value={states.country}>
              {states.country}
            </option>
          );
        })}
      </Select>
      <button
        className="mt-5 sm:w-48 w-fit bg-blue-950 hover:bg-blue-700 p-3 rounded cursor-pointer text-white-900 font-bold text-base"
        type="submit"
      >
        {titleButton}
      </button>
    </form>
  );
}
