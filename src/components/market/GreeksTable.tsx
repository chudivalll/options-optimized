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
        <h2 className="text-lg font-semibold">Options Chain Snapshot</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-600 font-medium">Type</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Strike</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Exp</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Premium</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Delta</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Gamma</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Theta</th>
                <th className="text-right py-2 px-2 text-gray-600 font-medium">Vega</th>
                <th className="text-right py-2 pl-2 text-gray-600 font-medium">IV</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 pr-4">
                    <Badge variant={c.type === "call" ? "success" : "danger"}>
                      {c.type.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="text-right py-2 px-2">${c.strike}</td>
                  <td className="text-right py-2 px-2 text-gray-500">
                    {new Date(c.expiration).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="text-right py-2 px-2">${c.premium.toFixed(2)}</td>
                  <td className="text-right py-2 px-2">{c.delta.toFixed(2)}</td>
                  <td className="text-right py-2 px-2">{c.gamma.toFixed(3)}</td>
                  <td className="text-right py-2 px-2">{c.theta.toFixed(2)}</td>
                  <td className="text-right py-2 px-2">{c.vega.toFixed(2)}</td>
                  <td className="text-right py-2 pl-2">{(c.iv * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
