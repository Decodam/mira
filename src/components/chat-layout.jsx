'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconSettings,
  IconCoin,
  IconLogout,
  IconQuestionMark,
  IconLayoutSidebar,
  IconPlus,
  IconLayoutGrid,
  IconSearch,
  IconSend,
  IconPaperclip,
  IconX,
  IconMessagePlus
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { ToggleTheme } from "./ui/toggle-theme";
import { Squeeze as Hamburger } from 'hamburger-react';
import { MessageContext } from "@/context/message-provider";

export default function ChatLayout({ children, formAction }) {
  const [searchOn, setSearchOn] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [InputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(false);
  const {setLoading, loading, setMessages} = useContext(MessageContext);


  const params = useParams();
  const activeChatId = params?.id;

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

  const formSubmitAction = async() => {
    const error = await formAction(InputText);

    alert(error?.message)

    setInputText(''); setUploadedFile(null);
  };

  return (
    <>
      <div className="chat-header bg-muted fixed w-full top-0 left-0 z-20 h-14 flex">
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
        <div className="flex-1 flex justify-between items-center px-5 md:px-8">
          <div>
            <Link href={"/"}>
              <Image src={"/mira.svg"} height={40} alt="mira.ai" width={0} className="w-auto dark:hidden" />
              <Image src={"/mira-dark.svg"} height={40} alt="mira.ai" width={0} className="w-auto dark:block hidden" />
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="hidden md:flex items-center justify-center">
              <ToggleTheme />
              <Button variant="outline" size="icon" className="ml-2 mr-5">
                <IconQuestionMark />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5 mt-2 w-40">
                <DropdownMenuItem className="cursor-pointer"><IconSettings size={18} className="mr-2" /> Settings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"><IconCoin size={18} className="mr-2" /> Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive"><IconLogout size={18} className="mr-2" /> Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="h-svh w-svw overflow-hidden flex">

        {/* Sidebar */}
        <div className={`chat-sidebar bg-background fixed z-10 h-svh md:static flex flex-col transition-all duration-300 ${sidebarCollapsed ? "-left-full md:w-0 md:overflow-x-hidden" : "left-0 w-svw md:w-60"}`}>
          <div className={`mt-14 p-2 flex-1 overflow-y-scroll scrollbar transition-all duration-300 ${sidebarCollapsed ? "opacity-0" : "opacity-100"}`}>
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
                  className="w-full p-2 text-xs rounded bg-accent text-accent-foreground placeholder:text-muted-foreground focus:outline-none"
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
        <div className="chat-content flex-1 bg-muted flex flex-col">
          <div id="content" className="mt-14 pb-28 md:py-5 overflow-y-scroll py-2 flex-1 scrollbar">
            <div className="container">
              {children} 
            </div>
          </div>

          {formAction && (
            <div className="fixed bottom-0 left-0 -z-0 bg-muted w-full md:static md:container">
              <form action={formSubmitAction} className="flex items-center p-2">
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
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
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
                  onChange={handleFileChange}
                />
              </form>
              <p style={{fontSize: 10}} className="text-xs text-center mb-1 text-muted-foreground px-4">
                Mira is still experimental and can make mistakes. Please do your own due diligence.
                Made by <Link className="font-medium hover:underline" href="https://github.com/Decodam" target="_blank">@Decodam</Link> as part of Project Neurvox.
              </p>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
