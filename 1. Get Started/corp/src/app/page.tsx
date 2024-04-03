import Image from "next/image";
import homeImg from '/public/home.jpg';
import '@/css/header.css';
import Hero from "@/components/hero";
export default function Home() {
  return (
    <div>            
      <Hero imgData={homeImg} imgAlt="Car Factory" title="Professional Cloud Hosting" />
    </div>
  );
}
