
import React from "react";
import { Spinner } from "./Spinner";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  imageUrl?: string;
  loading?: boolean;
}

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  return (
    <div 
      className={`
        chat-message w-full flex flex-col 
        ${message.isUser ? 'items-end' : 'items-start'} 
        mb-6
      `}
    >
      <div 
        className={`
          px-5 py-3 rounded-2xl max-w-[85%] 
          ${message.isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-sm' 
            : 'bg-secondary text-secondary-foreground rounded-tl-sm'
          }
        `}
      >
        <p className="text-sm md:text-base">{message.content}</p>
      </div>
      
      {message.loading && (
        <div className="mt-3 w-full max-w-[85%]">
          <Spinner />
        </div>
      )}
      
      {message.imageUrl && (
        <div className="mt-3 w-full max-w-[85%] overflow-hidden rounded-lg">
          {!imageLoaded && (
            <div className="w-full h-60 md:h-80 image-shimmer" />
          )}
          <img
            src={message.imageUrl}
            alt="Generated image"
            className={`w-full object-cover rounded-lg transition-opacity duration-300 shadow-md ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}
    </div>
  );
};
