export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonData {
  moduleSlug: string;
  slug: string;
  title: string;
  order: number;
  content: string;
  quizData: QuizQuestion[];
}

export const lessons: LessonData[] = [
  // ─────────────────────────────────────────────
  // Module: options-basics
  // ─────────────────────────────────────────────
  {
    moduleSlug: "options-basics",
    slug: "what-are-options",
    title: "What Are Options?",
    order: 1,
    content: `## What Are Options?

An **option** is a financial contract that gives the buyer the *right*, but not the *obligation*, to buy or sell an underlying asset at a predetermined price before or on a specific date. Unlike buying stock outright, options let you control a position with far less capital while defining your maximum risk upfront.

There are two fundamental types of options: **calls** and **puts**. A **call option** gives the holder the right to *buy* the underlying asset at the strike price. A **put option** gives the holder the right to *sell* the underlying asset at the strike price. Think of a call as a deposit on a house you want to buy — you lock in the price now and decide later whether to go through with the purchase.

Every option contract represents **100 shares** of the underlying stock. So when you see an option quoted at $2.50, the actual cost is $250 (100 shares x $2.50). This leverage is what makes options so powerful — and so risky if misused. A small move in the underlying stock can produce outsized percentage gains or losses in the option.

Options are a **zero-sum game** between buyers and sellers. For every option buyer, there is an option seller (also called a "writer"). The buyer pays a premium for the right the contract provides. The seller collects that premium but takes on the obligation to fulfill the contract if the buyer exercises it. This dynamic creates a fascinating marketplace where traders with different outlooks can both find opportunities.

Understanding this buyer-seller relationship is critical. When you buy an option, your maximum loss is the premium you paid — it's defined and limited. When you sell an option, your profit is capped at the premium you collected, but your potential loss can be substantial, even unlimited in the case of naked calls. This asymmetry is the foundation of every options strategy you'll learn going forward.`,
    quizData: [
      {
        question:
          "What does a call option give the buyer the right to do?",
        options: [
          "Sell the underlying asset at the strike price",
          "Buy the underlying asset at the strike price",
          "Sell the underlying asset at market price",
          "Buy the underlying asset at market price",
        ],
        correctIndex: 1,
        explanation:
          "A call option gives the buyer the right to BUY the underlying asset at the predetermined strike price. A put option is the one that gives the right to sell.",
      },
      {
        question:
          "If an option is quoted at $3.00, how much does one contract actually cost?",
        options: ["$3.00", "$30.00", "$300.00", "$3,000.00"],
        correctIndex: 2,
        explanation:
          "Each option contract represents 100 shares. So $3.00 per share x 100 shares = $300.00 per contract.",
      },
      {
        question:
          "What is the maximum loss for a buyer of a call option?",
        options: [
          "Unlimited",
          "The strike price",
          "The premium paid",
          "The value of 100 shares",
        ],
        correctIndex: 2,
        explanation:
          "The maximum loss for an option buyer (call or put) is always limited to the premium paid for the contract. This defined risk is one of the key advantages of buying options.",
      },
    ],
  },
  {
    moduleSlug: "options-basics",
    slug: "options-terminology",
    title: "Options Terminology",
    order: 2,
    content: `## Options Terminology

Mastering options vocabulary is essential before placing your first trade. The **strike price** (or exercise price) is the price at which the option holder can buy (for calls) or sell (for puts) the underlying asset. The **premium** is the price you pay to purchase the option — it's the option's market price and represents the total cost of the trade for the buyer.

Every option has an **expiration date** — the last day the contract is valid. After this date, the option ceases to exist. Options can be weekly (expiring every Friday), monthly (expiring the third Friday of each month), or LEAPs (Long-term Equity Anticipation Securities, expiring over a year out). As expiration approaches, certain dynamics like time decay accelerate, which you'll learn about in later modules.

Options are categorized by their relationship to the current stock price. An option is **in-the-money (ITM)** when exercising it would be profitable: for calls, when the stock price is above the strike; for puts, when the stock is below the strike. **At-the-money (ATM)** means the stock price is roughly equal to the strike price. **Out-of-the-money (OTM)** means exercising would not be profitable: for calls, the stock is below the strike; for puts, the stock is above the strike.

An option's premium is made up of two components: **intrinsic value** and **extrinsic (time) value**. Intrinsic value is the amount by which an option is in-the-money. For example, if a stock is at $55 and you hold a $50 call, the intrinsic value is $5. Extrinsic value is everything else — it reflects time remaining, implied volatility, and other factors. OTM options have zero intrinsic value; their entire premium is extrinsic.

Here's a practical example: Suppose Apple (AAPL) is trading at $180. A $175 call expiring in 30 days is priced at $8.00. The intrinsic value is $5.00 ($180 - $175) and the extrinsic value is $3.00 ($8.00 - $5.00). That $3.00 of extrinsic value will decay to zero by expiration — this is the time premium you're paying for the *possibility* that AAPL moves even higher.`,
    quizData: [
      {
        question:
          "A stock trades at $100. A $95 call option has how much intrinsic value?",
        options: ["$0", "$5", "$95", "$100"],
        correctIndex: 1,
        explanation:
          "Intrinsic value for a call = Stock Price - Strike Price (when positive). $100 - $95 = $5. The call is $5 in-the-money.",
      },
      {
        question:
          "A put option with a strike price of $50 is out-of-the-money when the stock is trading at:",
        options: ["$45", "$50", "$40", "$55"],
        correctIndex: 3,
        explanation:
          "A put is OTM when the stock price is ABOVE the strike price, because exercising the right to sell at $50 when the stock is at $55 would not be profitable. At $45 or $40, the put would be ITM.",
      },
      {
        question:
          "An option's premium consists of which two components?",
        options: [
          "Delta and gamma",
          "Strike price and expiration date",
          "Intrinsic value and extrinsic (time) value",
          "Bid price and ask price",
        ],
        correctIndex: 2,
        explanation:
          "An option's premium is the sum of its intrinsic value (how much it's in-the-money) and its extrinsic value (time value, volatility premium, etc.).",
      },
    ],
  },
  {
    moduleSlug: "options-basics",
    slug: "buying-vs-selling-options",
    title: "Buying vs Selling Options",
    order: 3,
    content: `## Buying vs Selling Options

In options trading, every trade has two sides: the **buyer** (who goes *long*) and the **seller** or writer (who goes *short*). Understanding the risk and reward profile of each side is arguably the most important concept in options trading.

When you **buy** an option (go long), you pay the premium upfront. For a long call, you profit when the underlying stock rises above your strike price plus the premium paid (your breakeven). For a long put, you profit when the stock falls below your strike minus the premium. In both cases your maximum loss is limited to the premium you paid, but your potential profit can be very large — theoretically unlimited for calls, and substantial (down to zero) for puts.

When you **sell** an option (go short), you *collect* the premium upfront. For a short (naked) call, you're obligated to sell shares at the strike price if the buyer exercises. For a short put, you're obligated to buy shares at the strike price. The premium you collected is your maximum profit, but your potential loss can be enormous — unlimited for a naked call if the stock skyrockets, or down to the full strike price for a naked put if the stock goes to zero.

So when should you buy, and when should you sell? Buying options makes sense when you have a **strong directional conviction** and want defined risk with leveraged upside. Selling options is advantageous when you believe the underlying will stay within a range or when you want to profit from **time decay** — the natural erosion of an option's extrinsic value as expiration approaches. Statistically, a significant percentage of options expire worthless, which is why selling premium is a popular strategy among experienced traders.

In practice, most professional traders combine buying and selling into **spreads** — multi-leg strategies that define both the maximum profit and maximum loss. For example, instead of selling a naked put (high risk), you might sell a put and simultaneously buy a cheaper put below it, creating a "bull put spread" with limited and defined risk on both sides. You'll explore these strategies in depth in later modules.`,
    quizData: [
      {
        question:
          "What is the maximum profit for the seller of a put option?",
        options: [
          "Unlimited",
          "The strike price minus the premium",
          "The premium collected",
          "The difference between stock price and strike price",
        ],
        correctIndex: 2,
        explanation:
          "The maximum profit for any option seller is the premium collected. The best-case scenario for a put seller is that the stock stays above the strike and the option expires worthless, letting them keep the entire premium.",
      },
      {
        question:
          "Why might a trader choose to sell options rather than buy them?",
        options: [
          "Selling options has zero risk",
          "To profit from time decay and collect premium",
          "Sold options never get exercised",
          "Selling options provides unlimited upside",
        ],
        correctIndex: 1,
        explanation:
          "Option sellers benefit from time decay (theta) — as time passes, the extrinsic value of options erodes, which benefits the seller who collected that premium. Selling is NOT risk-free, and options can absolutely be exercised.",
      },
      {
        question:
          "A trader wants to profit from a big upward move in a stock with limited risk. Which position is most appropriate?",
        options: [
          "Sell a naked call",
          "Sell a naked put",
          "Buy a call",
          "Buy a put",
        ],
        correctIndex: 2,
        explanation:
          "Buying a call gives you leveraged upside exposure with defined risk (the premium paid). A big upward move would increase the call's value significantly. Selling a naked call would lose money on an upward move, and puts profit from downward moves.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Module: the-greeks
  // ─────────────────────────────────────────────
  {
    moduleSlug: "the-greeks",
    slug: "delta-and-gamma",
    title: "Delta & Gamma",
    order: 1,
    content: `## Delta & Gamma

**Delta** is the most intuitive of the Greeks. It measures how much an option's price is expected to change for every $1 move in the underlying stock. A call with a delta of 0.50 will gain approximately $0.50 in value for every $1 increase in the stock price. Call deltas range from 0 to 1.0, while put deltas range from -1.0 to 0. The deeper in-the-money an option is, the closer its delta gets to 1.0 (or -1.0 for puts).

Delta also serves as a rough **probability proxy**. A delta of 0.30 roughly suggests a 30% chance the option will expire in-the-money. ATM options have deltas around 0.50, meaning the market prices them at roughly a coin-flip chance of finishing ITM. This makes delta incredibly useful for quick position assessment — if you own 10 call contracts at 0.50 delta, your position behaves like 500 shares of stock (10 contracts x 100 shares x 0.50).

**Gamma** is the rate of change of delta — it tells you how much delta will change for each $1 move in the underlying. Think of delta as speed and gamma as acceleration. A gamma of 0.05 means that if the stock moves up $1, the option's delta will increase by 0.05 (e.g., from 0.50 to 0.55). Gamma is highest for ATM options near expiration and lowest for deep ITM or OTM options.

Gamma can be your best friend or your worst enemy. For option **buyers**, high gamma means your deltas grow quickly in your favor when you're right — your profits accelerate. For option **sellers**, high gamma is dangerous because adverse moves cause the position to go against you at an increasing rate. This is why selling short-dated ATM options (which have the highest gamma) is considered one of the riskier options strategies.

In practice, traders manage gamma exposure carefully. Market makers constantly "gamma hedge" — buying or selling shares of the underlying to keep their portfolio delta-neutral. When you hear about "gamma squeezes" in the news (like during the GameStop saga of 2021), it refers to a feedback loop where market makers buying shares to hedge their gamma exposure pushes the stock higher, increasing gamma further and forcing more buying.`,
    quizData: [
      {
        question:
          "A call option has a delta of 0.65. If the underlying stock rises by $2, approximately how much will the option price increase (ignoring gamma effects)?",
        options: ["$0.65", "$1.30", "$2.00", "$0.35"],
        correctIndex: 1,
        explanation:
          "Delta measures the change per $1 move. For a $2 move: 0.65 x $2 = $1.30. This is an approximation because it ignores the fact that delta itself changes (gamma) as the stock moves.",
      },
      {
        question:
          "Which option position has the highest gamma risk?",
        options: [
          "A deep ITM LEAPS call",
          "A short ATM option expiring tomorrow",
          "A long OTM option expiring in 6 months",
          "A deep OTM option expiring next week",
        ],
        correctIndex: 1,
        explanation:
          "Gamma is highest for ATM options near expiration. A short ATM option expiring tomorrow has extremely high gamma, meaning delta (and therefore the position's P&L) can swing dramatically with small stock movements.",
      },
      {
        question: "If an option has a delta of 0.25, what does that roughly imply?",
        options: [
          "The option will profit $25 per contract per day",
          "The option has approximately a 25% chance of expiring in-the-money",
          "The option is 25% of the way to expiration",
          "The underlying stock has 25% implied volatility",
        ],
        correctIndex: 1,
        explanation:
          "Delta serves as a rough probability proxy. A delta of 0.25 suggests approximately a 25% probability that the option will expire in-the-money. This isn't an exact probability but it's a useful rule of thumb.",
      },
    ],
  },
  {
    moduleSlug: "the-greeks",
    slug: "theta-and-time-decay",
    title: "Theta & Time Decay",
    order: 2,
    content: `## Theta & Time Decay

**Theta** measures the rate at which an option loses value simply due to the passage of time, all else being equal. It's expressed as the dollar amount an option's price will decrease per day. For example, a theta of -0.05 means the option will lose approximately $0.05 per day ($5 per contract) just from time passing.

Time decay is not linear — it **accelerates** as expiration approaches. An option with 60 days to expiration might lose $2 per day, while the same option with 7 days left might lose $10 per day. This acceleration follows a roughly square-root pattern: an option loses about half its time value in the first two-thirds of its life, then the remaining half in the final third. The last two weeks before expiration are where theta really starts to bite.

For option **buyers**, theta is the enemy. Every day that passes without a favorable move in the underlying stock, your option is worth less. This is why buying options is often compared to buying a melting ice cube — the longer you hold it, the more value evaporates. It's not enough for the stock to eventually move in your direction; it needs to move *fast enough* to overcome the constant drain of time decay.

For option **sellers**, theta is the primary profit engine. Premium sellers aim to collect the option's extrinsic value and let time decay do the heavy lifting. This is why many income-focused strategies involve selling options with 30-45 days to expiration (DTE) — this timeframe captures the steepest part of the decay curve while avoiding the extreme gamma risk of very short-dated options. The "sweet spot" balances favorable theta decay against manageable risk.

Consider a real-world scenario: You sell a put on a stock at $100 with 30 DTE for $3.00. If the stock stays flat, theta will steadily erode the option's value. After 15 days, the option might be worth $1.80. After 25 days, perhaps $0.70. Many premium sellers target closing trades at 50% of max profit (here, $1.50 collected) rather than waiting for full expiration, to bank gains while reducing risk from sudden adverse moves.`,
    quizData: [
      {
        question: "How does time decay (theta) behave as expiration approaches?",
        options: [
          "It slows down near expiration",
          "It remains constant throughout the option's life",
          "It accelerates, with the fastest decay near expiration",
          "It only applies to in-the-money options",
        ],
        correctIndex: 2,
        explanation:
          "Time decay accelerates as expiration approaches. Options lose time value at an increasing rate, with the most rapid decay occurring in the final weeks and days before expiration.",
      },
      {
        question:
          "A trader sells options with 30-45 DTE as a premium collection strategy. Why is this range considered a 'sweet spot'?",
        options: [
          "Options at 30-45 DTE have zero gamma risk",
          "It captures steep theta decay while avoiding extreme short-dated gamma risk",
          "Options can only be sold at 30-45 DTE",
          "The stock always moves favorably in this timeframe",
        ],
        correctIndex: 1,
        explanation:
          "The 30-45 DTE window offers favorable theta decay (the curve is steepening) while keeping gamma manageable. Very short-dated options have higher theta but also much higher gamma, making positions harder to manage.",
      },
    ],
  },
  {
    moduleSlug: "the-greeks",
    slug: "vega-and-volatility-sensitivity",
    title: "Vega & Volatility Sensitivity",
    order: 3,
    content: `## Vega & Volatility Sensitivity

**Vega** measures an option's sensitivity to changes in **implied volatility (IV)**. Specifically, vega tells you how much the option's price will change for each 1-percentage-point change in IV. For example, if an option has a vega of 0.10 and IV increases by 2 percentage points, the option's price will increase by approximately $0.20 ($20 per contract).

Unlike the other Greeks, vega is always positive for both calls and puts. When IV rises, all options become more expensive (higher vega exposure benefits buyers). When IV falls, all options become cheaper (lower IV benefits sellers). This is because higher volatility means a greater probability of large price swings, which makes the "optionality" — the right to buy or sell — more valuable.

Vega is highest for **ATM options with more time to expiration**. A 6-month ATM option has significantly more vega than a 1-week ATM option. This makes intuitive sense: a change in expected volatility matters more when there's a long time for that volatility to play out. Deep ITM and OTM options have lower vega because their prices are less sensitive to changes in expected volatility.

Understanding vega is crucial for avoiding a common beginner trap: buying options before an earnings announcement expecting a big move. Before earnings, IV is elevated because the market expects a large price swing. After the announcement, IV typically collapses — an event known as "IV crush." Even if the stock moves in your predicted direction, the drop in IV can cause your option to lose value. You might be right on the direction and still lose money because vega worked against you.

Professional traders often structure trades specifically to exploit vega. **Long vega** trades (like buying straddles) profit when IV rises. **Short vega** trades (like selling iron condors) profit when IV falls. The key insight is that you're not betting on which direction the stock moves, but on whether actual future volatility will be higher or lower than what the market currently implies. This "volatility trading" mindset separates beginners from experienced options traders.`,
    quizData: [
      {
        question:
          "An option has a vega of 0.15. If implied volatility drops by 3 percentage points, how will the option price change?",
        options: [
          "Increase by $0.45",
          "Decrease by $0.45",
          "Decrease by $0.15",
          "Increase by $0.15",
        ],
        correctIndex: 1,
        explanation:
          "Vega of 0.15 means the option changes $0.15 for each 1-point change in IV. A 3-point drop: 0.15 x 3 = $0.45 decrease. When IV drops, option prices decrease.",
      },
      {
        question:
          "A trader buys a call before earnings. The stock rises 3%, but the option still loses value. What most likely happened?",
        options: [
          "Theta decay over a single day caused the entire loss",
          "The call had negative delta",
          "IV crush after earnings reduced the option's extrinsic value more than delta gains",
          "The strike price changed after earnings",
        ],
        correctIndex: 2,
        explanation:
          "This is a classic IV crush scenario. Before earnings, IV is elevated (high vega premium). After the announcement, IV collapses. The loss from vega (IV decline) exceeded the gain from delta (stock moving up), resulting in a net loss despite being right on direction.",
      },
      {
        question: "Which option has the highest vega exposure?",
        options: [
          "An ATM call expiring in 6 months",
          "A deep OTM put expiring in 1 week",
          "A deep ITM call expiring in 2 weeks",
          "An ATM put expiring in 3 days",
        ],
        correctIndex: 0,
        explanation:
          "Vega is highest for ATM options with the most time to expiration. The 6-month ATM call has the greatest sensitivity to changes in implied volatility because there is more time for volatility to impact the outcome.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Module: implied-volatility
  // ─────────────────────────────────────────────
  {
    moduleSlug: "implied-volatility",
    slug: "understanding-implied-volatility",
    title: "Understanding Implied Volatility",
    order: 1,
    content: `## Understanding Implied Volatility

**Implied Volatility (IV)** is the market's forecast of how much the underlying stock is expected to move over a given period. Unlike **historical volatility (HV)**, which measures how much a stock *has* moved in the past, IV is forward-looking — it's derived from current option prices using pricing models like Black-Scholes. When traders say IV is "high" or "low," they're describing how expensive options are relative to typical levels.

Think of IV as an insurance premium. When a hurricane is forecasted, homeowner insurance premiums spike — not because a loss has occurred, but because the *expected risk* has increased. Similarly, when the market expects a big move (earnings, FDA decisions, economic data), IV rises and options become more expensive. When uncertainty fades, IV falls and options get cheaper.

**IV Rank** and **IV Percentile** are two essential tools for contextualizing current IV levels. **IV Rank** tells you where the current IV falls within its 52-week range: if the 52-week IV range is 20% to 60%, and current IV is 40%, the IV rank is 50% (halfway between the low and high). **IV Percentile** tells you the percentage of days in the past year where IV was *lower* than it is today. An IV percentile of 80% means IV was lower than the current level 80% of the time in the past year.

These metrics matter enormously for strategy selection. When IV rank is high (above 50%), options are relatively expensive — favor **selling strategies** like credit spreads, iron condors, or short strangles that benefit when IV falls. When IV rank is low (below 30%), options are cheap — favor **buying strategies** like debit spreads, long straddles, or calendar spreads that benefit when IV rises.

Here's a practical example: Suppose Tesla (TSLA) typically has an IV between 40% and 80%. Today its IV is 72%, giving an IV rank of 80%. This tells you options are expensive relative to the past year. A savvy trader might sell premium (e.g., an iron condor) to capitalize on the high IV, expecting it to eventually revert toward the mean. Conversely, if IV were at 44% (IV rank of 10%), buying options would be comparatively cheap.`,
    quizData: [
      {
        question:
          "What is the key difference between implied volatility and historical volatility?",
        options: [
          "There is no difference; they measure the same thing",
          "IV is backward-looking and HV is forward-looking",
          "IV is forward-looking (market expectation) and HV measures past price movement",
          "IV only applies to calls and HV only applies to puts",
        ],
        correctIndex: 2,
        explanation:
          "Implied volatility reflects the market's EXPECTATION of future price movement (forward-looking), derived from current option prices. Historical volatility measures how much the stock has ACTUALLY moved in the past (backward-looking).",
      },
      {
        question:
          "A stock's 52-week IV range is 25% to 75%. Current IV is 65%. What is the IV Rank?",
        options: ["65%", "80%", "50%", "25%"],
        correctIndex: 1,
        explanation:
          "IV Rank = (Current IV - 52wk Low) / (52wk High - 52wk Low) = (65 - 25) / (75 - 25) = 40/50 = 80%. The current IV is 80% of the way between the annual low and high.",
      },
      {
        question:
          "When IV Rank is above 50%, which strategy approach is generally favored?",
        options: [
          "Buying long calls for maximum leverage",
          "Selling premium (credit spreads, iron condors) to capture elevated IV",
          "Buying straddles to profit from IV expansion",
          "Avoiding the market entirely until IV drops",
        ],
        correctIndex: 1,
        explanation:
          "High IV Rank means options are relatively expensive. Selling strategies (credit spreads, iron condors, short strangles) benefit from collecting elevated premium and the expected mean-reversion of IV to lower levels.",
      },
    ],
  },
  {
    moduleSlug: "implied-volatility",
    slug: "iv-crush-and-earnings",
    title: "IV Crush & Earnings",
    order: 2,
    content: `## IV Crush & Earnings

**IV crush** is the rapid decline in implied volatility that occurs after a known event — most commonly an **earnings announcement**. Before earnings, IV rises because the market is pricing in the uncertainty of the upcoming report. Nobody knows if the company will beat or miss expectations, so options become more expensive to reflect the anticipated move. Once the news is out and the uncertainty is resolved, IV collapses, often in a matter of minutes.

The magnitude of IV crush can be dramatic. A stock might have an IV of 40% normally, see it spike to 80% the day before earnings, and then drop back to 35% after the announcement. This means the extrinsic value of options can be cut in half or more overnight, regardless of which direction the stock moves. It's one of the most common ways new traders lose money — they buy options before earnings expecting a big move, the stock moves 5% in their direction, and they still lose money because IV crush destroyed the option's extrinsic value.

Understanding **expected moves** is key to navigating earnings. The options market implies an expected move based on the at-the-money straddle price. If the ATM straddle (buying both the call and put at the same strike) costs $10, the market expects roughly a $10 move in either direction. For the straddle buyer to profit, the stock needs to move *more* than $10. Historically, stocks move less than the implied amount about 70% of the time, which is why selling premium around earnings can be statistically favorable.

Experienced traders use several approaches to trade earnings while managing IV crush risk. **Selling strategies** like short strangles or iron condors explicitly profit from IV crush — you sell expensive options before the event and buy them back cheaply after IV collapses. **Calendar spreads** can also work: sell a short-dated option (which has the most IV crush) and buy a longer-dated option (which retains more IV), profiting from the differential collapse.

If you do want to go long through earnings, consider **debit spreads** rather than naked long options. A bull call spread (buy a call, sell a higher-strike call) partially offsets the IV crush on your long leg with the IV crush on your short leg. Your net vega exposure is lower, so the damage from IV collapse is muted. You give up some upside potential, but you dramatically reduce the risk of being right on direction and still losing money.`,
    quizData: [
      {
        question: "What causes IV crush?",
        options: [
          "A stock price dropping sharply after bad news",
          "The resolution of uncertainty after a known event like earnings",
          "An increase in the risk-free interest rate",
          "Options expiring worthless",
        ],
        correctIndex: 1,
        explanation:
          "IV crush occurs when the uncertainty surrounding a known event (earnings, FDA decision, etc.) is resolved. Once the event passes and the outcome is known, the 'uncertainty premium' in IV collapses rapidly regardless of the direction of the stock move.",
      },
      {
        question:
          "The ATM straddle for a stock is priced at $8 before earnings. What does this imply?",
        options: [
          "The stock will definitely move $8 after earnings",
          "The market expects roughly an $8 move in either direction",
          "IV will increase by 8% after earnings",
          "The earnings will be reported in 8 days",
        ],
        correctIndex: 1,
        explanation:
          "The ATM straddle price represents the market's expected move. An $8 straddle implies the market expects approximately an $8 move in either direction. For the straddle buyer to profit, the actual move must exceed this expected amount.",
      },
      {
        question:
          "Which strategy can help a bullish trader reduce IV crush risk through earnings?",
        options: [
          "Buying a naked long call",
          "Buying a bull call debit spread",
          "Buying a long straddle",
          "Buying multiple ATM calls",
        ],
        correctIndex: 1,
        explanation:
          "A bull call debit spread (long call + short higher call) reduces net vega exposure. The IV crush on the short call partially offsets the IV crush on the long call, reducing the negative impact compared to holding a naked long call.",
      },
    ],
  },
  {
    moduleSlug: "implied-volatility",
    slug: "the-volatility-smile",
    title: "The Volatility Smile",
    order: 3,
    content: `## The Volatility Smile

In theory, all options on the same underlying with the same expiration should have the same implied volatility. In practice, they don't — and the pattern they form is called the **volatility smile** or **volatility skew**. When you plot IV across different strike prices (with expiration held constant), you'll see that OTM puts and OTM calls often have higher IV than ATM options, creating a U-shaped "smile."

**Volatility skew** (sometimes called the "smirk") is the more common pattern in equity markets. OTM puts consistently trade at a higher IV than ATM or OTM calls. This means downside protection is relatively expensive. Why? After the 1987 stock market crash (Black Monday), traders realized that extreme downside moves happen more often than standard models predict. The demand for protective puts (portfolio insurance) permanently shifted the supply-demand balance, making OTM puts more expensive and creating a persistent downside skew.

The **term structure of volatility** adds another dimension. Instead of looking across strikes at a single expiration, it looks at ATM IV across different expirations. Normally, longer-dated options have higher IV because more time means more uncertainty. But before a specific event (like earnings on a certain date), the expiration nearest to that event will have elevated IV, creating a "bump" in the term structure. After the event, that bump disappears — this is the term-structure version of IV crush.

Traders exploit skew and term structure in several ways. **Risk reversals** (selling an OTM put and buying an OTM call, or vice versa) directly trade the difference in IV between puts and calls. **Calendar spreads** exploit differences in IV across expirations. If front-month IV is abnormally high relative to back-month IV (common before earnings), a trader might sell the expensive front-month option and buy the cheaper back-month option.

Understanding the volatility surface (skew across strikes + term structure across expirations) gives you a significant edge. When you see that 10-delta puts have an IV of 50% while 10-delta calls have an IV of 30%, the market is pricing in significantly more downside risk. This isn't just academic — it directly affects which strategies are cheap or expensive. Selling overpriced skew (e.g., selling expensive puts) and buying underpriced options is a core strategy for many professional volatility traders.`,
    quizData: [
      {
        question:
          "Why do OTM puts typically have higher implied volatility than ATM options in equity markets?",
        options: [
          "OTM puts are always more profitable than ATM options",
          "Demand for downside protection drives up OTM put prices and IV after events like the 1987 crash",
          "ATM options have no extrinsic value",
          "OTM puts have higher delta than ATM options",
        ],
        correctIndex: 1,
        explanation:
          "The volatility skew in equities exists because of persistent demand for downside protection (OTM puts). After the 1987 crash, the market permanently priced in the risk of extreme downside moves, making OTM puts relatively expensive (higher IV).",
      },
      {
        question: "What is the volatility term structure?",
        options: [
          "The difference in IV between calls and puts at the same strike",
          "The pattern of IV across different strike prices at one expiration",
          "The pattern of ATM implied volatility across different expiration dates",
          "The historical average of IV over the past year",
        ],
        correctIndex: 2,
        explanation:
          "Volatility term structure shows how ATM implied volatility varies across different expiration dates. It reveals how the market prices uncertainty over different time horizons and can show 'bumps' around expected events.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Module: strategies
  // ─────────────────────────────────────────────
  {
    moduleSlug: "strategies",
    slug: "vertical-spreads",
    title: "Vertical Spreads",
    order: 1,
    content: `## Vertical Spreads

A **vertical spread** involves buying and selling options of the same type (both calls or both puts), same expiration, but different strike prices. They're called "vertical" because the strikes are arranged vertically on an option chain. Verticals are the bread-and-butter strategy for most options traders because they offer **defined risk, defined reward**, and flexibility to express both bullish and bearish views.

A **bull call spread** (or call debit spread) involves buying a lower-strike call and selling a higher-strike call. You pay a net debit. For example: buy the $100 call for $5.00 and sell the $105 call for $2.50, paying a net debit of $2.50 ($250 per spread). Your max profit is the width of the strikes minus the debit: $5.00 - $2.50 = $2.50 ($250). Max loss is the debit paid: $2.50 ($250). You profit if the stock is above $102.50 (lower strike + debit) at expiration.

A **bear put spread** (or put debit spread) is the bearish equivalent: buy a higher-strike put and sell a lower-strike put. A **bull put spread** (put credit spread) sells a higher-strike put and buys a lower-strike put, collecting a credit. A **bear call spread** (call credit spread) sells a lower-strike call and buys a higher-strike call, also collecting a credit. Credit spreads profit when the options expire worthless (the stock stays away from the sold strike).

The choice between debit and credit spreads often depends on **IV environment and probability**. Debit spreads work best when IV is low (options are cheap to buy) and you have a directional conviction. Credit spreads work best when IV is high (you collect more premium) and you're playing a probability game — you want the stock to stay in a range. For example, selling a $90/$85 bull put spread on a $100 stock means you profit as long as the stock stays above $90 by expiration.

Risk management is straightforward with verticals. Your maximum loss is always defined: for debit spreads it's the premium paid, for credit spreads it's the width of the strikes minus the credit received. Many traders size their positions so that the max loss on any single trade is 1-5% of their total portfolio. Verticals also have lower margin requirements than naked options, making them more capital-efficient and accessible.`,
    quizData: [
      {
        question:
          "You buy a $50/$55 bull call spread for a net debit of $2.00. What is your maximum profit?",
        options: ["$2.00", "$3.00", "$5.00", "$55.00"],
        correctIndex: 1,
        explanation:
          "Max profit on a debit spread = Width of strikes - Net debit = ($55 - $50) - $2.00 = $5.00 - $2.00 = $3.00 ($300 per contract). This occurs when the stock is at or above $55 at expiration.",
      },
      {
        question:
          "You sell a $90/$85 bull put spread for a credit of $1.50. What is your maximum loss?",
        options: ["$1.50", "$3.50", "$5.00", "$85.00"],
        correctIndex: 1,
        explanation:
          "Max loss on a credit spread = Width of strikes - Credit received = ($90 - $85) - $1.50 = $5.00 - $1.50 = $3.50 ($350 per contract). This occurs if the stock falls below $85 at expiration.",
      },
      {
        question:
          "When is a credit spread strategy generally most advantageous?",
        options: [
          "When IV is low and you expect a big directional move",
          "When IV is high and you expect the stock to stay in a range",
          "When you want unlimited profit potential",
          "When the stock has zero implied volatility",
        ],
        correctIndex: 1,
        explanation:
          "Credit spreads benefit from collecting premium and from IV declining. High IV environments offer richer premiums. The strategy profits when the stock stays away from the sold strike, making it ideal for range-bound expectations.",
      },
    ],
  },
  {
    moduleSlug: "strategies",
    slug: "straddles-and-strangles",
    title: "Straddles & Strangles",
    order: 2,
    content: `## Straddles & Strangles

**Straddles** and **strangles** are **non-directional** strategies — you don't need to know which way the stock will move, just that it will move (or won't move). This makes them particularly popular around binary events like earnings, FDA decisions, or major economic reports.

A **long straddle** involves buying both an ATM call and an ATM put at the same strike and expiration. For example, with a stock at $100, you buy the $100 call for $4 and the $100 put for $3.50, paying a total of $7.50. Your breakeven points are $107.50 on the upside and $92.50 on the downside — the stock needs to move more than $7.50 in either direction to profit. Max loss is the total premium paid ($7.50) if the stock closes exactly at $100 at expiration.

A **long strangle** is similar but uses OTM options: buy an OTM call and an OTM put. For example, buy the $105 call for $2 and the $95 put for $1.80, paying $3.80 total. Strangles are cheaper than straddles, but the stock needs to move further to profit (below $91.20 or above $108.80). Strangles are popular among traders who expect a very large move but want to reduce the upfront cost.

**Short straddles** and **short strangles** are the opposite: you *sell* both options, collecting premium and hoping the stock stays relatively still. A short strangle is one of the most popular premium-selling strategies — you sell an OTM call and an OTM put, profiting if the stock stays between the two strikes. For instance, sell the $105 call for $2 and the $95 put for $1.80, collecting $3.80. You profit as long as the stock stays between $91.20 and $108.80. However, your risk is theoretically unlimited on the call side and substantial on the put side.

The decision to buy or sell straddles/strangles often comes down to **implied volatility versus expected realized volatility**. If you believe the stock will move more than the options market implies (IV is too low), buy the straddle or strangle. If you believe the stock will move less than implied (IV is too high), sell. This is why these strategies are sometimes called "volatility trades" — you're betting on the magnitude of movement, not the direction.`,
    quizData: [
      {
        question:
          "You buy a long straddle at the $50 strike for a total premium of $6. What are your breakeven points at expiration?",
        options: [
          "$44 and $56",
          "$47 and $53",
          "$50 and $56",
          "$44 and $50",
        ],
        correctIndex: 0,
        explanation:
          "Long straddle breakevens: Strike +/- Total premium paid. Lower breakeven = $50 - $6 = $44. Upper breakeven = $50 + $6 = $56. The stock needs to be below $44 or above $56 at expiration to profit.",
      },
      {
        question:
          "What is the main advantage of a long strangle over a long straddle?",
        options: [
          "A strangle has a higher probability of profit",
          "A strangle costs less upfront (lower premium)",
          "A strangle eliminates all risk",
          "A strangle profits even if the stock doesn't move",
        ],
        correctIndex: 1,
        explanation:
          "Strangles use OTM options, which are cheaper than ATM options, so the total premium is lower. The trade-off is that the stock needs to make a larger move to reach profitability since both breakeven points are further from the current price.",
      },
      {
        question:
          "A trader believes a stock will barely move over the next month despite the market pricing in high volatility. Which strategy best captures this view?",
        options: [
          "Buy a long straddle",
          "Buy a long strangle",
          "Sell a short strangle",
          "Buy a deep ITM call",
        ],
        correctIndex: 2,
        explanation:
          "If you believe the stock will move LESS than implied (IV is overpriced), selling premium is the play. A short strangle collects premium from both an OTM call and put, profiting if the stock stays within the sold strikes. The high IV means you collect more premium for the position.",
      },
    ],
  },
  {
    moduleSlug: "strategies",
    slug: "protective-strategies",
    title: "Protective Strategies",
    order: 3,
    content: `## Protective Strategies

Not all options strategies are about speculation — some of the most valuable uses of options are **protective strategies** designed to manage risk in an existing stock portfolio. These strategies act like insurance policies: you pay a premium for protection against adverse moves.

A **protective put** (also called a "married put") involves buying a put option on a stock you already own. If you hold 100 shares of a stock at $100 and buy a $95 put for $2, you've guaranteed that you can sell your shares at $95 no matter how far the stock falls. Your maximum loss is now capped at $7 per share ($5 from the stock drop to $95 + $2 for the put premium). The downside is that the put premium ($200 per contract) reduces your overall return. Think of it like car insurance — you hope you never need it, but you're glad you have it when things go wrong.

A **covered call** is a popular income strategy. If you own 100 shares, you can sell a call option against them. For instance, holding 100 shares at $100 and selling a $110 call for $3 means you collect $300 in premium. If the stock stays below $110, you keep the premium and your shares. If the stock rises above $110, your shares get called away at $110 — you miss out on gains above $110, but you still profit ($10 stock appreciation + $3 premium = $13 per share). The risk is that the stock falls, but the premium provides a $3 cushion ($300 per contract).

A **collar** combines the protective put and covered call. You buy a put below the current price and sell a call above it, often for a net-zero or near-zero cost. For example, with stock at $100: buy the $95 put for $2 and sell the $110 call for $2. The put purchase is funded by the call sale. You're now protected below $95 but give up gains above $110. Collars are extremely popular among executives and large shareholders who want to protect concentrated stock positions without triggering a taxable sale.

These strategies involve trade-offs that every investor should understand. Protective puts provide pure downside protection but cost money, dragging on returns in bullish markets. Covered calls generate income but cap your upside, causing you to miss out during strong rallies. Collars offer cost-effective protection but limit both your risk and your reward. The right choice depends on your outlook, risk tolerance, and investment horizon. Many portfolio managers use a combination, adjusting their protective positions based on market conditions and volatility levels.`,
    quizData: [
      {
        question:
          "You own 100 shares at $100 and buy a $90 put for $3. What is your maximum loss per share?",
        options: ["$3", "$10", "$13", "$100"],
        correctIndex: 2,
        explanation:
          "Maximum loss = (Stock price - Put strike) + Put premium = ($100 - $90) + $3 = $13 per share. The put guarantees you can sell at $90, but you also paid $3 for the protection.",
      },
      {
        question:
          "You hold 100 shares at $50 and sell a $55 covered call for $2. The stock rises to $60 at expiration. What is your total profit per share?",
        options: ["$5", "$7", "$10", "$12"],
        correctIndex: 1,
        explanation:
          "Your shares get called away at $55 (the strike), so your stock profit is $5. Plus you keep the $2 premium. Total = $5 + $2 = $7 per share. You miss the additional $5 of upside from $55 to $60.",
      },
      {
        question:
          "What makes a collar strategy attractive for protecting a large stock position?",
        options: [
          "It provides unlimited upside potential",
          "It generates maximum income from dividends",
          "The cost of the protective put is offset by selling a call, making it low or zero cost",
          "It guarantees a profit regardless of stock movement",
        ],
        correctIndex: 2,
        explanation:
          "A collar's key attraction is that the income from selling the call offsets (partially or fully) the cost of buying the protective put. This creates a 'free' or low-cost floor on your position, at the expense of capping your upside.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Module: market-sentiment
  // ─────────────────────────────────────────────
  {
    moduleSlug: "market-sentiment",
    slug: "put-call-ratio",
    title: "Put/Call Ratio",
    order: 1,
    content: `## Put/Call Ratio

The **Put/Call Ratio (PCR)** is one of the most widely followed sentiment indicators in the options market. It's calculated simply: divide the total volume (or open interest) of put options by the total volume of call options. A PCR of 1.0 means equal put and call volume. Above 1.0 indicates more puts are being traded (bearish sentiment), and below 1.0 indicates more calls (bullish sentiment).

The **CBOE Total Put/Call Ratio** averages around 0.85-0.95 in normal markets. When it spikes above 1.2-1.3, it signals extreme bearish sentiment — traders are aggressively buying puts for protection or speculation. Conversely, when it drops below 0.6-0.7, it signals extreme bullish complacency — traders are piling into calls and ignoring downside risk.

Here's where it gets interesting: the PCR is often used as a **contrarian indicator**. When everyone is buying puts (high PCR), the crowd is fearful — and extreme fear often marks market bottoms. When everyone is buying calls (low PCR), the crowd is greedy — and extreme greed often marks market tops. The logic is that when sentiment reaches an extreme, most of the buying or selling pressure has already been exhausted, making a reversal more likely.

However, context matters. A rising PCR during a healthy uptrend might simply reflect institutional hedging (buying puts to protect long stock positions), not genuine bearish sentiment. Conversely, high call volume might be driven by covered call selling (a neutral-to-mildly-bullish strategy), not speculative bullishness. To use the PCR effectively, combine it with other indicators like the VIX, market breadth, and price action. The PCR is most valuable at extremes and when it confirms other signals.

Many traders look at the **equity-only** put/call ratio (excluding index and ETF options) for a purer gauge of retail sentiment. Index options are dominated by institutional hedging flows, which can distort the signal. The equity-only PCR more directly reflects the speculative activity of individual traders, making it a better contrarian sentiment tool. Watch for sustained readings above 1.0 (bearish extreme, potentially bullish contrarian signal) or below 0.5 (bullish extreme, potentially bearish contrarian signal).`,
    quizData: [
      {
        question:
          "The Put/Call Ratio spikes to 1.35. From a contrarian perspective, what might this signal?",
        options: [
          "The market will definitely continue falling",
          "Extreme bearish sentiment that may indicate a potential market bottom",
          "It's time to buy puts because the trend will continue",
          "Options trading should be avoided entirely",
        ],
        correctIndex: 1,
        explanation:
          "As a contrarian indicator, an extremely high PCR (1.35) suggests the crowd is very bearish. Contrarian logic says that when fear is at an extreme, most of the selling may be exhausted, and a market bottom or reversal could be near. This is a probabilistic signal, not a guarantee.",
      },
      {
        question:
          "Why is the equity-only Put/Call Ratio often preferred over the total ratio for gauging retail sentiment?",
        options: [
          "Equity options are more expensive, making the signal more reliable",
          "Index options are dominated by institutional hedging, which can distort the sentiment signal",
          "Equity-only ratios are always higher than total ratios",
          "The total ratio is no longer calculated by the CBOE",
        ],
        correctIndex: 1,
        explanation:
          "Index and ETF options markets are heavily influenced by institutional hedging activity (portfolio insurance, delta hedging). These flows don't reflect speculative sentiment. The equity-only PCR isolates individual stock options, providing a purer measure of retail trader sentiment.",
      },
      {
        question:
          "The Put/Call Ratio drops to 0.55. What does this typically indicate?",
        options: [
          "Extreme bearish sentiment among traders",
          "Balanced sentiment between bulls and bears",
          "Extreme bullish sentiment and possible complacency",
          "Low overall options trading volume",
        ],
        correctIndex: 2,
        explanation:
          "A PCR of 0.55 means far more calls than puts are being traded, indicating strong bullish sentiment. From a contrarian perspective, this level of bullish complacency can be a warning sign that the market may be overextended and due for a pullback.",
      },
    ],
  },
  {
    moduleSlug: "market-sentiment",
    slug: "reading-news-and-catalysts",
    title: "Reading News & Catalysts",
    order: 2,
    content: `## Reading News & Catalysts

Options markets are uniquely sensitive to **catalysts** — scheduled events and unexpected news that can move stock prices. Understanding how different types of events affect options is essential for timing trades and managing risk. The key principle: options price in *expected* events before they happen, and the resolution of uncertainty (not the event itself) drives the biggest changes.

**Earnings announcements** are the most common catalyst. As we've discussed, IV rises into earnings and collapses after. But the options market also reveals the expected move magnitude. If a stock's weekly ATM straddle costs $8, the market expects roughly an $8 move. Over time, you can track whether a stock tends to move more or less than the implied amount — this "earnings straddle vs. actual move" history is gold for earnings traders. Stocks that consistently move more than implied are good candidates for long straddles; those that consistently move less favor selling premium.

**Macroeconomic events** (Fed meetings, jobs reports, CPI data, GDP releases) affect broad market sentiment and volatility. Before major Fed announcements, the VIX often rises and SPX options become more expensive. Individual stocks are affected indirectly — high-beta growth stocks are more sensitive to rate decisions than defensive dividend stocks. Savvy traders adjust their positions before these events: reducing size, adding hedges, or avoiding short premium positions that could be hurt by a volatility spike.

**Sector-specific catalysts** like FDA drug approvals, product launches, and regulatory decisions can cause extreme moves in individual stocks. A binary FDA decision might result in a 50% move up or down — this is reflected in enormously elevated IV for options expiring after the event. In these situations, the risk/reward of different strategies changes dramatically. Buying options seems attractive (big move coming!), but the elevated IV means you're paying a massive premium. Selling options collects a lot of premium but carries catastrophic risk if the move is larger than expected.

The most sophisticated approach is to **combine sentiment analysis with options market data**. When news breaks, watch how options markets react: Is IV rising or falling? Are traders buying calls or puts? Is the options volume concentrated in specific strikes? These "order flow" signals can reveal institutional positioning before it shows up in the stock price. For example, a sudden spike in call volume at a specific strike before any news breaks might indicate that informed traders are positioning ahead of a positive catalyst. While this isn't foolproof, options market activity often leads stock price movement, making it a valuable signal in your trading toolkit.`,
    quizData: [
      {
        question:
          "A stock consistently moves 8% after earnings, but the options market only implies a 5% expected move. What strategy might a trader consider?",
        options: [
          "Sell an iron condor to collect premium",
          "Buy a straddle or strangle to capture the larger-than-expected move",
          "Avoid trading this stock around earnings entirely",
          "Sell covered calls the day before earnings",
        ],
        correctIndex: 1,
        explanation:
          "If a stock historically moves MORE than the implied expected move, the options market is underpricing the event. Buying a straddle or strangle gives you exposure to a large move in either direction, and the historical pattern suggests the move will exceed the cost of the position.",
      },
      {
        question:
          "Why is an FDA binary event particularly challenging for option buyers despite the potential for a huge move?",
        options: [
          "FDA events never cause large price movements",
          "Options cannot be traded on biotech stocks",
          "IV is extremely elevated before the event, making options very expensive and requiring an even larger move to profit",
          "Binary events always result in stocks going to zero",
        ],
        correctIndex: 2,
        explanation:
          "Before binary events like FDA decisions, IV spikes to extreme levels, making options very expensive. Even though the stock may move 30-50%, if the options were priced for a 40% implied move, a 30% actual move might not be enough for a long straddle to profit. The elevated IV sets a high bar for buyers.",
      },
      {
        question:
          "A sudden surge of call buying at a specific strike appears before any public news. What might this indicate?",
        options: [
          "The options market is broken and the trade is invalid",
          "Informed traders may be positioning ahead of a potential positive catalyst",
          "The stock price will definitely decrease",
          "Market makers are closing their positions for the day",
        ],
        correctIndex: 1,
        explanation:
          "Unusual options activity — particularly concentrated volume at specific strikes — can be a signal that informed traders are positioning ahead of catalysts. While not a guarantee, options order flow often leads stock price movement and is widely monitored as an informational signal.",
      },
    ],
  },
];
