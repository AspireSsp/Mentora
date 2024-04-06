import React from "react";

export const Home = () => {
  return (
    <div className="">
      <div
  className="relative bg-cover bg-bottom min-h-screen flex items-center justify-center overflow-visible"
  style={{ backgroundImage: "url(https://kit.nirmanavisual.com/pintar/wp-content/uploads/sites/48/2023/10/Background-Hero-1.png)" }}
>
      <div className="pt-24 mp-24 mp-48 mp-48 inset-0 flex flex-col items-center justify-between h-screen">
        <div className="flex flex-row w-full justify-between">
        <div className="w-full">
          <img
            src="https://kit.nirmanavisual.com/pintar/wp-content/uploads/sites/48/2023/10/Hero-Image-2.png"
            alt="Imge 1"
            className="w-3/5 rounded-2xl"
          />
        </div> 
       < div className="w-full text-white text-center">
          <h1 className="w-full text-6xl font-bold mb-4">WE PROVIDE FUN E-COURSE
            </h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Call to Action
          </button>
        </div>
        <div className="w-full flex justify-center">
          <img
            src="https://kit.nirmanavisual.com/pintar/wp-content/uploads/sites/48/2023/10/Hero-Image-3.png"
            alt="Iage 2"
            className="w-30 rounded-full"
          />
        </div>
        </div>
        <div className="flex justify-between flex-row w-full items-start ">
        <div className="w-full h-auto">
          <img
            src="https://kit.nirmanavisual.com/pintar/wp-content/uploads/sites/48/2023/10/Hero-Images-1.png"
            alt="Imge 3"
            className="w-full mb-96"
          />
        </div>
        <div className="w-full mt-24 ml-48">
          <img
            src="https://kit.nirmanavisual.com/pintar/wp-content/uploads/sites/48/2023/10/Video-Hero.png"
            alt="Imge 4"
            className="w-150 h-150 rounded-2xl"
          />
        </div>
        </div>
        
      </div>
    </div>
    <div className="h-screen">

    </div>
    </div>
  );
};
