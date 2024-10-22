import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "lauralikespi",
  description: 'Technology, Innovation and Education',
  icons: {
    icon: '/pi-logo.png',
},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
