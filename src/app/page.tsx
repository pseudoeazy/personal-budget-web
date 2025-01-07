import Budget from '@/components/forms/budget';
import HomeSVG from '@/components/home/home-svg';

export default function Home() {
  return (
    <div className="flex">
      <section className="hidden md:flex md:flex-col xl:flex-1 min-h-screen pt-40 bg-boxColorLight md:pr-8">
        <h1 className="md:pl-8 pl-12 text-[2.65rem] italic font-normal leading-normal capitalize text-black">
          Calculate smarter,
          <br /> spend wiser ...
        </h1>
        <HomeSVG />
      </section>
      <section className="flex-1 min-h-screen bg-mainDarkBase pt-24 flex justify-center sm:pb-24">
        <div className="px-10 sm:mt-24 mb-20">
          <h2 className="mb-14 text-center text-boxColorLight text-[3.75rem] font-normal leading-normal capitalize">
            monthly <span className="text-complOpt2">budget</span>
          </h2>
          <Budget />
        </div>
      </section>
    </div>
  );
}
