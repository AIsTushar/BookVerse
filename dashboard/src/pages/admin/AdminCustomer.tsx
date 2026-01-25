import { useState } from "react";
import { Search, MoreVertical, Eye, Trash2, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminLayout from "@/components/admin/AdminLayout";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  status: string;
  joinedDate: string;
}

const AdminCustomers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const customers: Customer[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234 567 8900",
      location: "New York, USA",
      orders: 12,
      totalSpent: 2847.50,
      status: "Active",
      joinedDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 234 567 8901",
      location: "Los Angeles, USA",
      orders: 8,
      totalSpent: 1654.00,
      status: "Active",
      joinedDate: "2023-08-22",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "+1 234 567 8902",
      location: "Chicago, USA",
      orders: 5,
      totalSpent: 892.00,
      status: "Active",
      joinedDate: "2023-11-10",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      phone: "+1 234 567 8903",
      location: "Houston, USA",
      orders: 15,
      totalSpent: 3421.75,
      status: "Active",
      joinedDate: "2023-03-05",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 234 567 8904",
      location: "Phoenix, USA",
      orders: 2,
      totalSpent: 456.00,
      status: "Inactive",
      joinedDate: "2024-01-12",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
        <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground mt-1">Manage your customer base</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium">Customer</th>
              <th className="text-left p-4 font-medium">Email</th>
              <th className="text-left p-4 font-medium">Phone</th>
              <th className="text-left p-4 font-medium">Location</th>
              <th className="text-left p-4 font-medium">Orders</th>
              <th className="text-left p-4 font-medium">Total Spent</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="w-[50px] p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No customers found</p>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{customer.name}</td>
                  <td className="p-4 text-muted-foreground">{customer.email}</td>
                  <td className="p-4 text-muted-foreground">{customer.phone}</td>
                  <td className="p-4 text-muted-foreground">{customer.location}</td>
                  <td className="p-4">{customer.orders}</td>
                  <td className="p-4 font-medium">${customer.totalSpent.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{selectedCustomer?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedCustomer?.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedCustomer?.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedCustomer?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{selectedCustomer?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{selectedCustomer?.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined Date</p>
                <p className="font-medium">
                  {selectedCustomer?.joinedDate && new Date(selectedCustomer.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Order Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{selectedCustomer?.orders}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${selectedCustomer?.totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
};

export default AdminCustomers;