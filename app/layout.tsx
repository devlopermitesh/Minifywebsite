import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Sidebar from "@/components/Sidebar";
import SuperBaseProvider from "@/provider/SuperBaseProvider";
import ModalProvider from "@/provider/ModalProvider";
import { UserProviderClient } from "@/hook/UserProvider";
import Player from "@/components/Player";
const font = Figtree({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Minify",
  description: "listen music without primium subscription",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="https://cdn.jim-nielsen.com/ios/512/spotify-music-2015-07-30.png?rf=1024" />
      </head>
      <body
        className={`${font.className} antialiased`}
      >
        <SuperBaseProvider>
        <ToastContainer/>
          <UserProviderClient>
            <ModalProvider/>
        <Sidebar>
        {children}
        </Sidebar>
     <Player/>
        </UserProviderClient>
        </SuperBaseProvider>
      </body>
    </html>
  );
}
