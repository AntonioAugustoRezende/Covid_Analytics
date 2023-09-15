import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface iSelectProps {
  label: string;
  disabled?: boolean;
  children: ReactNode;
  handleSelect?: (name: string) => void | Promise<void>;
  register?: UseFormRegisterReturn;
  defaultValues?: string;
}

export const Select = ({
  label,
  children,
  handleSelect,
  register,
  defaultValues,
}: iSelectProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-base font-bold text-grey-200 mb-4" htmlFor={label}>
        {label}
      </label>

      <select
        id={label}
        {...register}
        className="w-full h-12 text-gray-900 px-4 rounded mb-6"
        onChange={(event) => handleSelect && handleSelect(event.target.value)}
        defaultValue={defaultValues}
      >
        <option value="" hidden={true}>
          {defaultValues}
        </option>
        {children}
      </select>
    </div>
  );
};
