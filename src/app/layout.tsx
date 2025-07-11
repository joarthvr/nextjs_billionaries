import "./styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | billionaries",
    default: "billionaries",
  },
  description: "billionaries",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
