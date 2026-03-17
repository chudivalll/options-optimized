import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Learn Options Trading Through{" "}
              <span className="text-blue-200">Real History</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 leading-relaxed">
              Master the Greeks, understand implied volatility, and test your
              skills by predicting the outcomes of real historical market events.
              No risk, all knowledge.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/learn"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Explore Lessons
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Three steps to becoming a smarter options trader
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Learn the Fundamentals",
                desc: "Interactive lessons on options basics, the Greeks, implied volatility, and trading strategies. Quiz yourself to lock in knowledge.",
                color: "bg-blue-600",
              },
              {
                step: "02",
                title: "Analyze Real Scenarios",
                desc: "Step into historical market moments. Study the data, read the sentiment, and examine the Greeks before making your prediction.",
                color: "bg-indigo-600",
              },
              {
                step: "03",
                title: "Predict & Learn",
                desc: "Submit your trade prediction, then see what actually happened. Get scored on direction, strategy, and timing.",
                color: "bg-violet-600",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <span className="text-white font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            What You&apos;ll Master
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "The Greeks", desc: "Delta, Gamma, Theta, Vega — understand what drives option prices" },
              { title: "Implied Volatility", desc: "IV rank, IV crush, volatility skew — read the market's expectations" },
              { title: "Options Strategies", desc: "Spreads, straddles, strangles — pick the right strategy for any scenario" },
              { title: "Market Sentiment", desc: "Put/call ratios, news catalysts — read what the market is telling you" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Trading?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join Options Optimized and start learning from real market history today.
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Start Learning Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Options Optimized — Educational options trading platform. Not financial advice.
        </div>
      </footer>
    </div>
  );
}
