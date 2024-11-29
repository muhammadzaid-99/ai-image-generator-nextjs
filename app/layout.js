import "./globals.css";

export const metadata = {
  title: "Generate AI Images",
  description: "Generate Images from Text Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
