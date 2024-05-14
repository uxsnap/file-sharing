"use client";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      style={{ height: "100%", width: "auto", margin: 0, padding: 0 }}
      lang="en"
    >
      <body
        style={{ height: "100%", width: "auto", margin: 0, padding: 0 }}
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <MantineProvider>
          <Notifications />

          <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
