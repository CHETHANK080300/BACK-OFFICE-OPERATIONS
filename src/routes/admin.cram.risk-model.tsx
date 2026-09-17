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
import { Plus, Edit2, Trash2, Eye, Save } from "lucide-react";
import { mockRiskFactors, mockCustomerParameters } from "@/lib/cram-mock-data";
import { RiskFactor, CustomerParameter } from "@/lib/cram-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export const Route = createFileRoute("/admin/cram/risk-model")({
  component: RiskModelConfig,
});

function RiskModelConfig() {
  const [factors] = useState(mockRiskFactors);
  const [params] = useState(mockCustomerParameters);
  const [isFactorDialogOpen, setIsFactorDialogOpen] = useState(false);
  const [isParamDialogOpen, setIsParamDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    RiskFactor | CustomerParameter | null
  >(null);
  const [viewOnly, setViewOnly] = useState(false);

  const handleSaveFactor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      editingItem?.id
        ? "Factor updated successfully"
        : "Factor added successfully",
    );
    setIsFactorDialogOpen(false);
  };

  const handleSaveParam = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      editingItem?.id
        ? "Parameter updated successfully"
        : "Parameter added successfully",
    );
    setIsParamDialogOpen(false);
  };

  const openFactorDialog = (
    item: RiskFactor | Partial<RiskFactor> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem(
      (item as RiskFactor) || { name: "", weightage: 0, status: "Active" },
    );
    setViewOnly(view);
    setIsFactorDialogOpen(true);
  };

  const openParamDialog = (
    item: CustomerParameter | Partial<CustomerParameter> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem(
      (item as CustomerParameter) || {
        parameterName: "",
        value: "",
        riskScore: 1,
        override: "No",
      },
    );
    setViewOnly(view);
    setIsParamDialogOpen(true);
  };

  const handleDelete = (name: string) => {
    toast.error(`Deleted: ${name} (Demo simulation)`);
  };

  return (
    <DashboardLayout
      title="Risk Model Configuration"
      subtitle="Configure AML risk factors and customer type parameters"
    >
      <div className="space-y-6">
        <Panel
          title="Risk Factors"
          subtitle="Define weightage for each primary risk category"
          action={
            <Button
              size="sm"
              className="gap-2"
              onClick={() => openFactorDialog()}
            >
              <Plus className="h-4 w-4" /> Add Factor
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Factor</TableHead>
                <TableHead>Weightage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factors.map((factor) => (
                <TableRow key={factor.id}>
                  <TableCell className="font-medium">{factor.name}</TableCell>
                  <TableCell className="font-bold">
                    {factor.weightage}%
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        factor.status === "Active" ? "success" : "outline"
                      }
                    >
                      {factor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => openFactorDialog(factor, true)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => openFactorDialog(factor)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-critical"
                        onClick={() => handleDelete(factor.name)}
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

        <Panel
          title="Customer Type Parameters"
          subtitle="Manage risk scores for specific customer attributes"
          action={
            <Button
              size="sm"
              className="gap-2"
              onClick={() => openParamDialog()}
            >
              <Plus className="h-4 w-4" /> Add Parameter
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Override</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {params.map((param) => (
                <TableRow key={param.id}>
                  <TableCell className="text-xs font-bold uppercase text-muted-foreground">
                    {param.parameterName}
                  </TableCell>
                  <TableCell className="font-medium">{param.value}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${param.riskScore > 3 ? "bg-critical" : param.riskScore > 1 ? "bg-warning" : "bg-success"}`}
                      />
                      <span className="font-bold">{param.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {param.override !== "No" ? (
                      <Badge variant="critical">{param.override}</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        None
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => openParamDialog(param, true)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => openParamDialog(param)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-critical"
                        onClick={() => handleDelete(param.value)}
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
      </div>

      {/* Factor Dialog */}
      <Dialog open={isFactorDialogOpen} onOpenChange={setIsFactorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewOnly
                ? "View Risk Factor"
                : editingItem?.id
                  ? "Edit Risk Factor"
                  : "Add Risk Factor"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveFactor} className="space-y-4">
            <div className="space-y-2">
              <Label>Factor Name</Label>
              <Input defaultValue={editingItem?.name} disabled={viewOnly} />
            </div>
            <div className="space-y-2">
              <Label>Weightage (%)</Label>
              <Input
                type="number"
                defaultValue={editingItem?.weightage}
                disabled={viewOnly}
              />
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
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>

      {/* Param Dialog */}
      <Dialog open={isParamDialogOpen} onOpenChange={setIsParamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewOnly
                ? "View Parameter"
                : editingItem?.id
                  ? "Edit Parameter"
                  : "Add Parameter"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveParam} className="space-y-4">
            <div className="space-y-2">
              <Label>Parameter Name</Label>
              <Input
                defaultValue={editingItem?.parameterName}
                disabled={viewOnly}
              />
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input defaultValue={editingItem?.value} disabled={viewOnly} />
            </div>
            <div className="space-y-2">
              <Label>Risk Score (1-5)</Label>
              <Input
                type="number"
                defaultValue={editingItem?.riskScore}
                disabled={viewOnly}
              />
            </div>
            <div className="space-y-2">
              <Label>Override Rule</Label>
              <Select defaultValue={editingItem?.override} disabled={viewOnly}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No Override</SelectItem>
                  <SelectItem value="High Risk">High Risk</SelectItem>
                  <SelectItem value="Prohibited">Prohibited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
