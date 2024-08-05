import ChatLayout from "@/components/chat-layout";


export default function ChatIDPage({}) {
  const demoFunction = async() => {
    'use server'
    console.log("done")
  }

  return (
    <ChatLayout formAction={demoFunction}> 
      ChatIDPage
    </ChatLayout>
  );
}