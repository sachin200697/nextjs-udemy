import Hero from '@/components/hero';
import performanceImg from '/public/performance.jpg';
export default function Performance() {
    return (
      <div>
        <Hero imgData={performanceImg} imgAlt="welding" title="We Serve Hight Performance Applications" />
      </div>
    );
  }
  