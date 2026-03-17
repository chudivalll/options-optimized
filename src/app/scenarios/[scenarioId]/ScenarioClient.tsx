"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import {
  formatPercent,
  getCategoryLabel,
  getStrategyLabel,
  getDirectionLabel,
  getTimeframeLabel,
} from "@/lib/utils";
import MarketDataCard, { DataItem } from "@/components/market/MarketDataCard";
import GreeksTable from "@/components/market/GreeksTable";
import VolatilityCard from "@/components/market/VolatilityCard";
import SentimentCard from "@/components/market/SentimentCard";

interface ScenarioData {
  id: string;
  title: string;
  company: string;
  companyName: string;
  eventDate: string;
  difficulty: string;
  category: string;
  setupNarrative: string;
  revealNarrative: string;
  marketData: {
    stockPrice: number;
    priceChange30d: number;
    marketCap: string;
    sector: string;
    sectorPerformance: number;
    spyPerformance: number;
  };
  greeksData: {
    contracts: {
      type: string;
      strike: number;
      expiration: string;
      premium: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      iv: number;
    }[];
  };
  volatilityData: {
    iv30: number;
    iv60: number;
    hv30: number;
    ivRank: number;
    ivPercentile: number;
  };
  sentimentData: {
    headlines: string[];
    analystRating: string;
    putCallRatio: number;
  };
  outcomeData: {
    actualDirection: string;
    priceMoves: Record<string, number>;
    optimalStrategies: string[];
    optimalTimeframe: string;
    bestContractReturn: number;
    explanation: string;
  };
}

interface PredictionData {
  id: string;
  direction: string;
  strategy: string;
  timeframe: string;
  confidence: number;
  reasoning: string | null;
  score: number;
  maxScore: number;
}

interface ScoreBreakdown {
  direction: number;
  strategy: number;
  timeframe: number;
  confidence: number;
  total: number;
  maxScore: number;
}

type Step = "setup" | "predict" | "reveal";

