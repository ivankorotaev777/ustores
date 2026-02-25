import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ustores — сеть ПВЗ в Узбекистане | Последняя миля",
  description: "Действующая сеть пунктов выдачи заказов в Ташкенте. Подключитесь к готовой инфраструктуре и платите только за реальные выдачи.",
  keywords: ["ПВЗ", "Узбекистан", "Ташкент", "last mile", "логистика", "выдача заказов", "pickup points"],
  authors: [{ name: "Ustores" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
