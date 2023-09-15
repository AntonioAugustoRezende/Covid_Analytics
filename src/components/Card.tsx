import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface CardProps {
  state?: string;
  suspects?: number;
  deaths: number;
  cases?: number;
}
export default function Card({ state, suspects, deaths, cases }: CardProps) {
  return (
    <li className="bg-gray-200/90 p-3 flex flex-col  gap-3 rounded-md hover:bg-white/40">
      <h2 className="text-xl text-center font-extrabold text-blue-900">
        {state}
      </h2>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow key={Math.random()}>
              <TableCell className="text-blue-900">Suspeitos</TableCell>
              <TableCell className="text-white text-lg" align="right">
                {suspects ? suspects : "Não informado"}
              </TableCell>
            </TableRow>
            <TableRow key={Math.random()}>
              <TableCell className="text-white text-lg">Mortes</TableCell>
              <TableCell className="text-white text-lg" align="right">
                {deaths ? deaths : "Não informado"}
              </TableCell>
            </TableRow>
            <TableRow key={Math.random()}>
              <TableCell className="text-white text-lg">Casos</TableCell>
              <TableCell className="text-white text-lg" align="right">
                {cases ? cases : "Não informado"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </li>
  );
}
