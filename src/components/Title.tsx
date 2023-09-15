import logoOficial from "../assets/logoOficial.png";

export default function Title() {
  // Componente que também serve para limpas os filtros
  return (
    <header className="flex flex-col gap-4 items-center justify-center my-5">
      <img src={logoOficial} alt="Slogan" width={80} height={80} />
      <h1 className="font-extrabold text-3xl">Covid Analytics</h1>
    </header>
  );
}
