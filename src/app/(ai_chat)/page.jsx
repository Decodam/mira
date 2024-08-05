import ChatLayout from "@/components/chat-layout";
import DescriptionCard from "@/components/description-card";
import Image from "next/image";
import { IconClipboard, IconHeartbeat, IconStethoscope, IconAmbulance } from "@tabler/icons-react"; // Import icons

export default function HomePage() {
  const demoFunction = async () => {
    'use server';
    return {message: 'message is good'};
  };

  const descriptions = [
    { icon: IconClipboard, description: "Can you help with my prescription? The handwriting isn’t clear." },
    { icon: IconHeartbeat, description: "I think my friend is having a heart attack! What should I do?" },
    { icon: IconStethoscope, description: "I am having a headache and a mild fever of 101. Is it serious enough to go to hospital?" },
    { icon: IconAmbulance, description: "There is a car crash and the driver is bleeding profusely! I need help!" },
  ];

  return (
    <ChatLayout formAction={demoFunction}>
      <div className="mt-10 md:mt-20">
        <Image src={"/icon.svg"} alt="mira.ai" height={60} width={60} className="mx-auto"/>
        <p className="mx-auto max-w-lg text-center mt-4 text-sm font-medium text-muted-foreground">
          Mira is an AI-based doctor LLM capable of diagnosing any disease and providing necessary treatment plans. It can guide you with your prescriptions, medical reports, scans, and much more.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        {descriptions.map((item, index) => (
          <DescriptionCard 
            key={index} 
            icon={item.icon} 
            description={item.description} 
          />
        ))}
      </div>
    </ChatLayout>
  );
}
