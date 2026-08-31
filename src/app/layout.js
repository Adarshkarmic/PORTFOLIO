import "./globals.css";

export const metadata = {
  title: "Adarsh Karmic - Portfolio",
  description: "Web Designer & Digital Creator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Sacramento&family=Playfair+Display:ital,wght@0,700;1,700&family=Great+Vibes&family=Inter:wght@300;400;500;600&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
