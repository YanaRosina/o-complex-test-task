import "../styles/global.sass";
import { inter } from "@/font/font";
import { ModalProvider } from "@/components/ui/modal/modalContext";
import { AutoCloseModal } from "@/components/ui/modal/modal";

export const metadata = {
  title: "Тестовое задание",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        {" "}
        <ModalProvider>
          <AutoCloseModal />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
