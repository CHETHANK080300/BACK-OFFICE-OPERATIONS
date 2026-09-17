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
  Users,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Eye,
  Edit2,
  Trash2,
  Save,
  Plus,
} from "lucide-react";
import { mockRoles, mockUsers } from "@/lib/cram-mock-data";
import { Role } from "@/lib/cram-types";
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
import { PermissionLevel } from "@/lib/cram-types";

import { User } from "@/lib/cram-types";

export const Route = createFileRoute("/admin/cram/roles")({
  component: UserRolesConfig,
});

function UserRolesConfig() {
  const allPermissions: PermissionLevel[] = [
    "View",
    "Create",
    "Edit",
    "Approve",
    "Delete",
  ];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Role | User | null>(null);
  const [viewOnly, setViewOnly] = useState(false);

  const openDialog = (
    role: Role | Partial<Role> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem((role as Role) || { name: "", permissions: ["View"] });
    setViewOnly(view);
    setIsDialogOpen(true);
  };

  const openUserDialog = (
    user: User | Partial<User> | null = null,
    view: boolean = false,
  ) => {
    setEditingItem(
      (user as User) || {
        name: "",
        role: "Compliance Analyst",
        status: "Active",
      },
    );
    setViewOnly(view);
    setIsUserDialogOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Role permissions updated");
    setIsDialogOpen(false);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("User assignment saved");
    setIsUserDialogOpen(false);
  };

  return (
    <DashboardLayout
      title="User & Role Management"
      subtitle="Configure access control and user assignments"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel
          title="Role Permissions"
          subtitle="Define what each role can do"
          action={
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => openDialog()}
            >
              <Plus className="h-4 w-4" /> Add Role
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                {allPermissions.map((p) => (
                  <TableHead
                    key={p}
                    className="text-center text-[10px] uppercase font-bold px-1"
                  >
                    {p}
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-bold text-sm">
                    {role.name}
                  </TableCell>
                  {allPermissions.map((p) => (
                    <TableCell key={p} className="text-center">
                      {role.permissions.includes(p) ? (
                        <div className="flex justify-center">
                          <ShieldCheck className="h-4 w-4 text-success" />
                        </div>
                      ) : (
                        <div className="flex justify-center opacity-20">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => openDialog(role, true)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => openDialog(role)}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <Panel
          title="Active Users"
          subtitle="Enterprise team members"
          action={
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => openUserDialog()}
            >
              <Plus className="h-4 w-4" /> Add User
            </Button>
          }
        >
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="success"
                    className="text-[10px] group-hover:hidden"
                  >
                    ACTIVE
                  </Badge>
                  <div className="hidden group-hover:flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openUserDialog(user, true)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openUserDialog(user)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-critical"
                      onClick={() => toast.error("User deactivated")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full text-xs text-muted-foreground"
            >
              Show 12 More Users...
            </Button>
          </div>
        </Panel>
      </div>

      {/* Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewOnly ? "Role Details" : "Edit Role Permissions"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveRole} className="space-y-4">
            <div className="space-y-2">
              <Label>Role Name</Label>
              <Input defaultValue={editingItem?.name} disabled={viewOnly} />
            </div>
            <div className="space-y-3">
              <Label>Permissions</Label>
              {allPermissions.map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <span className="text-sm font-medium">{p}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant={
                      editingItem?.permissions.includes(p)
                        ? "default"
                        : "outline"
                    }
                    disabled={viewOnly}
                  >
                    {editingItem?.permissions.includes(p)
                      ? "Enabled"
                      : "Disabled"}
                  </Button>
                </div>
              ))}
            </div>
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" /> Save Role
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewOnly ? "User Profile" : "Manage User"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveUser} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={editingItem?.name} disabled={viewOnly} />
            </div>
            <div className="space-y-2">
              <Label>Assigned Role</Label>
              <Input defaultValue={editingItem?.role} disabled={viewOnly} />
            </div>
            {!viewOnly && (
              <DialogFooter>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" /> Update User
                </Button>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
