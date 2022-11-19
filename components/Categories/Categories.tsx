import React from "react";

const Personalize = () => {
  return (
    <div className="card max-w-96 bg-base-100 my-10 bg-opacity-50">
      <h2 className="card-title text-base">Popular Categories</h2>
      <div className="card-body flex-row content-center justify-start flex-wrap gap-2 lg:gap-8 px-0 pl-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => {
          return (
            <div key={el}>
              <label className="float-left">
                <input
                  type="checkbox"
                  value={1}
                  className="peer absolute hidden text-white"
                />
                <span className="text-center py-2 px-3 block peer-checked:bg-blue-500 peer-checked:text-white rounded-3xl dark:bg-slate-700 bg-slate-200">
                  {
                    [
                      "action",
                      "sci-fi",
                      "adventure",
                      "hiking",
                      "maths",
                      "nft",
                      "ethereum",
                      "web3",
                    ][Math.floor(Math.random() * 8)]
                  }
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Personalize;
