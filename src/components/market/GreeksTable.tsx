"use client";

import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface Contract {
  type: string;
  strike: number;
  expiration: string;
  premium: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  iv: number;
}

export default function GreeksTable({ contracts }: { contracts: Contract[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          <h2 className="text-lg font-semibold">Options Chain Snapshot</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 pr-4 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Type</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Strike</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Exp</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Premium</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Delta</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Gamma</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Theta</th>
                <th className="text-right py-3 px-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">Vega</th>
                <th className="text-right py-3 pl-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-50/80">IV</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c, i) => {
                const ivPct = c.iv * 100;
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 hover:bg-blue-50/40 transition-colors ${
                      i % 2 === 1 ? "bg-gray-50/40" : ""
                    }`}
                  >
                    <td className="py-2.5 pr-4">
                      <Badge variant={c.type === "call" ? "success" : "danger"}>
                        {c.type.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="text-right py-2.5 px-2 font-mono">${c.strike}</td>
                    <td className="text-right py-2.5 px-2 text-gray-500">
                      {new Date(c.expiration).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="text-right py-2.5 px-2 font-mono">${c.premium.toFixed(2)}</td>
                    <td className="text-right py-2.5 px-2 font-mono">{c.delta.toFixed(2)}</td>
                    <td className="text-right py-2.5 px-2 font-mono">{c.gamma.toFixed(3)}</td>
                    <td className="text-right py-2.5 px-2 font-mono text-red-600">{c.theta.toFixed(2)}</td>
                    <td className="text-right py-2.5 px-2 font-mono">{c.vega.toFixed(2)}</td>
                    <td className={`text-right py-2.5 pl-2 font-mono ${ivPct > 60 ? "text-orange-600 font-semibold" : ""}`}>
                      {ivPct.toFixed(0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
