import ChatLayout from "@/components/chat-layout";


export default function ChatIDPage({}) {
  const demoFunction = async () => {
    'use server';
    return {message: 'message is good'};
  };

  return (
    <ChatLayout formAction={demoFunction}> 
      ChatIDPage
    </ChatLayout>
  );
}