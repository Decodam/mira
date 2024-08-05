import "@/styles/globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Poppins as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/context/sidebar-provider";
import { MessageProvider } from "@/context/message-provider";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "MIRA - AI Doctor",
  description: "Medically Intelligent Response Agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <MessageProvider>
              {children}
            </MessageProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
