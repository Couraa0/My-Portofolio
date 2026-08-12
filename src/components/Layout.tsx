import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import CursorSpotlight from "./CursorSpotlight";
import Chatbot from "./Chatbot";
import MusicPopup from "./MusicPopup";
import MobileBottomBar from "./MobileBottomBar";

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio play blocked by browser:", e));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleAudio = () => setIsPlaying(prev => !prev);

  return (
    <div className="min-h-screen relative bg-background flex flex-col transition-all duration-500 ease-in-out overflow-x-hidden">
      <CursorSpotlight />
      <ScrollProgress />

      <Navbar isPlaying={isPlaying} toggleAudio={toggleAudio} />
      <MusicPopup isPlaying={isPlaying} toggleAudio={toggleAudio} />

      {/* Main Content Area — extra bottom padding on mobile for bottom bar clearance */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 transition-all duration-300 pb-16 md:pb-0">
        <Outlet />
      </main>

      <Footer />
      <Chatbot />
      <MobileBottomBar />
    </div>
  );
};

export default Layout;
