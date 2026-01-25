import { useState } from "react";
import { Plus, Search, MoreVertical, Pencil, Trash2, Tag, Copy, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";

interface Promotion {
  id: string;
  name: string;
  code: string;
  type: "Percentage" | "Fixed Amount" | "Free Shipping";
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  status: "Active" | "Inactive" | "Expired";
  description: string;
}

const AdminPromotions = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "Percentage" as "Percentage" | "Fixed Amount" | "Free Shipping",
    value: 0,
    minPurchase: 0,
    maxDiscount: 0,
    startDate: "",
    endDate: "",
    usageLimit: 100,
    description: "",
    status: "Active" as "Active" | "Inactive",
  });

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      name: "Winter Sale 2024",
      code: "WINTER25",
      type: "Percentage",
      value: 25,
      minPurchase: 100,
      maxDiscount: 50,
      startDate: "2024-01-01",
      endDate: "2024-02-28",
      usageLimit: 1000,
      usageCount: 234,
      status: "Active",
      description: "25% off on all winter collection",
    },
    {
      id: "2",
      name: "New Customer Discount",
      code: "WELCOME10",
      type: "Fixed Amount",
      value: 10,
      minPurchase: 50,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usageLimit: 5000,
      usageCount: 892,
      status: "Active",
      description: "$10 off for first-time customers",
    },
    {
      id: "3",
      name: "Free Shipping Promo",
      code: "FREESHIP",
      type: "Free Shipping",
      value: 0,
      minPurchase: 75,
      startDate: "2024-01-15",
      endDate: "2024-01-31",
      usageLimit: 500,
      usageCount: 345,
      status: "Active",
      description: "Free shipping on orders over $75",
    },
    {
      id: "4",
      name: "Flash Sale 50%",
      code: "FLASH50",
      type: "Percentage",
      value: 50,
      minPurchase: 200,
      maxDiscount: 100,
      startDate: "2023-12-20",
      endDate: "2023-12-25",
      usageLimit: 100,
      usageCount: 100,
      status: "Expired",
      description: "50% off flash sale - Christmas special",
    },
  ]);

  const filteredPromotions = promotions.filter((promo) =>
    promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPromotion = () => {
    if (!formData.name.trim() || !formData.code.trim()) {
      toast({
        title: "Error",
        description: "Name and code are required",
        variant: "destructive",
      });
      return;
    }

    const newPromotion: Promotion = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: formData.value,
      minPurchase: formData.minPurchase,
      maxDiscount: formData.maxDiscount || undefined,
      startDate: formData.startDate,
      endDate: formData.endDate,
      usageLimit: formData.usageLimit,
      usageCount: 0,
      status: formData.status,
      description: formData.description,
    };

    setPromotions([newPromotion, ...promotions]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Promotion created successfully",
    });
  };

  const handleEditPromotion = () => {
    if (!selectedPromotion || !formData.name.trim()) return;

    setPromotions(
      promotions.map((promo) =>
        promo.id === selectedPromotion.id
          ? {
              ...promo,
              name: formData.name,
              code: formData.code.toUpperCase(),
              type: formData.type,
              value: formData.value,
              minPurchase: formData.minPurchase,
              maxDiscount: formData.maxDiscount || undefined,
              startDate: formData.startDate,
              endDate: formData.endDate,
              usageLimit: formData.usageLimit,
              description: formData.description,
              status: formData.status,
            }
          : promo
      )
    );

    setIsEditDialogOpen(false);
    setSelectedPromotion(null);
    resetForm();
    toast({
      title: "Success",
      description: "Promotion updated successfully",
    });
  };

  const handleDeletePromotion = () => {
    if (!selectedPromotion) return;
    setPromotions(promotions.filter((promo) => promo.id !== selectedPromotion.id));
    setIsDeleteDialogOpen(false);
    setSelectedPromotion(null);
    toast({
      title: "Success",
      description: "Promotion deleted successfully",
    });
  };

  const openEditDialog = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setFormData({
      name: promotion.name,
      code: promotion.code,
      type: promotion.type,
      value: promotion.value,
      minPurchase: promotion.minPurchase,
      maxDiscount: promotion.maxDiscount || 0,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      usageLimit: promotion.usageLimit,
      description: promotion.description,
      status: promotion.status === "Expired" ? "Inactive" : promotion.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsDeleteDialogOpen(true);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Promo code copied to clipboard",
    });
  };

  const toggleStatus = (promotion: Promotion) => {
    setPromotions(
      promotions.map((promo) =>
        promo.id === promotion.id
          ? { ...promo, status: promo.status === "Active" ? "Inactive" : "Active" }
          : promo
      )
    );
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      type: "Percentage",
      value: 0,
      minPurchase: 0,
      maxDiscount: 0,
      startDate: "",
      endDate: "",
      usageLimit: 100,
      description: "",
      status: "Active",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
      Expired: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
   <AdminLayout>
     <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Promotions</h1>
        <p className="text-muted-foreground mt-1">Manage discount codes and promotions</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search promotions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Promotion
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium">Promotion</th>
              <th className="text-left p-4 font-medium">Code</th>
              <th className="text-left p-4 font-medium">Discount</th>
              <th className="text-left p-4 font-medium">Usage</th>
              <th className="text-left p-4 font-medium">Valid Period</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="w-[50px] p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No promotions found</p>
                </td>
              </tr>
            ) : (
              filteredPromotions.map((promotion) => (
                <tr key={promotion.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{promotion.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {promotion.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                        {promotion.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyCode(promotion.code)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    {promotion.type === "Percentage" && `${promotion.value}% off`}
                    {promotion.type === "Fixed Amount" && `$${promotion.value} off`}
                    {promotion.type === "Free Shipping" && "Free Shipping"}
                    {promotion.minPurchase > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Min: ${promotion.minPurchase}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${Math.min(
                                (promotion.usageCount / promotion.usageLimit) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {promotion.usageCount} / {promotion.usageLimit}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(promotion.startDate).toLocaleDateString()} -{" "}
                    {new Date(promotion.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          promotion.status
                        )}`}
                      >
                        {promotion.status}
                      </span>
                      {promotion.status !== "Expired" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleStatus(promotion)}
                        >
                          <Power className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(promotion)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyCode(promotion.code)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(promotion)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isAddDialogOpen ? "Add New Promotion" : "Edit Promotion"}
            </DialogTitle>
            <DialogDescription>
              {isAddDialogOpen
                ? "Create a new discount code or promotion"
                : "Update promotion details"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Promotion Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Winter Sale 2024"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Promo Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g., WINTER25"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Promotion description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as typeof formData.type,
                    })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Percentage">Percentage Off</option>
                  <option value="Fixed Amount">Fixed Amount Off</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">
                  {formData.type === "Percentage" ? "Percentage" : "Amount"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="0"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
                  }
                  disabled={formData.type === "Free Shipping"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPurchase">Minimum Purchase</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  placeholder="0"
                  value={formData.minPurchase}
                  onChange={(e) =>
                    setFormData({ ...formData, minPurchase: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDiscount">Max Discount (optional)</Label>
                <Input
                  id="maxDiscount"
                  type="number"
                  placeholder="0"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDiscount: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usageLimit">Usage Limit</Label>
              <Input
                id="usageLimit"
                type="number"
                placeholder="100"
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status">Active Status</Label>
              <Switch
                id="status"
                checked={formData.status === "Active"}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, status: checked ? "Active" : "Inactive" })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={isAddDialogOpen ? handleAddPromotion : handleEditPromotion}>
              {isAddDialogOpen ? "Add Promotion" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Promotion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedPromotion?.name}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePromotion}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
   </AdminLayout>
  );
};

export default AdminPromotions;