import "@/app/style/globals.css";
import Providers from "./providers";

export const metadata = { title: "Mancer Employe Web3" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
