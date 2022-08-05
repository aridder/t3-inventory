import { NextPage } from "next";

const Items: NextPage = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Items
        </h1>
        <p className="text-2xl text-gray-700">This stack uses:</p>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3"></div>
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {/* {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>} */}
        </div>
      </main>
    </>
  );
};

export default Items;
