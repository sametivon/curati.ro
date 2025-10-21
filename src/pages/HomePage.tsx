import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { ServiceCategories } from '@/components/home/ServiceCategories';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TopCleaners } from '@/components/home/TopCleaners';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header transparent />
      <Hero />
      <ServiceCategories />
      <HowItWorks />
      <TopCleaners />
      <Footer />
    </div>
  );
};
