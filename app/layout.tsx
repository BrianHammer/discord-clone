import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { Open_Sans as Font } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Plugin middleware from UploadThing
//
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord clone app",
  description: "A clone of discord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          {/* Copy paste to improve Router */}
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            storageKey="discord-theme"
          >
            <ModalProvider />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
