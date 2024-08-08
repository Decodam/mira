import ChatLayout from "@/components/chat-layout";


export default function LoadingChatID({}) {
  return (
    <ChatLayout>
      <div className="w-full">
        <div className="max-w-lg w-full mt-4">
          <div className="relative w-full h-4 rounded-md bg-background mb-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
          </div>
          <div className="relative w-full h-4 rounded-md bg-background mb-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
          </div>
          <div className="relative w-2/3 h-4 rounded-md bg-background mb-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
          </div>
        </div>

        <div className="max-w-lg w-full mt-4 ml-auto">
          <div className="relative w-full h-4 ml-auto rounded-md bg-background mb-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
          </div>
          <div className="relative w-full h-4 ml-auto rounded-md bg-background mb-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
          </div>
          <div className="relative w-2/3 h-4 ml-auto rounded-md bg-background mb-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}