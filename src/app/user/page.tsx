import React from 'react';

const UserPage = () => {
  return (
    <div className=" w-full flex space-x-10 flex-col-reverse lg:flex-row ">
      <section className="w-[34.5rem]  border h-screen ">1</section>
      <section className="flex-1 flex space-x-10 ">
        <div className="flex-1 h-screen bg-foreground text-background">2</div>
        <div className="flex-1 h-screen bg-foreground  text-background">3</div>
      </section>
    </div>
  );
};

export default UserPage;
