"use client"

import { motion } from "framer-motion"

export default function AnimatedHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60"
      >
        Startova
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-4xl text-5xl md:text-7xl font-semibold leading-tight"
      >
        Build it once.
        <br />
        Own it fully.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-white/70"
      >
        Stop renting your website from platforms that keep charging for every little thing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <a
          href="/contact"
          className="rounded-full bg-white px-6 py-3 text-black font-medium hover:bg-white/90 transition"
        >
          Start your website
        </a>
      </motion.div>
    </section>
  )
}