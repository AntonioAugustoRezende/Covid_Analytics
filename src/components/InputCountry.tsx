import { useForm } from "react-hook-form";

import { Select } from "./Select";
import { Countries, Cases } from "../pages/Home";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStateData, formStateSchema } from "../schemas/formStateSchemas";
import { CaseHook } from "../hooks/cases";

interface InputsProps {
  data?: Cases[];
  title: string;
  titleButton: string;
  country?: Countries[];
}

export default function InputCountry({
  data,
  title,
  country,
  titleButton,
}: InputsProps) {
  const { register, handleSubmit } = useForm<FormStateData>({
    resolver: zodResolver(formStateSchema),
  });

  const { getOneCountry } = CaseHook();
  return (
    <form
      onSubmit={handleSubmit(getOneCountry)}
      className="flex flex-col w-full mb-10"
    >
      <Select
        label={title}
        register={register("data")}
        defaultValues="Escolha uma opção"
      >
        {country
          ? country!.map((states, index) => {
              return (
                <option key={index} value={states.country}>
                  {states.country}
                </option>
              );
            })
          : data!.map((states, index) => {
              return (
                <option key={index} value={states.state}>
                  {states.state}
                </option>
              );
            })}
      </Select>
      <button
        className="mt-5 w-fit bg-blue-950 hover:bg-blue-700 p-3 rounded cursor-pointer text-white-900 font-bold text-base sm:text-sm"
        type="submit"
      >
        {titleButton}
      </button>
    </form>
  );
}
