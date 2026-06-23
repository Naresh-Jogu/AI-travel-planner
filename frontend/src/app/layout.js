import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Trao AI Travel Planner",
  description: "AI Powered Travel Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
