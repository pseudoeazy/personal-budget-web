import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-text">
      {/* Header */}
      <header className="bg-neutral p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">MonthlyBudget Pro</h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="#features" className="hover:text-secondary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#dashboard" className="hover:text-secondary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-secondary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            href="/register"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto text-center py-20">
        <h2 className="text-4xl font-extrabold text-primary mb-4">
          Simplify Your Expense Tracking
        </h2>
        <p className="text-lg text-text mb-8">
          Keep track of personal and business expenses effortlessly with our
          SaaS platform.
        </p>
        <Link
          href="/register"
          className="bg-secondary text-neutral py-3 px-6 rounded shadow-md hover:bg-yellow-500"
        >
          Get Started
        </Link>
      </section>

      {/* Dashboard Showcase */}
      <section id="dashboard" className="bg-neutral py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Explore the Dashboard
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src="/images/dashboard-overview.png"
                alt="Dashboard Overview"
                width={600}
                height={400}
                className="rounded"
              />
            </div>
            <div className="text-text text-left">
              <h3 className="text-xl font-bold text-secondary mb-2">
                Intuitive Analytics
              </h3>
              <p>
                Get real-time insights into your financial data with beautifully
                crafted dashboards, showing expenses, trends, and more.
              </p>
              <ul className="list-disc ml-6 mt-4">
                <li>Track expenses across categories</li>
                <li>View spending trends</li>
                <li>Export reports for tax filing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-neutral rounded bg-neutral">
              <Image
                src="/images/realtime.webp"
                alt="Analytics"
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-text">
                Access detailed reports and charts for real-time expense
                analysis.
              </p>
            </div>
            <div className="p-6 border border-neutral rounded bg-neutral">
              <Image
                src="/images/realtime.webp"
                alt="Security"
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2">
                Secure Data
              </h3>
              <p className="text-text">
                Bank-level encryption ensures your financial data stays safe and
                secure.
              </p>
            </div>
            <div className="p-6 border border-neutral rounded bg-neutral">
              <Image
                src="/images/realtime.webp"
                alt="Collaboration"
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2">
                Team Collaboration
              </h3>
              <p className="text-text">
                Invite teammates to manage business expenses collaboratively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-neutral py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-neutral rounded bg-neutral">
              <h3 className="text-xl font-bold text-secondary">Free Plan</h3>
              <p className="text-text my-4">$0/month</p>
              <ul className="text-text mb-6">
                <li>Basic Features</li>
                <li>Single User</li>
                <li>Limited Reports</li>
              </ul>
              <Link
                href="/register"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
            <div className="p-6 border border-neutral rounded bg-neutral">
              <h3 className="text-xl font-bold text-secondary">Pro Plan</h3>
              <p className="text-text my-4">$19.99/month</p>
              <ul className="text-text mb-6">
                <li>All Features</li>
                <li>Multi-User Access</li>
                <li>Priority Support</li>
              </ul>
              <Link
                href="/register"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Get Started
              </Link>
            </div>
            <div className="p-6 border border-neutral rounded bg-neutral">
              <h3 className="text-xl font-bold text-secondary">Enterprise</h3>
              <p className="text-text my-4">Custom Pricing</p>
              <ul className="text-text mb-6">
                <li>Custom Integrations</li>
                <li>Dedicated Support</li>
                <li>Advanced Analytics</li>
              </ul>
              <Link
                href="/contact"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral p-4 text-center text-text">
        <p>
          &copy; {new Date().getFullYear()} MonthlyBudget Pro. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
