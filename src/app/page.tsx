import About from '@/components/home/About';
import CallToAction from '@/components/home/CallToAction';
import ScrollUp from '@/components/home/Common/ScrollUp';
import Contact from '@/components/home/Contact';
import Faq from '@/components/home/Faq';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import Header from '@/components/home/header';
import Footer from '@/components/home/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculate smarter, spend wiser - Monthly Budget',
  description: 'Calculate smarter, spend wiser - Monthly Budget',
};

export default function Home() {
  return (
    <div>
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <CallToAction />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
