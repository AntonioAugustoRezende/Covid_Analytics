import { CaseHook } from "../hooks/cases";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select } from "./Select";
import { FormModalData, formModalSchema } from "../schemas/formModalSchemas";
import { Input } from "./Inputs";
import InputDate from "./InputDate";

import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;

  title: ReactNode;
  attributes?: string;
  widthFull?: boolean;
}

export const Modal = ({
  toggleModal,
  blockClosing,
  title,
  attributes,
  widthFull = false,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { cases, handleSubmitModal } = CaseHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModalData>({
    resolver: zodResolver(formModalSchema),
  });

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        toggleModal();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return createPortal(
    <div className="fixed top-0 bg-black/50 w-screen h-screen flex justify-center items-center z-[4]">
      <div
        ref={blockClosing ? null : ref}
        className={`${attributes} ${
          !widthFull && "width-modal"
        } px-6 py-5 shadow-lg rounded-lg h-screen animate-modal duration-300`}
      >
        <div className="bg-gray-100/80 flex-col flex w-[430px] h-fit sm:py-11 py-7 px-7 rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">{title}</h2>
            <button onClick={toggleModal} className="btn-close-modal">
              X
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitModal)}
            className=" w-full sm:py-11 py-7 px-7"
          >
            <div>
              <Select
                label="Estado"
                register={register("country")}
                defaultValues="Escolha uma opção"
              >
                {cases &&
                  cases!.map((states, index) => {
                    return (
                      <option key={index} value={states.state}>
                        {states.state}
                      </option>
                    );
                  })}
              </Select>
              {errors.country?.message && (
                <p className="flex  text-red-500 relative bottom-[20px] font-extralight text-sm">
                  {errors.country?.message}
                </p>
              )}
            </div>
            <Input
              label="Casos"
              type="text"
              disabled={false}
              error={errors.cases?.message}
              placeholder="Digite o numero de casos"
              register={register("cases")}
            />
            <Input
              label="Casos confirmados"
              type="text"
              disabled={false}
              error={errors.confirmed?.message}
              placeholder="Digite o numero de casos confirmados"
              register={register("confirmed")}
            />
            <Input
              label="Casos fatais"
              type="text"
              disabled={false}
              error={errors.deaths?.message}
              placeholder="Digite o numero de casos fatais"
              register={register("deaths")}
            />
            <Input
              label="Recuperados"
              type="text"
              disabled={false}
              error={errors.recovered?.message}
              placeholder="Digite o numero de casos recuperados"
              register={register("recovered")}
            />
            <div className="flex justify-between w-full gap-8">
              <InputDate
                label="Dia"
                placeholder="00"
                register={register("day")}
                error={errors.day?.message}
              />
              <InputDate
                label="Mês"
                placeholder="00"
                register={register("month")}
                error={errors.month?.message}
              />
              <InputDate
                label="Ano"
                placeholder="0000"
                register={register("year")}
                error={errors.year?.message}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-950 hover:bg-blue-700 p-4 rounded cursor-pointer text-white font-bold text-base"
            >
              Cadastrar dado
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};
