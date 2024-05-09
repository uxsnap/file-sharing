import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@mantine/core/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Sharing",
};

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
        className={inter.className}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
