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
import { Plus, ShieldAlert, Eye, Edit2, Trash2, Save } from "lucide-react";
import { mockOverrideRules } from "@/lib/cram-mock-data";
import { OverrideRule } from "@/lib/cram-types";
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

export const Route = createFileRoute("/admin/cram/override-rules")({
  component: OverrideRulesConfig,
});

function OverrideRulesConfig() {
  const [rules] = useState(mockOverrideRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OverrideRule | null>(null);
  const [viewOnly, setViewOnly] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingItem?.id ? "Rule updated" : "Rule created");
    setIsDialogOpen(false);
  };

  const openDialog = (
    item: OverrideRule | Partial<OverrideRule> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem(
      (item as OverrideRule) || {
        name: "",
        condition: "",
        outcome: "High Risk",
        reason: "",
        status: "Active",
      },
    );
    setViewOnly(view);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Override Rules"
      subtitle="Manage business rules and mandatory risk overrides"
    >
      <Panel
        title="Business Rules"
        subtitle="Define conditional logic for automatic risk rating overrides"
        action={
          <Button size="sm" className="gap-2" onClick={() => openDialog()}>
            <Plus className="h-4 w-4" /> Create Rule
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Risk Outcome</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-warning" />
                    {rule.name}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-2 py-1 rounded text-xs text-primary font-bold">
                    {rule.condition}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      rule.outcome === "Prohibited"
                        ? "bg-black text-white"
                        : "bg-critical text-white"
                    }
                  >
                    {rule.outcome}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {rule.reason}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={rule.status === "Active" ? "success" : "outline"}
                  >
                    {rule.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => openDialog(rule, true)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => openDialog(rule)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-critical"
                      onClick={() => toast.error("Rule deactivated (demo)")}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewOnly
                ? "Rule View"
                : editingItem?.id
                  ? "Edit Rule"
                  : "Create New Rule"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input defaultValue={editingItem?.name} disabled={viewOnly} />
            </div>
            <div className="space-y-2">
              <Label>Condition (Logical Expression)</Label>
              <Input
                defaultValue={editingItem?.condition}
                placeholder="e.g. PEP Status = Foreign"
                disabled={viewOnly}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Risk Outcome</Label>
                <Select defaultValue={editingItem?.outcome} disabled={viewOnly}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High Risk">High Risk</SelectItem>
                    <SelectItem value="Prohibited">Prohibited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingItem?.status} disabled={viewOnly}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason / Regulatory Reference</Label>
              <Textarea
                defaultValue={editingItem?.reason}
                disabled={viewOnly}
              />
            </div>
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Rule
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
