"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
  lessonId: string;
  onComplete: (score: number) => void;
}

export default function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selected === q?.correctIndex;

  function handleSelect(index: number) {
    if (showResult) return;
    setSelected(index);
  }

  function handleCheck() {
    if (selected === null) return;
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalCorrect = correctCount + (isCorrect ? 0 : 0); // already counted
      const score = Math.round((finalCorrect / questions.length) * 100);
      setQuizDone(true);
      onComplete(score);
    }
  }

  if (quizDone) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            score >= 70 ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <span
            className={`text-2xl font-bold ${
              score >= 70 ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {score}%
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {score >= 70 ? "Great job!" : "Keep learning!"}
        </h3>
        <p className="text-gray-600">
          You got {correctCount} out of {questions.length} questions correct.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Quiz</h3>
        <span className="text-sm text-gray-500">
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>

      <p className="text-gray-800 mb-4 font-medium">{q.question}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((option, idx) => {
          let optionClass =
            "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
          if (showResult) {
            if (idx === q.correctIndex) {
              optionClass = "border-green-500 bg-green-50";
            } else if (idx === selected) {
              optionClass = "border-red-500 bg-red-50";
            } else {
              optionClass = "border-gray-200 opacity-50";
            }
          } else if (idx === selected) {
            optionClass = "border-blue-500 bg-blue-50";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${optionClass}`}
            >
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div
          className={`p-3 rounded-lg mb-4 text-sm ${
            isCorrect
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <p className="font-medium mb-1">
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p>{q.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!showResult ? (
          <Button onClick={handleCheck} disabled={selected === null}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQ + 1 < questions.length ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}
