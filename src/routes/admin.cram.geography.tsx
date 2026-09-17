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
import { Plus, Edit2, Globe, Eye, Trash2, Save } from "lucide-react";
import { mockGeographyRisk } from "@/lib/cram-mock-data";
import { GeographyRisk } from "@/lib/cram-types";
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

export const Route = createFileRoute("/admin/cram/geography")({
  component: GeographyRiskConfig,
});

function GeographyRiskConfig() {
  const [countries] = useState(mockGeographyRisk);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GeographyRisk | null>(null);
  const [viewOnly, setViewOnly] = useState(false);

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "Low":
        return <Badge className="bg-success text-white">Low</Badge>;
      case "Medium":
        return <Badge className="bg-warning text-white">Medium</Badge>;
      case "High":
        return <Badge className="bg-critical text-white">High</Badge>;
      default:
        return <Badge variant="outline">{rating}</Badge>;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      editingItem?.id
        ? "Country updated successfully"
        : "Country added successfully",
    );
    setIsDialogOpen(false);
  };

  const openDialog = (
    item: GeographyRisk | Partial<GeographyRisk> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem(
      (item as GeographyRisk) || {
        country: "",
        fatf: "Low",
        baselIndex: 0,
        sanctions: "No",
        cpi: 0,
        calculatedRating: "Low",
        finalRating: "Low",
      },
    );
    setViewOnly(view);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Geography Risk Configuration"
      subtitle="Country Risk Master and Rating Management"
    >
      <Panel
        title="Country Risk Master"
        subtitle="Manage FATF, Basel Index, and Sanction status by country"
        action={
          <Button size="sm" className="gap-2" onClick={() => openDialog()}>
            <Plus className="h-4 w-4" /> Add Country
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>FATF</TableHead>
              <TableHead>Basel Index</TableHead>
              <TableHead>Sanctions</TableHead>
              <TableHead>CPI</TableHead>
              <TableHead>Calculated</TableHead>
              <TableHead>Final Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries.map((geo) => (
              <TableRow key={geo.id}>
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    {geo.country}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      geo.fatf === "Low"
                        ? "success"
                        : geo.fatf === "High"
                          ? "critical"
                          : "warning"
                    }
                  >
                    {geo.fatf}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">
                  {geo.baselIndex.toFixed(1)}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      geo.sanctions === "Yes"
                        ? "text-critical font-bold"
                        : "text-success"
                    }
                  >
                    {geo.sanctions}
                  </span>
                </TableCell>
                <TableCell className="font-mono">{geo.cpi}</TableCell>
                <TableCell>{getRatingBadge(geo.calculatedRating)}</TableCell>
                <TableCell>{getRatingBadge(geo.finalRating)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => openDialog(geo, true)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => openDialog(geo)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-critical"
                      onClick={() => toast.error("Country removed (demo)")}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {viewOnly
                ? "View Country Details"
                : editingItem?.id
                  ? "Edit Country Risk"
                  : "Add New Country"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country Name</Label>
                <Input
                  defaultValue={editingItem?.country}
                  disabled={viewOnly}
                />
              </div>
              <div className="space-y-2">
                <Label>FATF Status</Label>
                <Select defaultValue={editingItem?.fatf} disabled={viewOnly}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Grey List</SelectItem>
                    <SelectItem value="High">Black List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Basel AML Index</Label>
                <Input
                  type="number"
                  step="0.1"
                  defaultValue={editingItem?.baselIndex}
                  disabled={viewOnly}
                />
              </div>
              <div className="space-y-2">
                <Label>Sanctions Active</Label>
                <Select
                  defaultValue={editingItem?.sanctions}
                  disabled={viewOnly}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Final Rating Override</Label>
              <Select
                defaultValue={editingItem?.finalRating}
                disabled={viewOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Override Reason / Notes</Label>
              <Textarea
                defaultValue={editingItem?.overrideReason}
                placeholder="Enter reason for manual rating override..."
                disabled={viewOnly}
              />
            </div>
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Country Data
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
