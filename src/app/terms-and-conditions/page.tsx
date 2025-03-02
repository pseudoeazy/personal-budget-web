import Footer from '@/components/home/Footer';
import React from 'react';

const Terms = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* <p className="mb-4">Effective Date: 2024-7-15</p> */}
        <div className="w-full flex">
          <h1 className="text-3xl font-bold mb-4 text-secondary">
            Terms of Service for Your Business{' '}
          </h1>
        </div>
        <br />
        <p className="mb-4 text-base">
          Welcome to the MonthlyBudget. Please read these terms of service
          carefully before using the MonthlyBudget. By using the MonthlyBudget,
          you agree to be bound by these terms of service. If you do not agree
          to these terms of service, you may not use the MonthlyBudget. These
          terms of service govern your use of the MonthlyBudget and all services
          provided by the MonthlyBudget. If you do not agree to these terms of
          service, you may not use the MonthlyBudget.
        </p>
        <br />

        <div className="pb-5">
          <h2 className="font-bold text-secondary ">General</h2>

          <br />
          <ul>
            <li className="list-disc">
              <p className="text-base">
                By accessing this MonthlyBudget, you agree to be bound by these
                terms of service, all applicable laws and regulations, and agree
                that you are responsible for compliance with any applicable
                local laws. If you do not agree with any of these terms, you are
                prohibited from using or accessing this site. The materials
                contained in this MonthlyBudget are protected by applicable
                copyright and trademark law.
              </p>
            </li>
            <br />
            <li className="list-disc">
              <p className="text-base">
                We reserve the right to change these terms of service at any
                time without notice. By using this MonthlyBudget you are
                agreeing to be bound by the then current version of these terms
                of service. Any updates you will be notified via email.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
