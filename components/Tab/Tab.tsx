import React from "react";

const Tab = () => {
  return (
    <div className="tabs md:gap-5 w-full flex justify-center my-6">
      <a className="tab tab-bordered tab-active">all</a>
      <a className="tab tab-bordered">for you</a>
      <a className="tab tab-bordered">today</a>
      <a className="tab tab-bordered">free</a>
      <a className="tab tab-bordered">popular</a>
    </div>
  );
};

export default Tab;
