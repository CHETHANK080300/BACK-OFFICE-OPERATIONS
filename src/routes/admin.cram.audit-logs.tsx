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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  History,
  User,
  Eye,
  Info,
} from "lucide-react";
import { mockAuditLogs } from "@/lib/cram-mock-data";
import { AuditLog } from "@/lib/cram-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/cram/audit-logs")({
  component: AuditLogs,
});

function AuditLogs() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Audit Logs"
      subtitle="Complete trail of system configuration changes"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="md:col-span-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter by User"
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <Input type="date" className="bg-muted/50 border-none" />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <Panel
          title="System Activities"
          subtitle="Track administrative actions"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {log.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase tracking-wider"
                    >
                      {log.module}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-primary">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                    {log.details}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => openDetails(log)}
                    >
                      <Eye className="h-4 w-4" /> Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Audit Entry Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Event ID</Label>
                <p className="font-mono text-sm">{selectedLog?.id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Timestamp</Label>
                <p className="text-sm">
                  {selectedLog &&
                    new Date(selectedLog.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Module</Label>
              <p className="font-bold">{selectedLog?.module}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Action Performed</Label>
              <p className="font-bold text-primary">{selectedLog?.action}</p>
            </div>
            <div className="p-3 rounded bg-muted/50 border border-border">
              <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                <Info className="h-3 w-3" /> Change Description
              </Label>
              <p className="text-sm italic">"{selectedLog?.details}"</p>
            </div>
            <div className="pt-2 border-t border-border flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {selectedLog?.user
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-bold">{selectedLog?.user}</p>
                <p className="text-[10px] uppercase text-muted-foreground">
                  CRAM Administrator
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
