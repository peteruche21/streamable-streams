import LayoutComponent from "../components/Layout";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
