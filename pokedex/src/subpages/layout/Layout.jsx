import { Header } from "../header/Header";

export const Layout = ({ children }) => {
  return (
    <div className="h-full min-h-screen overflow-x-hidden bg-bg-prim-color text-ft-prim-color transition-colors duration-300">
      <Header />
      <div className="flex flex-1 flex-col items-center gap-8 p-8">
        {children}
      </div>
    </div>
  );
};
