import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  comparePrice?: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image: string;
  createdAt: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "Men's Winter Collection Blazer", sku: "MWC-BLZ-001", category: "Blazers & Jackets", price: 189.00, comparePrice: 249.00, stock: 45, status: "active", image: "/placeholder.svg", createdAt: "2025-01-15" },
  { id: "2", name: "Women's Casual Hoodie", sku: "WCH-001", category: "Sweaters & Hoodies", price: 129.00, stock: 78, status: "active", image: "/placeholder.svg", createdAt: "2025-01-14" },
  { id: "3", name: "Classic Checkered Shirt", sku: "CCS-001", category: "Casual Shirts", price: 79.00, stock: 120, status: "active", image: "/placeholder.svg", createdAt: "2025-01-13" },
  { id: "4", name: "Slim Fit Casual Pants", sku: "SFC-PNT-001", category: "Casual Pants", price: 89.00, stock: 95, status: "active", image: "/placeholder.svg", createdAt: "2025-01-12" },
  { id: "5", name: "Denim Jacket - Dark Wash", sku: "DJ-DW-001", category: "Blazers & Jackets", price: 159.00, stock: 32, status: "active", image: "/placeholder.svg", createdAt: "2025-01-11" },
  { id: "6", name: "Cotton V-Neck T-Shirt", sku: "CVT-001", category: "T-Shirts", price: 39.00, stock: 200, status: "active", image: "/placeholder.svg", createdAt: "2025-01-10" },
  { id: "7", name: "Wool Blend Overcoat", sku: "WBO-001", category: "Blazers & Jackets", price: 299.00, comparePrice: 399.00, stock: 15, status: "draft", image: "/placeholder.svg", createdAt: "2025-01-09" },
  { id: "8", name: "Linen Summer Shirt", sku: "LSS-001", category: "Casual Shirts", price: 69.00, stock: 0, status: "archived", image: "/placeholder.svg", createdAt: "2025-01-08" },
  { id: "9", name: "Kids Printed T-Shirt", sku: "KPT-001", category: "Kids", price: 29.00, stock: 150, status: "active", image: "/placeholder.svg", createdAt: "2025-01-07" },
  { id: "10", name: "Women's Midi Dress", sku: "WMD-001", category: "Dresses", price: 149.00, stock: 60, status: "active", image: "/placeholder.svg", createdAt: "2025-01-06" },
];

const categories = ["All Categories", "Blazers & Jackets", "Sweaters & Hoodies", "Casual Shirts", "Casual Pants", "T-Shirts", "Dresses", "Kids"];
const statuses = ["All Status", "Active", "Draft", "Archived"];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active": return <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">Active</Badge>;
    case "draft": return <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">Draft</Badge>;
    case "archived": return <Badge className="bg-muted text-muted-foreground hover:bg-muted">Archived</Badge>;
    default: return null;
  }
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "All Status" || product.status === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleAddProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      id: String(Date.now()),
      name: productData.name || "",
      sku: productData.sku || "",
      category: productData.category || "",
      price: productData.price || 0,
      comparePrice: productData.comparePrice,
      stock: productData.stock || 0,
      status: productData.status || "draft",
      image: "/placeholder.svg",
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([newProduct, ...products]);
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (productData: Partial<Product>) => {
    if (!editingProduct) return;
    setProducts(products.map(p => 
      p.id === editingProduct.id ? { ...p, ...productData } : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!deletingProduct) return;
    setProducts(products.filter(p => p.id !== deletingProduct.id));
    setDeletingProduct(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked === true)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{product.name}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold">${product.price.toFixed(2)}</div>
                      {product.comparePrice && (
                        <div className="text-xs text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={product.stock === 0 ? "text-destructive font-medium" : product.stock < 20 ? "text-warning font-medium" : ""}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeletingProduct(product)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Product Dialog */}
      <ProductFormDialog
        open={isAddDialogOpen || !!editingProduct}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingProduct(null);
          }
        }}
        product={editingProduct}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
        title="Delete Product"
        description={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteProduct}
      />
    </AdminLayout>
  );
};

export default AdminProducts;
