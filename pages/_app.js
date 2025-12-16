import '@/styles/globals.css'
import Navbar from '@/components/navbar'
import Contact, { CaptchaProvider } from "@/components/contact";
import Footer from '@/components/footer'
import Floating from '@/components/floatinglinks'

export default function App({ Component, pageProps }) {
  return (
    <>
      <CaptchaProvider>
        <Navbar />
        <Component {...pageProps} />
        <Contact />
        <Floating />
        <Footer />
      </CaptchaProvider>
    </>
  );
}
