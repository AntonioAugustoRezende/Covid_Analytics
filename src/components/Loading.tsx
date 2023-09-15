export const Loading = () => {
  return (
    <div className="fixed top-0 w-screen h-screen flex justify-center z-10 items-center left-0">
      <div className="flex gap-[10px]">
        <span className="inline-block w-[30px] h-[30px] rounded-full bg-blue-800 m-2 animate-bounce"></span>
        <span className="animation-delay-1 inline-block w-[30px] h-[30px] rounded-full bg-blue-800 m-2 animate-bounce"></span>
        <span className="animation-delay-2 inline-block w-[30px] h-[30px] rounded-full bg-blue-800 m-2 animate-bounce"></span>
      </div>
    </div>
  );
};
