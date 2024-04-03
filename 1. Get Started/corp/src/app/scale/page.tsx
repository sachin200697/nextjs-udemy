import Hero from '@/components/hero';
import scaleImg from '/public/scale.jpg';
export default function Scale() {
    return (
      <div>
        <Hero imgData={scaleImg} imgAlt="Steel Factory" title="Scale your app to infinity" />
      </div>
    );
  }
  