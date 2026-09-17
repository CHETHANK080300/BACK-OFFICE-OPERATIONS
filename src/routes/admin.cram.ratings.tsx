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
import { Plus, Edit2, Trash2, Save, AlertCircle } from "lucide-react";
import { mockRiskRatings } from "@/lib/cram-mock-data";
import { RiskRating } from "@/lib/cram-types";
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
import { toast } from "sonner";

export const Route = createFileRoute("/admin/cram/ratings")({
  component: RiskRatingsConfig,
});

function RiskRatingsConfig() {
  const [ratings] = useState(mockRiskRatings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RiskRating | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Rating range updated");
    setIsDialogOpen(false);
  };

  const openDialog = (item: RiskRating | null = null) => {
    setEditingItem(
      item || {
        id: "",
        minScore: 0,
        maxScore: 0,
        rating: "",
        color: "bg-muted",
      },
    );
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Risk Ratings Configuration"
      subtitle="Define score thresholds for each risk classification"
    >
      <div className="space-y-6">
        <Panel
          title="Rating Thresholds"
          subtitle="Configure the 0-100 score ranges for risk labels"
          action={
            <Button size="sm" className="gap-2" onClick={() => openDialog()}>
              <Plus className="h-4 w-4" /> Add Rating
            </Button>
          }
        >
          <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20 flex gap-3">
            <AlertCircle className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm">
              <strong>Validation Rule:</strong> Total score range must cover 0
              to 100 without overlaps or gaps.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Min Score</TableHead>
                <TableHead>Max Score</TableHead>
                <TableHead>Risk Rating</TableHead>
                <TableHead>Label Style</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratings.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono font-bold text-lg">
                    {r.minScore}
                  </TableCell>
                  <TableCell className="font-mono font-bold text-lg">
                    {r.maxScore}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${r.color} text-white px-3 py-1 text-sm`}
                    >
                      {r.rating}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-4 w-12 rounded ${r.color}`} />
                      <span className="text-xs text-muted-foreground font-mono">
                        {r.color}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(r)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel
            title="Real-time Validation"
            subtitle="System consistency check"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <span className="text-sm font-medium">
                  Coverage Check (0-100)
                </span>
                <Badge variant="success">PASS</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <span className="text-sm font-medium">Overlapping Ranges</span>
                <Badge variant="success">NONE</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <span className="text-sm font-medium">Gaps in Sequence</span>
                <Badge variant="success">NONE</Badge>
              </div>
            </div>
          </Panel>

          <Panel title="Preview" subtitle="How ratings appear in UI">
            <div className="flex flex-wrap gap-3 p-4 bg-muted/20 rounded-xl border border-dashed border-border">
              {ratings.map((r) => (
                <Badge key={r.id} className={`${r.color} text-white`}>
                  {r.rating}
                </Badge>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? "Edit Risk Rating" : "Add Risk Rating"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Score</Label>
                <Input type="number" defaultValue={editingItem?.minScore} />
              </div>
              <div className="space-y-2">
                <Label>Max Score</Label>
                <Input type="number" defaultValue={editingItem?.maxScore} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rating Label</Label>
              <Input
                defaultValue={editingItem?.rating}
                placeholder="e.g. Medium Risk"
              />
            </div>
            <div className="space-y-2">
              <Label>Color Class (Tailwind)</Label>
              <Input
                defaultValue={editingItem?.color}
                placeholder="bg-primary"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" /> Save Rating
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
