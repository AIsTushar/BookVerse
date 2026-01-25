/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutHandler } from "@/utils/handleLogout";
import { BsPlusCircleDotted } from "react-icons/bs";
import { PiGitPullRequestLight } from "react-icons/pi";
import { BiPurchaseTag } from "react-icons/bi";
import { SiOpenproject } from "react-icons/si";
import { ConfigProvider, Select } from "antd";
import {
  Briefcase,
  CircleGauge,
  DollarSign,
  FileCode,
  History,
  LogOut,
  Menu,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  User,
  UserCheck,
  Users,
  Users2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [customRole, setCustomRole] = useState<string>(
    pathname?.startsWith("/super-admin")
      ? "SUPER_ADMIN"
      : pathname?.startsWith("/admin")
      ? "ADMIN"
      : pathname?.startsWith("/sub-admin")
      ? "SUB_ADMIN"
      : pathname?.startsWith("/supervisor")
      ? "SUPERVISOR"
      : pathname?.startsWith("/employee")
      ? "EMPLOYEE"
      : ""
  );
  const role = user?.role || customRole;

  const roleRoutes: Record<string, string> = {
    SUPER_ADMIN: "super-admin",
    ADMIN: "admin",
    SUB_ADMIN: "sub-admin",
    SUPERVISOR: "supervisor",
    EMPLOYEE: "employee",
  };

  const handleCustomRoleChange = (value: string) => {
    setCustomRole(value);
    const route = roleRoutes[value];
    if (route) {
      router.push(`/${route}`);
    }
  };

  let menuItems;
  if (role === "SUPER_ADMIN") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/super-admin",
      },
      {
        icon: Users,
        text: "Total Users",
        path: "/super-admin/total-user",
      },
      {
        icon: DollarSign,
        text: "Total Earnings",
        path: "/super-admin/total-earnings",
      },
      {
        icon: History,
        text: "Subscription History",
        path: "/super-admin/subscription-history",
      },
    ];
  }
  if (role === "ADMIN") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/admin",
      },
      {
        icon: Briefcase,
        text: "Projects",
        path: "/admin/projects",
      },
      {
        icon: FileCode,
        text: "Cost Code",
        path: "/admin/cost-code",
      },
      {
        icon: MonitorSmartphone,
        text: "Equipment",
        path: "/admin/equipment",
      },
      {
        icon: ShieldCheck,
        text: "Sub Admin",
        path: "/admin/sub-admin",
      },
      {
        icon: Users2,
        text: "Supervisor",
        path: "/admin/supervisor",
      },
      {
        icon: UserCheck,
        text: "Employee",
        path: "/admin/employee",
      },
    ];
  }
  if (role === "SUB_ADMIN") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/sub-admin",
      },
      {
        icon: Briefcase,
        text: "Projects",
        path: "/sub-admin/projects",
      },
      {
        icon: FileCode,
        text: "Cost Code",
        path: "/sub-admin/cost-code",
      },
      {
        icon: MonitorSmartphone,
        text: "Equipment",
        path: "/sub-admin/equipment",
      },
      {
        icon: Users2,
        text: "Supervisor",
        path: "/sub-admin/supervisor",
      },
      {
        icon: UserCheck,
        text: "Employee",
        path: "/sub-admin/employee",
      },
      {
        icon: CircleGauge,
        text: "PTO Requests",
        path: "/sub-admin/pto",
      },
    ];
  }
  if (role === "SUPERVISOR") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/supervisor",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add PTO request",
        path: "/supervisor/add-pto-request",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add purchase",
        path: "/supervisor/add-purchase",
      },
      {
        icon: PiGitPullRequestLight,
        text: "Employee PTO request",
        path: "/supervisor/employe-pto-request",
      },
      {
        icon: PiGitPullRequestLight,
        text: "My PTO request",
        path: "/supervisor/my-pto-request",
      },
      {
        icon: BiPurchaseTag,
        text: "My purchase",
        path: "/supervisor/my-purchase",
      },
    ];
  }
  if (role === "EMPLOYEE") {
    menuItems = [
      {
        icon: TbLayoutDashboardFilled,
        text: "Dashboard",
        path: "/employee",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add PTO request",
        path: "/employee/add-pto-request",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add Project entry",
        path: "/employee/add-project-entry",
      },
      {
        icon: BsPlusCircleDotted,
        text: "Add purchase",
        path: "/employee/add-purchase",
      },

      {
        icon: SiOpenproject,
        text: "All Projects",
        path: "/employee/all-project",
      },
      {
        icon: PiGitPullRequestLight,
        text: "My PTO request",
        path: "/employee/my-pto-request",
      },
      {
        icon: BiPurchaseTag,
        text: "My purchase",
        path: "/employee/my-purchase",
      },
    ];
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1E6A92",
        },
      }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center justify-center">
            <h4 className="text-2xl font-semibold">Logo</h4>
            {/* <Image src={logo.src} width={100} height={100} alt="logo" /> */}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems?.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ${
                pathname === item.path
                  ? "bg-primary text-white"
                  : "text-text-primary"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.text}
            </Link>
          ))}
        </nav>
        {/* log out button  */}
        <div className="p-4 fixed bottom-2 w-full">
          <button
            onClick={() => {
              logoutHandler(dispatch, router);
            }}
            className="flex items-center px-4 py-3 text-sm rounded-lg bg-red-50 text-gray-700 hover:bg-red-100 w-full transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-16 px-5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 block lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            <h4 className="flex items-center justify-center text-2xl font-semibold">
              {pathname === "/"
                ? "Dashboard"
                : pathname
                    ?.split("/")[1]
                    ?.split("-")
                    ?.join(" ")
                    ?.charAt(0)
                    ?.toUpperCase() +
                  pathname?.split("/")[1]?.split("-")?.join(" ")?.slice(1)}
            </h4>

            {/* changing role on frontend for testing */}
            <div className="hidden md:flex flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <Select
                  value={customRole}
                  style={{ width: 150 }}
                  onChange={handleCustomRoleChange}
                  options={[
                    { value: "SUPER_ADMIN", label: "Super Admin" },
                    { value: "ADMIN", label: "Admin" },
                    { value: "SUB_ADMIN", label: "Sub Admin" },
                    { value: "SUPERVISOR", label: "Supervisor" },
                    { value: "EMPLOYEE", label: "Employee" },
                  ]}
                />
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-5 mt-16 bg-dashboard-content-bg">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-text-secondary bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </ConfigProvider>
  );
};

export default DashboardLayout;
