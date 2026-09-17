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
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  User,
  Globe,
  Building,
} from "lucide-react";
import { mockCustomerAssessments } from "@/lib/cram-mock-data";
import { CustomerAssessment } from "@/lib/cram-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/cram/assessments")({
  component: CustomerAssessmentsView,
});

function CustomerAssessmentsView() {
  const [selectedAssessment, setSelectedAssessment] =
    useState<CustomerAssessment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDetails = (assessment: CustomerAssessment) => {
    setSelectedAssessment(assessment);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Customer Risk Assessments"
      subtitle="View and audit customer risk classification results"
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Name, CIF or Customer ID..."
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <Input type="date" className="bg-muted/50 border-none" />
          <div className="flex gap-2 md:col-span-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Filter className="h-4 w-4" /> Advanced Filters
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" /> Export Results
            </Button>
          </div>
        </div>

        <Panel
          title="Assessment History"
          subtitle="Recent customer risk evaluations"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name / CIF</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomerAssessments.map((ast) => (
                <TableRow
                  key={ast.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div>
                      <p className="font-bold">{ast.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase">
                        {ast.cifNumber} • {ast.customerId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-display font-bold text-lg">
                      {ast.finalScore}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        ast.riskRating === "Very High"
                          ? "bg-black text-white"
                          : ast.riskRating === "High"
                            ? "bg-critical text-white"
                            : ast.riskRating === "Medium"
                              ? "bg-warning text-black"
                              : "bg-success text-white"
                      }
                    >
                      {ast.riskRating}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-semibold ${
                        ast.decision === "Reject"
                          ? "text-critical"
                          : ast.decision === "Review"
                            ? "text-warning"
                            : "text-success"
                      }`}
                    >
                      {ast.decision}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {ast.assessmentDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ast.status === "Flagged" ? "critical" : "outline"
                      }
                    >
                      {ast.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDetails(ast)}
                    >
                      <Eye className="h-4 w-4 mr-2" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Assessment Detail - {selectedAssessment?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedAssessment && (
            <div className="space-y-6 pt-4">
              {/* Profile Card */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-muted/30 rounded-xl border border-border">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">
                        Customer Name
                      </Label>
                      <p className="font-bold">{selectedAssessment.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">
                        Geography
                      </Label>
                      <p className="font-bold">
                        {selectedAssessment.geography}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">
                        Segment / Industry
                      </Label>
                      <p className="font-bold">
                        {selectedAssessment.segment} •{" "}
                        {selectedAssessment.industry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-[10px] uppercase text-muted-foreground">
                        Type
                      </Label>
                      <p className="font-bold">
                        {selectedAssessment.customerType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoring Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 text-center">
                  <Label className="text-[10px] uppercase text-muted-foreground">
                    Final Score
                  </Label>
                  <p className="text-3xl font-display font-bold text-primary">
                    {selectedAssessment.finalScore}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
                  <Label className="text-[10px] uppercase text-muted-foreground">
                    Risk Rating
                  </Label>
                  <p className="text-xl font-bold block mt-1">
                    {selectedAssessment.riskRating}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
                  <Label className="text-[10px] uppercase text-muted-foreground">
                    Decision
                  </Label>
                  <p className="text-xl font-bold block mt-1">
                    {selectedAssessment.decision}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase text-muted-foreground">
                  Audit Information
                </Label>
                <div className="p-3 bg-muted/20 rounded border border-border text-xs space-y-2">
                  <div className="flex justify-between">
                    <span>Assessment Date</span>
                    <span className="font-mono">
                      {selectedAssessment.assessmentDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Version</span>
                    <span className="font-mono">v2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engine Rules Applied</span>
                    <span className="font-mono">42 Rules</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                <Button className="gap-2">
                  <Download className="h-4 w-4" /> Download Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
