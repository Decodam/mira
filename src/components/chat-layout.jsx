'use client';

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useParams } from 'next/navigation';
import {
  IconLayoutSidebar,
  IconPlus,
  IconLayoutGrid,
  IconSearch,
  IconSend,
  IconPaperclip,
  IconX,
  IconMessagePlus,
  IconLoader2
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Squeeze as Hamburger } from 'hamburger-react';
import { MessageContext } from "@/context/message-provider";
import HeaderUser from "./content/header-user";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default function ChatLayout({ children }) {
  const [searchOn, setSearchOn] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [InputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(false);
  const {setLoading, loading, setMessages, messages} = useContext(MessageContext);


  const params = useParams();
  const activeChatId = params?.id;

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handlePaperclipClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleImageHover = (hover) => {
    setHoveredImage(hover);
  };

  const handleRemoveImage = () => {
    setUploadedFile(null);
  };




  const chatHistory = [
    { id: 1, name: 'Consultation about flu' },
    { id: 2, name: 'Project discussion' },
    { id: 3, name: 'Advice on diet' },
    { id: 4, name: 'Immediate help needed' },
    // Add more chat items as needed
  ];

  const filteredChats = chatHistory.filter(chat =>
    chat.name.toLowerCase().includes(searchField.toLowerCase())
  );

  

  const fileToGenerativePart = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve({
                inlineData: {
                    data: reader.result.split(',')[1],
                    mimeType: file.type
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
  

  const chatToGemini = async (prompt, messageHistory, file) => {

    const chat = model.startChat({
      history: messageHistory,
      generationConfig: {
          maxOutputTokens: 100,
      },
    });

    let result;
    
    if (file) {
      result = await model.generateContent([prompt, file]);
    } else {
      result = await chat.sendMessage(prompt);

    }


    const response = result.response.text();
  
    return { message: response };
  };
  
  useEffect(() => {
    const returnMessage = async() =>{
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          parts: [{ text: InputText }],
        },
      ]);

      const fileData = uploadedFile ? await fileToGenerativePart(uploadedFile) : null;
      const output = await chatToGemini(InputText, messages, fileData);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "model",
          parts: [{ text: output?.message }],
        },
      ]);


      setInputText('');
      setUploadedFile(null);
      setLoading(false)
    }

    if(loading){
      returnMessage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  





  return (
    <>
      <div className="chat-header fixed w-full top-0 left-0 z-20 h-14 flex">
        {/* Sidebar Segment */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? "w-auto" : "md:w-60"} flex gap-2 justify-between items-center px-4`}>
          <Button variant="outline" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <IconLayoutSidebar className="hidden md:block" /> {/* Collapse Sidebar Button */}
            <div className="md:hidden"><Hamburger size={20} toggled={!sidebarCollapsed} /></div>
          </Button>
          <Button variant="outline" size="icon">
            <IconMessagePlus />
          </Button>
        </div>

        {/* Content Segment */}
        <HeaderUser />
      </div>

      <div className="h-svh w-svw overflow-hidden flex">

        {/* Sidebar */}
        <div className={`chat-sidebar bg-background border-r border-border fixed z-10 h-svh md:static flex flex-col transition-all duration-300 ${sidebarCollapsed ? "-left-full md:w-0 md:overflow-x-hidden" : "left-0 w-svw md:w-60"}`}>
          <div className={`mt-14 p-2 flex-1 overflow-y-scroll hide-scrollbar scrollbar transition-all duration-300 ${sidebarCollapsed ? "opacity-0" : "opacity-100"}`}>
            <Button className="w-full mb-2 justify-start" variant="secondary" asChild>
              <Link href={"/"}>
                <IconLayoutGrid size={20} className="mr-2" /> Explore Models
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link href={"/"}>
                <IconPlus size={20} className="mr-2" /> New Consultation
              </Link>
            </Button>

            <div className="my-4">
              <div className="flex justify-between items-center mb-2 px-2 text-muted-foreground">
                <span className="text-xs">Consult History</span>
                <IconSearch cursor={"pointer"} size={14} onClick={() => setSearchOn(!searchOn)} />
              </div>

              {searchOn && (
                <input
                  type="text"
                  placeholder="Search consults..."
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-muted text-accent-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              )}
            </div>

            <ul className="space-y-1">
              {filteredChats.map(chat => (
                <li key={chat.id}>
                  <Link
                    href={`/c/${chat.id}`}
                    className={`block rounded-lg px-4 py-2 text-xs font-medium ${
                      Number(activeChatId) === chat.id
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {chat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Here */}
        <div className="chat-content flex-1 bg-card flex flex-col">
          <div id="content" className="mt-14 mb-28 md:mb-0 overflow-y-scroll py-2 flex-1 scrollbar">
            <div className="container">
              {children} 
            </div>
          </div>

          <div className="fixed bottom-0 left-0 -z-0 w-full md:static md:container">
            <form action={() => {setLoading(true)}} className="flex items-center p-2">
              <div className="inputbox flex items-center w-full p-2 rounded-lg bg-accent">
                <IconPaperclip cursor="pointer" className="ml-4 mr-2 text-muted-foreground" onClick={handlePaperclipClick} />
                {uploadedFile && (
                  <div
                    className="relative mr-4"
                    onMouseEnter={() => handleImageHover(true)}
                    onMouseLeave={() => handleImageHover(false)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded Image" width={50} height={50} className="rounded" />
                    {hoveredImage && (
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-background rounded-full border"
                        onClick={handleRemoveImage}
                      >
                        <IconX size={16} />
                      </button>
                    )}
                  </div>
                )}
                <input
                  type="text"
                  value={InputText}
                  disabled={loading}
                  onChange={(e) => {setInputText(e.target.value)}}
                  placeholder="Type your message..."
                  className="px-2 py-1 w-full rounded-lg bg-accent focus:outline-none placeholder:text-muted-foreground"
                />
                
                <Button
                  disabled={InputText === '' || loading}
                  type="submit"
                  className="ml-2"
                >
                  {loading ? (
                    <IconLoader2 className="animate-spin" />
                  ) : (
                    <IconSend />
                  )}
                </Button>

              </div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                disabled={loading}
                onChange={handleFileChange}
              />
            </form>
            <p style={{fontSize: 10}} className="text-xs text-center mb-1 text-muted-foreground px-4">
              Mira is still experimental and can make mistakes. Please do your own due diligence.
              Made by <Link className="font-medium hover:underline" href="https://github.com/Decodam" target="_blank">@Decodam</Link> as part of Project Neurvox.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
