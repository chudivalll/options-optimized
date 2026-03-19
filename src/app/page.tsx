import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_60%)]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-44 text-center">
          <div className="animate-fade-in-up">
            <p className="text-sm font-medium text-blue-300 tracking-widest uppercase mb-6">
              Learn by doing. Master by predicting.
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Options trading,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                demystified
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Step into real historical market moments. Analyze the Greeks,
              read the sentiment, make your prediction — then see what
              actually happened.
            </p>
            <div className="mt-12">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-100 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
              >
                Get Started Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-200">
              {[
                { number: "8+", label: "Real Scenarios" },
                { number: "14", label: "Interactive Lessons" },
                { number: "5", label: "Learning Modules" },
                { number: "100+", label: "Quiz Questions" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-sm text-slate-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 md:py-36 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
                How It Works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Three steps to better trading decisions
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-violet-200" />

            <div className="space-y-16 md:space-y-24">
              {[
                {
                  step: "01",
                  title: "Learn the Fundamentals",
                  desc: "Interactive lessons on options basics, the Greeks, implied volatility, and trading strategies. Take quizzes to lock in your knowledge before you trade.",
                  gradient: "from-blue-500 to-blue-600",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  ),
                  direction: "left" as const,
                },
                {
                  step: "02",
                  title: "Analyze Real Scenarios",
                  desc: "Step into historical market moments. Study the options chain, read analyst sentiment, examine volatility data, and form your thesis — just like a real trader.",
                  gradient: "from-indigo-500 to-indigo-600",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  ),
                  direction: "right" as const,
                },
                {
                  step: "03",
                  title: "Predict & Get Scored",
                  desc: "Submit your trade prediction — direction, strategy, timeframe, and confidence. Then see what actually happened and get scored on every dimension.",
                  gradient: "from-violet-500 to-violet-600",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  direction: "left" as const,
                },
              ].map((item, idx) => (
                <ScrollReveal key={item.step} direction={item.direction} delay={0}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    {/* Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        {item.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                        <span className="text-xs font-bold text-slate-500">{item.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`text-center md:text-left ${idx % 2 === 1 ? "md:text-right" : ""} max-w-lg`}>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
                Capabilities
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Everything you need to master options
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "The Greeks",
                desc: "Delta, Gamma, Theta, Vega — understand what drives option prices and how they change in real time.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889" />
                  </svg>
                ),
                color: "blue",
                delay: 100,
              },
              {
                title: "Implied Volatility",
                desc: "IV rank, IV crush, volatility skew — learn to read the market's expectations before placing a trade.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                ),
                color: "indigo",
                delay: 200,
              },
              {
                title: "Options Strategies",
                desc: "Spreads, straddles, strangles — pick the right strategy for any market condition and risk profile.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                ),
                color: "violet",
                delay: 300,
              },
              {
                title: "Market Sentiment",
                desc: "Put/call ratios, analyst ratings, news catalysts — decode what the market is telling you.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                color: "rose",
                delay: 400,
              },
            ].map((feature) => {
              const borderColors: Record<string, string> = {
                blue: "border-l-blue-500",
                indigo: "border-l-indigo-500",
                violet: "border-l-violet-500",
                rose: "border-l-rose-500",
              };
              const iconBgs: Record<string, string> = {
                blue: "bg-blue-50 text-blue-600",
                indigo: "bg-indigo-50 text-indigo-600",
                violet: "bg-violet-50 text-violet-600",
                rose: "bg-rose-50 text-rose-600",
              };
              return (
                <ScrollReveal key={feature.title} delay={feature.delay}>
                  <div className={`bg-slate-50 rounded-xl p-8 border-l-4 ${borderColors[feature.color]} hover:bg-white hover:shadow-lg transition-all duration-300 h-full`}>
                    <div className={`w-12 h-12 ${iconBgs[feature.color]} rounded-xl flex items-center justify-center mb-5`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-sm font-medium text-blue-300 tracking-widest uppercase mb-6">
              Start Today
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to level up your trading?
            </h2>
            <p className="text-slate-400 mb-12 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
              Join Options Pulse and start learning from real market history. No risk, all knowledge.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-100 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
            >
              Start Learning Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          Options Pulse — Educational options trading platform. Not financial advice.
        </div>
      </footer>
    </div>
  );
}
