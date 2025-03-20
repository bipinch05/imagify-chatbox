
import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-2 border-primary/30 rounded-full"></div>
        <div 
          className="absolute inset-0 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"
        ></div>
        <div className="absolute inset-1 border border-primary/10 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
