"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_componets/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link"; // ✅ FIXED import
import { Button } from "@/components/ui/button";
import HealixFooter from "./_componets/HealixFooter";

export default function Home() {
  return (
    <div className="relative my-10 flex flex-col items-center justify-center mt-0">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Revolutionize Patient Care with AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Deliver instant, accurate medical assistance through natural voice
          conversations. Automate appointment scheduling, symptom triage, and
          follow-up care - 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Explore Now
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          {/* <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div> */}
          

<section className="bg-white py-16 md:py-32 flex flex-col items-center justify-center text-center w-[95vw] mx-auto">

  {/* Headline: Font sizes restored to text-2xl md:text-4xl lg:text-7xl */}
  <h1 className="relative z-10 mx-auto max-w-full text-center font-bold text-slate-700 text-2xl md:text-4xl lg:text-7xl dark:text-slate-300 mb-6 px-4 ">
    Talk With Our <br className="hidden sm:block" /> AI Chat Assistants
  </h1>

  {/* Sub-text: Font size restored to text-lg */}
  <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400 mb-10 px-4">
    Get **instant, secure answers** to your health questions, find the right specialist, and schedule appointments with ease. Our **HIPAA-compliant** AI assistants guide you through complex medical information 24/7.
  </p>


  {/* Buttons Container */}
  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
    {/* Primary Button */}
    <button className="px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300">
      Explore Medical AI Models
    </button>

    {/* Secondary Button */}
    <button className="px-8 py-3 text-base font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300">
      Request HIPAA Compliance Audit
    </button>
  </div>

  {/* Trust Section/Logos */}
  <div className="w-full pt-6 border-t border-gray-100 px-4">
    <p className="text-sm text-gray-500 mb-4">
      Trusted by Healthcare Providers and Tech Partners over the world
    </p>

    <div className="flex items-center justify-center space-x-6 flex-wrap">
      <span className="text-gray-500 font-semibold">LLama-2</span>
      <span className="text-gray-500 font-semibold">HL7 FHIR</span>
      <span className="text-gray-500 font-semibold">HIPAA</span>
      <span className="text-gray-500 font-semibold">AWS Health</span>
      <span className="text-gray-500 font-semibold">React Native</span>
    </div>
  </div>
</section>


          
        </motion.div>
      </div>
      <FeatureBentoGrid />
      <HealixFooter/>
      
    </div>

  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Healix</h1>
      </div>

      {!user ? (
        <Link href="/sign-in">
          <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <UserButton />
          <Link href="/dashboard">
            <Button> 
              Dashboard
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
