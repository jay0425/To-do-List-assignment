import type { Metadata } from "next";
import Providers from "@/libs/providers";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Todo List",
  description: "스프린트 투두리스트 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="w-full min-h-screen relative">
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
