import { useState } from "react";
import { Plus, Search, MoreVertical, Pencil, Trash2, Package } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
}

const AdminCategories = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active" as "Active" | "Inactive",
  });

  // Mock data
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Blazers & Jackets",
      slug: "blazers-jackets",
      description: "Premium blazers and jackets for all occasions",
      productCount: 24,
      status: "Active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sweaters & Hoodies",
      slug: "sweaters-hoodies",
      description: "Comfortable sweaters and hoodies",
      productCount: 18,
      status: "Active",
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      name: "Casual Shirts",
      slug: "casual-shirts",
      description: "Stylish casual shirts for everyday wear",
      productCount: 32,
      status: "Active",
      createdAt: "2024-01-13",
    },
    {
      id: "4",
      name: "Casual Pants",
      slug: "casual-pants",
      description: "Comfortable and trendy casual pants",
      productCount: 15,
      status: "Active",
      createdAt: "2024-01-12",
    },
    {
      id: "5",
      name: "T-Shirts",
      slug: "t-shirts",
      description: "Basic and graphic t-shirts",
      productCount: 45,
      status: "Active",
      createdAt: "2024-01-11",
    },
  ]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      productCount: 0,
      status: formData.status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCategories([newCategory, ...categories]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const handleEditCategory = () => {
    if (!selectedCategory || !formData.name.trim()) return;

    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id
          ? {
              ...cat,
              name: formData.name,
              slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
              description: formData.description,
              status: formData.status,
            }
          : cat
      )
    );

    setIsEditDialogOpen(false);
    setSelectedCategory(null);
    resetForm();
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      status: "Active",
    });
  };

  return (
     <AdminLayout>
         <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">
          Manage your product categories
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Slug</th>
                <th className="text-left p-4 font-medium">Description</th>
                <th className="text-left p-4 font-medium">Products</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Created</th>
                <th className="w-[50px] p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No categories found</p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{category.name}</td>
                    <td className="p-4 text-muted-foreground">
                      {category.slug}
                    </td>
                    <td className="p-4 max-w-xs truncate">
                      {category.description}
                    </td>
                    <td className="p-4">{category.productCount}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          category.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(category)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(category)}
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
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAddDialogOpen ? "Add New Category" : "Edit Category"}
            </DialogTitle>
            <DialogDescription>
              {isAddDialogOpen
                ? "Create a new category for your products"
                : "Update category information"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Blazers & Jackets"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="e.g., blazers-jackets"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to auto-generate from name
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Category description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "Active" | "Inactive",
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
            <Button
              onClick={isAddDialogOpen ? handleAddCategory : handleEditCategory}
            >
              {isAddDialogOpen ? "Add Category" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
     </AdminLayout>
  );
};

export default AdminCategories;