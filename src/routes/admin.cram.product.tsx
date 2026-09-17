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
import { Plus, Package, Eye, Edit2, Trash2, Save } from "lucide-react";
import { mockProductRisk } from "@/lib/cram-mock-data";
import { ProductRisk } from "@/lib/cram-types";
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

export const Route = createFileRoute("/admin/cram/product")({
  component: ProductRiskConfig,
});

function ProductRiskConfig() {
  const [products] = useState(mockProductRisk);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductRisk | null>(null);
  const [viewOnly, setViewOnly] = useState(false);

  const getScoreBadge = (score: number) => {
    if (score >= 3)
      return <Badge className="bg-critical text-white">3 (High)</Badge>;
    if (score >= 2)
      return <Badge className="bg-warning text-white">2 (Medium)</Badge>;
    return <Badge className="bg-success text-white">1 (Low)</Badge>;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingItem?.id ? "Product updated" : "Product added");
    setIsDialogOpen(false);
  };

  const openDialog = (
    item: ProductRisk | Partial<ProductRisk> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem(
      (item as ProductRisk) || {
        product: "",
        liquidity: 1,
        crossBorder: 1,
        anonymity: 1,
        fatfRisk: 1,
        finalRisk: 1,
      },
    );
    setViewOnly(view);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Product Risk Configuration"
      subtitle="Manage risk scoring for banking products and services"
    >
      <Panel
        title="Product Risk Master"
        subtitle="Define risk dimensions for each product category"
        action={
          <Button size="sm" className="gap-2" onClick={() => openDialog()}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Liquidity</TableHead>
              <TableHead>Cross Border</TableHead>
              <TableHead>Anonymity</TableHead>
              <TableHead>FATF Risk</TableHead>
              <TableHead>Final Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    {prod.product}
                  </div>
                </TableCell>
                <TableCell>{getScoreBadge(prod.liquidity)}</TableCell>
                <TableCell>{getScoreBadge(prod.crossBorder)}</TableCell>
                <TableCell>{getScoreBadge(prod.anonymity)}</TableCell>
                <TableCell>{getScoreBadge(prod.fatfRisk)}</TableCell>
                <TableCell className="font-bold text-lg">
                  {prod.finalRisk.toFixed(1)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => openDialog(prod, true)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => openDialog(prod)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-critical"
                      onClick={() => toast.error("Product deleted (demo)")}
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
              {viewOnly ? "Product Risk View" : "Edit Product Risk"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input defaultValue={editingItem?.product} disabled={viewOnly} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Liquidity Score (1-3)</Label>
                <Input
                  type="number"
                  min="1"
                  max="3"
                  defaultValue={editingItem?.liquidity}
                  disabled={viewOnly}
                />
              </div>
              <div className="space-y-2">
                <Label>Cross Border Score (1-3)</Label>
                <Input
                  type="number"
                  min="1"
                  max="3"
                  defaultValue={editingItem?.crossBorder}
                  disabled={viewOnly}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Anonymity Score (1-3)</Label>
                <Input
                  type="number"
                  min="1"
                  max="3"
                  defaultValue={editingItem?.anonymity}
                  disabled={viewOnly}
                />
              </div>
              <div className="space-y-2">
                <Label>FATF Risk Score (1-3)</Label>
                <Input
                  type="number"
                  min="1"
                  max="3"
                  defaultValue={editingItem?.fatfRisk}
                  disabled={viewOnly}
                />
              </div>
            </div>
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Product
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
