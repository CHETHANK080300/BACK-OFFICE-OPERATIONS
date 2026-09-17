import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PlayCircle,
  Calculator,
  Info,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { SimulationResult } from "@/lib/cram-types";
import {
  mockGeographyRisk,
  mockProductRisk,
  mockCustomerParameters,
} from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/simulator")({
  component: RiskSimulator,
});

function RiskSimulator() {
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      setResult({
        overallScore: 78,
        finalRating: "High",
        factors: [
          {
            name: "Customer Type Risk",
            score: 85,
            weight: 35,
            weightedScore: 29.75,
          },
          {
            name: "Geography Risk",
            score: 42,
            weight: 25,
            weightedScore: 10.5,
          },
          { name: "Product Risk", score: 90, weight: 30, weightedScore: 27 },
          { name: "Channel Risk", score: 50, weight: 10, weightedScore: 5 },
        ],
        overridesApplied: [
          "Foreign PEP detected. Risk Rating overridden to High Risk.",
        ],
      });
      setCalculating(false);
    }, 1200);
  };

  return (
    <DashboardLayout
      title="Risk Simulator"
      subtitle="Simulate and test customer risk scores before production deployment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel
          title="Simulation Inputs"
          subtitle="Select customer profile details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Residency Status</Label>
                <Select defaultValue="resident">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resident">Resident</SelectItem>
                    <SelectItem value="non-resident">Non-Resident</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Employment Status</Label>
                <Select defaultValue="employed">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>PEP Status</Label>
                <Select defaultValue="foreign-pep">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="domestic-pep">Domestic PEP</SelectItem>
                    <SelectItem value="foreign-pep">Foreign PEP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Profession</Label>
                <Select defaultValue="business">
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="business">
                      Self Employed Business
                    </SelectItem>
                    <SelectItem value="legal">Legal/Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nature of Business</Label>
                <Select defaultValue="retail">
                  <SelectTrigger>
                    <SelectValue placeholder="Select nature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Trade</SelectItem>
                    <SelectItem value="crypto">Virtual Currency</SelectItem>
                    <SelectItem value="jewelry">Gems & Jewelry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Channel</Label>
                <Select defaultValue="mobile">
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="web">Online Banking</SelectItem>
                    <SelectItem value="branch">Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country of Residence</Label>
                <Select defaultValue="uae">
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGeographyRisk.map((g) => (
                      <SelectItem key={g.id} value={g.country.toLowerCase()}>
                        {g.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Banking Product</Label>
                <Select defaultValue="intl-transfer">
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProductRisk.map((p) => (
                      <SelectItem
                        key={p.id}
                        value={p.product.toLowerCase().replace(/ /g, "-")}
                      >
                        {p.product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full h-12 gap-2 text-lg font-bold"
              onClick={handleCalculate}
              disabled={calculating}
            >
              {calculating ? (
                <>
                  <Activity className="h-5 w-5 animate-spin" /> Calculating...
                </>
              ) : (
                <>
                  <PlayCircle className="h-5 w-5" /> Calculate Risk
                </>
              )}
            </Button>
          </div>
        </Panel>

        <div className="space-y-6">
          {!result && !calculating && (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 bg-muted/20">
              <Calculator className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground font-medium">
                Ready to simulate risk assessment
              </p>
            </div>
          )}

          {calculating && (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 bg-muted/20">
              <Activity className="h-16 w-16 text-primary mb-4 animate-spin" />
              <p className="text-primary font-bold">Engine Processing...</p>
            </div>
          )}

          {result && !calculating && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Panel title="Risk Result" subtitle="Overall score and rating">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Final Score
                    </p>
                    <p className="text-4xl font-display font-bold text-primary">
                      {result.overallScore}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Final Rating
                    </p>
                    <Badge className="text-xl px-4 py-1 bg-critical text-white">
                      {result.finalRating}
                    </Badge>
                  </div>
                </div>

                {result.overridesApplied.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {result.overridesApplied.map((override, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg"
                      >
                        <ShieldAlert className="h-5 w-5 text-warning shrink-0" />
                        <p className="text-sm font-medium text-warning-foreground">
                          {override}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel
                title="Risk Breakdown"
                subtitle="Weighted contribution by factor"
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead className="text-right">Weighted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.factors.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="text-xs font-bold">
                          {item.name}
                        </TableCell>
                        <TableCell className="font-mono">
                          {item.score}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.weight}%
                        </TableCell>
                        <TableCell className="text-right font-bold text-primary">
                          {item.weightedScore.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Panel>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
