import { CaseHook } from "../hooks/cases";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;

  title: ReactNode;
  attributes?: string;
  widthFull?: boolean;
}

export const ResultCase = ({
  toggleModal,
  blockClosing,
  title,
  attributes,
  widthFull = false,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { newCase } = CaseHook();

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
        } bg-gray-200 px-6 py-5 shadow-lg rounded-lg animate-modal duration-300`}
      >
        <div className="flex-col flex ">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-black">{title}</h2>
            <button onClick={toggleModal} className="btn-close-modal">
              X
            </button>
          </div>
          <div>
            <div className="bg-gray-200/90 p-3 flex flex-col gap-3 rounded-md hover:bg-white/40">
              <h2 className="text-xl text-center font-extrabold text-blue-900">
                {newCase?.country}
              </h2>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow key={Math.random()}>
                      <TableCell className="text-blue-900">Casos</TableCell>
                      <TableCell className="text-white text-lg" align="right">
                        {newCase?.cases}
                      </TableCell>
                    </TableRow>
                    <TableRow key={Math.random()}>
                      <TableCell className="text-white text-lg">
                        Mortes
                      </TableCell>
                      <TableCell className="text-white text-lg" align="right">
                        {newCase?.deaths}
                      </TableCell>
                    </TableRow>
                    <TableRow key={Math.random()}>
                      <TableCell className="text-white text-lg">
                        Confirmados
                      </TableCell>
                      <TableCell className="text-white text-lg" align="right">
                        {newCase?.confirmed}
                      </TableCell>
                    </TableRow>
                    <TableRow key={Math.random()}>
                      <TableCell className="text-white text-lg">
                        Recuperados
                      </TableCell>
                      <TableCell className="text-white text-lg" align="right">
                        {newCase?.recovered}
                      </TableCell>
                    </TableRow>
                    <TableRow key={Math.random()}>
                      <TableCell className="text-white text-lg">Data</TableCell>
                      <TableCell className="text-white text-lg" align="right">
                        {`${newCase?.day}/${newCase?.month}/${newCase?.year}`}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
