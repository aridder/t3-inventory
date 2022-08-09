import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Hello! Welcome to this inventory tracker app
        </h1>
      </main>
    </>
  );
};

export default Home;
