import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const LeadMagnet = dynamic(() => import("@/components/LeadMagnet"), { ssr: false });
const SocialProofToast = dynamic(() => import("@/components/SocialProofToast"), { ssr: false });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();

    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const isAdminRoute = router.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className={poppins.className}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    );
  }

  return (
    <div className={poppins.className}>
      <LanguageProvider>
        <Component {...pageProps} />
        <LeadMagnet />
        <SocialProofToast />
      </LanguageProvider>
    </div>
  );
}
