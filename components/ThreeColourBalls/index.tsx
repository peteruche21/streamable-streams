import React from "react";

const TCB = () => {
  return (
    <>
      <div className="lg:flex hidden absolute bottom-0 left-[28%] w-[45rem] h-[45rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="lg:flex hidden absolute -bottom-10 right-0 w-[45rem] h-[45rem] bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-3000"></div>
      <div className="lg:flex hidden absolute -bottom-8 -left-8 w-[45rem] h-[45rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-6000"></div>
    </>
  );
};

export default TCB;
