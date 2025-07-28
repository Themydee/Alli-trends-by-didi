import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#43c2d1" 
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
