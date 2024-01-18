import React from "react";

const ProgressBar = ({ progress }: any) => {
  return (
    <div className="my-4 w-full rounded-full bg-gray-300 overflow-hidden">
      <div
        className="py-1 h-full bg-violet-600 text-white text-xs leading-none flex justify-center items-center transition-width duration-500"
        style={{ width: progress + "%" }}
      >
        {parseInt(progress)}{progress != 0 && ' %'}
      </div>
    </div>
  );
};

export default ProgressBar;