export default function ScenarioClient({
  scenario,
  existingPrediction,
  isLoggedIn,
}: {
  scenario: ScenarioData;
  existingPrediction: PredictionData | null;
  isLoggedIn: boolean;
}) {
  const [step, setStep] = useState<Step>(
    existingPrediction ? "reveal" : "setup"
  );
  const [prediction, setPrediction] = useState<PredictionData | null>(
    existingPrediction
  );
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(
    null
  );

  // Prediction form state
  const [direction, setDirection] = useState("bullish");
  const [strategy, setStrategy] = useState("buy_calls");
  const [timeframe, setTimeframe] = useState("1_month");
  const [confidence, setConfidence] = useState(3);
  const [reasoning, setReasoning] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmitPrediction() {
    if (!isLoggedIn) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: scenario.id,
          direction,
          strategy,
          timeframe,
          confidence,
          reasoning: reasoning || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPrediction(data.prediction);
        setScoreBreakdown(data.scoreBreakdown);
        setStep("reveal");
      }
    } catch {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  }

  const steps: Step[] = ["setup", "predict", "reveal"];
  const currentIdx = steps.indexOf(step);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/scenarios"
        className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; Back to Scenarios
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl font-bold text-gray-900">
            {scenario.company}
          </span>
          <span className="text-lg text-gray-500">{scenario.companyName}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {scenario.title}
        </h1>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              scenario.difficulty === "beginner"
                ? "success"
                : scenario.difficulty === "intermediate"
                ? "warning"
                : "danger"
            }
          >
            {scenario.difficulty}
          </Badge>
          <Badge variant="info">{getCategoryLabel(scenario.category)}</Badge>
          <span className="text-sm text-gray-500">
            {new Date(scenario.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, idx) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step === s
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  : idx < currentIdx
                  ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {idx < currentIdx ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                idx + 1
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                step === s ? "text-blue-700" : "text-gray-500"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
            {idx < 2 && (
              <div className={`w-8 h-0.5 rounded-full ${idx < currentIdx ? "bg-green-400" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Setup */}
      {step === "setup" && (
        <div className="space-y-6 animate-fade-in">
          {/* Narrative */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">The Setup</h2>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <ReactMarkdown>{scenario.setupNarrative}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Market Data */}
          <MarketDataCard data={scenario.marketData} />

          {/* Options Chain */}
          <GreeksTable contracts={scenario.greeksData.contracts} />

          {/* Volatility Data */}
          <VolatilityCard data={scenario.volatilityData} />

          {/* Sentiment */}
          <SentimentCard data={scenario.sentimentData} />

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={() => {
                if (!isLoggedIn) {
                  window.location.href = "/login";
                  return;
                }
                setStep("predict");
              }}
            >
              Make Your Prediction &rarr;
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Predict */}
      {step === "predict" && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Your Prediction</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Direction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Market Direction
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["bullish", "bearish", "neutral"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDirection(d)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        direction === d
                          ? d === "bullish"
                            ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                            : d === "bearish"
                            ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                            : "border-gray-500 bg-gray-50 text-gray-700 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="mb-1">
                        {d === "bullish" ? (
                          <svg className="w-6 h-6 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        ) : d === "bearish" ? (
                          <svg className="w-6 h-6 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        )}
                      </div>
                      <div className="text-sm font-medium capitalize">{d}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strategy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options Strategy
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "buy_calls",
                    "buy_puts",
                    "sell_calls",
                    "sell_puts",
                    "bull_spread",
                    "bear_spread",
                    "straddle",
                    "strangle",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStrategy(s)}
                      className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        strategy === s
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {getStrategyLabel(s)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["1_week", "1_month", "3_months"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        timeframe === t
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {getTimeframeLabel(t)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Level: {confidence}/5
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Reasoning */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reasoning (optional)
                </label>
                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors"
                  placeholder="What's your thesis? What data supports your prediction?"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("setup")}>
              &larr; Review Data
            </Button>
            <Button
              size="lg"
              onClick={handleSubmitPrediction}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Prediction"}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Reveal */}
      {step === "reveal" && prediction && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Score */}
          <Card>
            <CardContent className="text-center py-8">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `conic-gradient(${
                    prediction.score >= 80 ? "#22c55e" : prediction.score >= 60 ? "#3b82f6" : prediction.score >= 40 ? "#eab308" : "#ef4444"
                  } ${(prediction.score / prediction.maxScore) * 360}deg, #e5e7eb ${(prediction.score / prediction.maxScore) * 360}deg)`,
                }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 font-mono">
                    {prediction.score}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                out of {prediction.maxScore} points
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {prediction.score >= 80
                  ? "Excellent call!"
                  : prediction.score >= 60
                  ? "Good analysis!"
                  : prediction.score >= 40
                  ? "Decent attempt"
                  : "Keep learning!"}
              </p>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          {scoreBreakdown && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Score Breakdown</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ScoreRow label="Direction" score={scoreBreakdown.direction} max={40} />
                  <ScoreRow label="Strategy" score={scoreBreakdown.strategy} max={35} />
                  <ScoreRow label="Timeframe" score={scoreBreakdown.timeframe} max={15} />
                  <ScoreRow
                    label="Confidence Modifier"
                    score={scoreBreakdown.confidence}
                    max={10}
                    showSign
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Your Prediction vs Actual */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Your Prediction vs Reality</h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    YOUR PREDICTION
                  </h3>
                  <div className="space-y-2">
                    <DataItem label="Direction" value={getDirectionLabel(prediction.direction)} />
                    <DataItem label="Strategy" value={getStrategyLabel(prediction.strategy)} />
                    <DataItem label="Timeframe" value={getTimeframeLabel(prediction.timeframe)} />
                    <DataItem label="Confidence" value={`${prediction.confidence}/5`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    WHAT HAPPENED
                  </h3>
                  <div className="space-y-2">
                    <DataItem
                      label="Actual Direction"
                      value={getDirectionLabel(scenario.outcomeData.actualDirection)}
                    />
                    <DataItem
                      label="Optimal Strategies"
                      value={scenario.outcomeData.optimalStrategies
                        .map(getStrategyLabel)
                        .join(", ")}
                    />
                    <DataItem
                      label="Optimal Timeframe"
                      value={getTimeframeLabel(scenario.outcomeData.optimalTimeframe)}
                    />
                    <DataItem
                      label="Best Return"
                      value={`${scenario.outcomeData.bestContractReturn}%`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Moves */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Price Movement</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(scenario.outcomeData.priceMoves).map(([tf, move]) => (
                  <div key={tf} className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{getTimeframeLabel(tf)}</p>
                    <p
                      className={`text-2xl font-bold font-mono ${
                        (move as number) >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatPercent(move as number)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reveal Narrative */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">What Actually Happened</h2>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none mb-4">
                <ReactMarkdown>{scenario.revealNarrative}</ReactMarkdown>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Expert Analysis</h3>
                <p className="text-sm text-blue-800">
                  {scenario.outcomeData.explanation}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link href="/scenarios">
              <Button size="lg">Try Another Scenario</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreRow({
  label,
  score,
  max,
  showSign,
}: {
  label: string;
  score: number;
  max: number;
  showSign?: boolean;
}) {
  const pct = Math.max(0, (score / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-40">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${
            score >= 0
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : "bg-gradient-to-r from-red-400 to-red-500"
          }`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <span className="text-sm font-medium font-mono text-gray-900 w-16 text-right">
        {showSign && score > 0 ? "+" : ""}
        {score}/{max}
      </span>
    </div>
  );
}
