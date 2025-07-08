import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/black-logo.svg"; // Adjust the path as necessary

export default function HomePage() {
  return (
    <main className="font-sans text-base leading-relaxed">
      <HeroSection />
      <FeatureSection />
      <PricingSection />
    </main>
  );
}

/* ------------------------------------------------------------------------- */
/*  Hero                                                                     */
/* ------------------------------------------------------------------------- */

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
  <section className="relative bg-gradient-to-br from-white to-[#f8f9ff] px-6 pt-16 pb-24 md:px-14 lg:px-24 flex flex-row flex-start justify-between items-start gap-8">

    <div className="mx-auto max-w-3xl text-left">
      <h1 className="mb-6 text-4xl font-bold md:text-5xl">
        The Perfect Cover Letter. <br/>Instantly.
      </h1>
      <p className="mb-8 text-xl max-w-xl text-muted-foreground">
        {/* TODO: WRITE CUSTOM MESSAGE */}
        Our cover letter generator crafts tailored, ATS-friendly cover letters that maximize the chance of landing any job.
      </p>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {/* TODO: ROUTE THESE BUTTONS */}
        <Button className="btn-homepage" onClick={() => navigate("/login")}>
          <span>Get Started</span>
          <ArrowRight />
        </Button>
        <Button asChild variant="outline" className="btn-homepage">
          <a href="#features">
            <span>Learn More</span>
          </a>
        </Button>
      </div>
    </div>
    <div >
      <img src={logo} alt="Logo" className="w-80"/>
    </div>
  </section>
  )
}

/* ------------------------------------------------------------------------- */
/*  Feature grid                                                             */
/* ------------------------------------------------------------------------- */

const features = [
  {
    title: "1. Resume Analysis",
    desc: "Extracts key skills and experiences from your resume.",
  },
  {
    title: "2. Job Description Analysis",
    desc: "Analyzes job postings to identify essential keywords and requirements.",
  },
  {
    title: "3. Cover Letter Generation",
    desc: "Generates a tailored cover letter that highlights your strengths and matches the job requirements.",
  },
];

const FeatureSection = () => (
  <section className="bg-primary py-20 text-white" id="features">
    <div className="mx-auto mb-12 max-w-3xl px-4 text-center">
      <h2 className="mb-4 text-3xl font-semibold">
        Advanced Cover Letter ATS Optimization
      </h2>
      <p className="text-muted-foreground/80 text-xl">
        Our AI-powered generator creates custom tailored cover letters that highlight your unique skills and experiences and overlap with the job you are applying for.
        <br />
      </p>
    </div>

    <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2 md:grid-cols-3">
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>

  </section>
);

interface FeatureCardProps {
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc }) => (
  <div className="rounded-lg bg-card p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
    <h3 className="mb-2 font-medium text-black">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>
);


/* ------------------------------------------------------------------------- */
/*  Pricing                                                                  */
/* ------------------------------------------------------------------------- */

const plans = [
  {
    name: "Starter",
    price: "$0",
    note: "month",
    perks: ["3 cover letters per month", "Basic ATS optimization"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    note: "month",
    perks: [
      "50 cover letters per month",
      "Advanced ATS optimization",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Elite",
    price: "$12",
    note: "month",
    perks: [
      "Everything in Pro",
      "Unlimited cover letters",
      "Priority support",
      "Keyword optimization",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24" id="pricing">
      <div className="mx-auto mb-10 max-w-xl px-4 text-center">
        <Sparkles className="mx-auto mb-6 h-8 w-8 text-primary" />
        <h2 className="text-3xl font-semibold">Pick Your Plan.</h2>
        <p className="text-muted-foreground">
        Select the perfect plan for your career journey.
      </p>
    </div>

    <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2 md:grid-cols-3">
      {plans.map((p) => (
        <PricingCard key={p.name} {...p} />
      ))}
    </div>
  </section>
);
}

interface PricingCardProps {
  name: string;
  price: string;
  note: string;
  perks: string[];
  cta: string;
  popular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, note, perks, cta, popular }) => (
  <div

    className={
      "flex flex-col rounded-lg border p-6 shadow-sm transform transition hover:-translate-y-1 group-hover:-translate-y-2 hover:!bg-gray-50/70" +
      (popular ? " border-primary shadow-md" : "")
    }
  >
    {popular && (
      <span className="-mt-8 mb-4 self-center rounded-full bg-primary px-3 py-1 text-xs text-white">
        Most Popular
      </span>
    )}
    <h3 className="mb-2 text-lg font-medium text-center">{name}</h3>
    <div className="mb-6 flex items-end justify-center gap-1">
      <span className="text-4xl font-bold">{price}</span>
      <span className="text-sm text-muted-foreground">/{note}</span>
    </div>

    <ul className="mb-6 space-y-2 text-sm text-muted-foreground ">
      {perks.map((perk) => (
        <li key={perk} className="flex items-start gap-2">
          ✔️ <span>{perk}</span>
        </li>
      ))}
    </ul>

    <Button
      className="btn-homepage mt-auto mx-auto w-full"
    >

      {cta}
    </Button>
  </div>
);

/* ------------------------------------------------------------------------- */
/*  Footer                                                                   */
/* ------------------------------------------------------------------------- */


const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M21 12H3" />
  </svg>
);


const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={props.className}
  >
    <path d="M5 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4zm14 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zm-4 8l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5 1.5-3z" />
  </svg>
);
