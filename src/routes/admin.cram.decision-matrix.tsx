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
import { Plus, Edit2, Trash2, Save, Scale, ArrowRight } from "lucide-react";
import { mockDecisionMatrix } from "@/lib/cram-mock-data";
import { DecisionMatrix } from "@/lib/cram-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/cram/decision-matrix")({
  component: DecisionMatrixConfig,
});

function DecisionMatrixConfig() {
  const [matrix] = useState(mockDecisionMatrix);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DecisionMatrix | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Decision mapping saved");
    setIsDialogOpen(false);
  };

  const openDialog = (item: DecisionMatrix | null = null) => {
    setEditingItem(
      item || { id: "", rating: "Low", decision: "Approve", conditions: "" },
    );
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Decision Matrix Configuration"
      subtitle="Determine onboarding outcomes based on final risk ratings"
    >
      <div className="space-y-6">
        <Panel
          title="Onboarding Decisions"
          subtitle="Map risk ratings to system decisions and required actions"
          action={
            <Button size="sm" className="gap-2" onClick={() => openDialog()}>
              <Plus className="h-4 w-4" /> Add Rule
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Rating</TableHead>
                <TableHead></TableHead>
                <TableHead>Final Decision</TableHead>
                <TableHead>Required Conditions / Workflow</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrix.map((m) => (
                <TableRow key={m.id} className="group">
                  <TableCell>
                    <Badge variant="outline" className="text-sm font-bold px-3">
                      {m.rating}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-50" />
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        m.decision === "Reject"
                          ? "bg-critical text-white"
                          : m.decision === "Review"
                            ? "bg-warning text-black"
                            : m.decision === "Escalate"
                              ? "bg-accent text-white"
                              : "bg-success text-white"
                      }
                    >
                      {m.decision.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground italic">
                    {m.conditions}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(m)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-critical"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 flex gap-4">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <Scale className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-bold text-accent">Policy Note</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Decisions configured here drive the default automated response of
              the onboarding system. Any 'Review' or 'Escalate' outcome will
              trigger a mandatory manual review task in the assigned workflow
              stage.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? "Edit Decision Rule" : "Add Decision Rule"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Risk Rating</Label>
              <Select defaultValue={editingItem?.rating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Very High">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Outcome Decision</Label>
              <Select defaultValue={editingItem?.decision}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approve">Approve</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Reject">Reject</SelectItem>
                  <SelectItem value="Escalate">Escalate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition / Remarks</Label>
              <Textarea
                defaultValue={editingItem?.conditions}
                placeholder="Describe required documents or workflow impact..."
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" /> Save Decision Mapping
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
