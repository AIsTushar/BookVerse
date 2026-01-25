import { useState } from "react";
import { Save, User, Bell, Lock, Store, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@yellow.com",
    phone: "+1 234 567 8900",
    bio: "Store administrator",
  });

  const [storeData, setStoreData] = useState({
    storeName: "YELLOW",
    storeEmail: "support@yellow.com",
    storePhone: "+1 234 567 8900",
    address: "123 Main Street, New York, NY 10001",
    currency: "USD",
    timezone: "America/New_York",
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailCustomers: true,
    emailProducts: false,
    pushOrders: true,
    pushLowStock: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const handleSaveStore = () => {
    toast({
      title: "Success",
      description: "Store settings updated successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Success",
      description: "Notification preferences updated",
    });
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Password changed successfully",
    });
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "store", label: "Store", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <AdminLayout>
        <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and store settings</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 border rounded-lg p-2 h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 border rounded-lg p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <p className="text-sm text-muted-foreground">Update your personal information</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "store" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Store Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your store information</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeData.storeName}
                    onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeData.storeEmail}
                    onChange={(e) => setStoreData({ ...storeData, storeEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    value={storeData.storePhone}
                    onChange={(e) => setStoreData({ ...storeData, storePhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={storeData.address}
                    onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      value={storeData.currency}
                      onChange={(e) => setStoreData({ ...storeData, currency: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={storeData.timezone}
                      onChange={(e) => setStoreData({ ...storeData, timezone: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleSaveStore}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Notification Settings</h2>
                <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailOrders">New Orders</Label>
                      <Switch
                        id="emailOrders"
                        checked={notifications.emailOrders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailOrders: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailCustomers">New Customers</Label>
                      <Switch
                        id="emailCustomers"
                        checked={notifications.emailCustomers}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailCustomers: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailProducts">Product Updates</Label>
                      <Switch
                        id="emailProducts"
                        checked={notifications.emailProducts}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailProducts: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushOrders">New Orders</Label>
                      <Switch
                        id="pushOrders"
                        checked={notifications.pushOrders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushOrders: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushLowStock">Low Stock Alerts</Label>
                      <Switch
                        id="pushLowStock"
                        checked={notifications.pushLowStock}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushLowStock: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Security Settings</h2>
                <p className="text-sm text-muted-foreground">Update your password and security preferences</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                  />
                </div>
                <Button onClick={handleChangePassword}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminSettings;