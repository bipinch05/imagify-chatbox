
import React, { useState, useRef, useEffect } from "react";
import { generateImage } from "../services/openai";
import { MessageItem, Message } from "./MessageItem";
import { toast } from "sonner";
import { ArrowRight, Image } from "lucide-react";

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isGenerating) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Generating your image...",
      isUser: false,
      loading: true,
    };
    
    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInput("");
    setIsGenerating(true);
    
    try {
      const response = await generateImage(input);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessage.id 
            ? {
                ...msg,
                content: "Here's your generated image:",
                loading: false,
                imageUrl: response.url,
              }
            : msg
        )
      );
      
      toast.success("Image generated successfully!");
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessage.id 
            ? {
                ...msg,
                content: "Failed to generate image. Please try again.",
                loading: false,
              }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const showExampleImage = () => {
    const examplePrompt = "A surreal landscape with floating islands and waterfalls";
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: `Example: "${examplePrompt}"`,
      isUser: false,
      imageUrl: "https://source.unsplash.com/random/800x600/?fantasy,landscape",
    };
    
    setMessages(prev => [...prev, aiMessage]);
    toast.info("Example image displayed");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-3 max-w-md">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 animate-fade-in">
                AI Image Generator
              </div>
              <h2 className="text-2xl font-medium text-foreground animate-fade-in delay-100">
                Your Image Creation Assistant
              </h2>
              <p className="text-muted-foreground animate-fade-in delay-200">
                Describe the image you want to create, and I'll generate it for you.
                Try something like "a serene lake at sunset with mountains in the background"
              </p>
              <button
                onClick={showExampleImage}
                className="mt-4 flex items-center justify-center mx-auto space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors animate-fade-in delay-300"
              >
                <Image size={16} />
                <span>Show Example</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe the image you want to create..."
            className="flex-1 px-4 py-3 text-sm rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={isGenerating || !input.trim()}
            className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Send message"
          >
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
