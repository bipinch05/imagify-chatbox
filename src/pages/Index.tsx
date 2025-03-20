
import React from "react";
import { ChatBox } from "../components/ChatBox";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[80vh] rounded-2xl overflow-hidden border shadow-lg backdrop-blur-sm glass-morphism animate-scale-in">
        <div className="w-full h-full flex flex-col">
          <div className="border-b p-4 flex items-center justify-between">
            <h1 className="text-xl font-medium">Imagify</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">AI powered</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
