import About from '@/components/About';
import CallToAction from '@/components/CallToAction';
import Clients from '@/components/Clients';
import ScrollUp from '@/components/Common/ScrollUp';
import Contact from '@/components/Contact';
import Faq from '@/components/Faq';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Header from '@/components/home/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculate smarter, spend wiser - Monthly Budget',
  description: 'Calculate smarter, spend wiser - Monthly Budget',
};

export default function Home() {
  return (
    <main>
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
    </main>
  );
}
