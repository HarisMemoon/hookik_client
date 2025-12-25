"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Tag,
  DollarSign,
  Building2,
  Store,
  Download,
} from "lucide-react";

import PillFilterGroup from "@/components/PillFilterGroup";
import GenericTable from "@/components/GenericTable";
import StatCard from "@/components/StatCard";
import GenericFilterModal from "@/components/GenericFilterModal";
import ExportModal from "@/components/ExportModal";
import TableFilterDropdown from "@/components/TableFilterDropdown";
import useUserList from "@/hooks/useUserList";
import UserDetailsModal from "@/components/userModals/UserDetailsModal";
import SendEmailModal from "@/components/userModals/SendEmail";
import UserStatusModal from "@/components/userModals/UserStatusModal";
import AssignCampaignModal from "@/components/userModals/AssignCampaignModal";
import ManageStorefrontModal from "@/components/userModals/ManageStorefrontModal";
import CreatorDetailsModal from "@/components/userModals/CreatorDetailsModal";
import BrandDetailsModal from "@/components/userModals/BrandDetailsModal";
import BrandWalletModal from "@/components/userModals/BrandWalletModal";
import { exportConfigs } from "@/config/exportConfigs";

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_TAB = "buyers";

const ROLE_MAP = {
  buyers: "shopper",
  creators: "influencer",
  brands: "seller",
};

// Sub-filters
const userFilters = [
  { value: "all", label: "All Users" },
  { value: "suspended", label: "Suspended" },
  { value: "flagged", label: "Flagged Users" },
  { value: "activity", label: "Activity Logs" },
];

const creatorFilters = [
  { value: "all", label: "All Creators" },
  { value: "linkedStorefront", label: "Storefront Linked" },
  { value: "referal", label: "Referal Activity" },
  { value: "reports", label: "Performance Reports" },
];

const brandFilters = [
  { value: "all", label: "All Brands" },
  { value: "imports", label: "Product Imports" },
  { value: "inventory", label: "Inventory Overview" },
  { value: "team", label: "Team Members" },
];

const exportTitleMap = {
  buyers: "Export Buyers",
  creators: "Export Creators",
  brands: "Export Brands",
};

// ============================================================================
// DUMMY DATA GENERATORS
// ============================================================================

const generateDummyBuyersData = (filter) => {
  const baseData = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1234567890",
      orders: 15,
      spent: "$1,250",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567891",
      orders: 8,
      spent: "$680",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1234567892",
      orders: 22,
      spent: "$2,100",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "+1234567893",
      orders: 12,
      spent: "$950",
      status: "Active",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@example.com",
      phone: "+1234567894",
      orders: 5,
      spent: "$420",
      status: "Flagged",
    },
  ];

  if (filter === "suspended") {
    return [
      {
        id: 1,
        name: "Mike Wilson",
        email: "mike@example.com",
        reason: "Multiple violations",
        date: "2024-12-15",
        duration: "30 days",
      },
      {
        id: 2,
        name: "Alex Turner",
        email: "alex@example.com",
        reason: "Payment issues",
        date: "2024-12-10",
        duration: "15 days",
      },
    ];
  }

  if (filter === "flagged") {
    return [
      {
        id: 1,
        name: "David Lee",
        email: "david@example.com",
        flagReason: "Suspicious activity",
        severity: "High",
        date: "2024-12-18",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        flagReason: "Multiple returns",
        severity: "Medium",
        date: "2024-12-17",
      },
    ];
  }

  if (filter === "activity") {
    return [
      {
        id: 1,
        user: "John Smith",
        action: "Login",
        timestamp: "2024-12-19 10:30 AM",
        ip: "192.168.1.1",
      },
      {
        id: 2,
        user: "Sarah Johnson",
        action: "Purchase",
        timestamp: "2024-12-19 09:15 AM",
        ip: "192.168.1.2",
      },
      {
        id: 3,
        user: "Emily Brown",
        action: "Profile Update",
        timestamp: "2024-12-18 03:45 PM",
        ip: "192.168.1.3",
      },
    ];
  }

  return baseData;
};

const generateDummyBrandsData = (filter) => {
  const baseData = [
    {
      id: 1,
      name: "TechCorp",
      products: 145,
      campaigns: 8,
      balance: "$12,500",
      status: "Active",
    },
    {
      id: 2,
      name: "Fashion Hub",
      products: 230,
      campaigns: 12,
      balance: "$8,300",
      status: "Active",
    },
    {
      id: 3,
      name: "Home Essentials",
      products: 89,
      campaigns: 5,
      balance: "$5,600",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sports World",
      products: 178,
      campaigns: 15,
      balance: "$18,900",
      status: "Active",
    },
  ];

  if (filter === "imports") {
    return [
      {
        id: 1,
        brand: "TechCorp",
        fileName: "products_batch_01.csv",
        items: 45,
        date: "2024-12-18",
        status: "Completed",
      },
      {
        id: 2,
        brand: "Fashion Hub",
        fileName: "winter_collection.xlsx",
        items: 120,
        date: "2024-12-17",
        status: "Processing",
      },
      {
        id: 3,
        brand: "Sports World",
        fileName: "equipment_list.csv",
        items: 67,
        date: "2024-12-16",
        status: "Failed",
      },
    ];
  }

  if (filter === "inventory") {
    return [
      {
        id: 1,
        brand: "TechCorp",
        totalStock: 1250,
        lowStock: 15,
        outOfStock: 3,
        lastUpdate: "2024-12-19",
      },
      {
        id: 2,
        brand: "Fashion Hub",
        totalStock: 2840,
        lowStock: 28,
        outOfStock: 8,
        lastUpdate: "2024-12-18",
      },
      {
        id: 3,
        brand: "Home Essentials",
        totalStock: 890,
        lowStock: 12,
        outOfStock: 2,
        lastUpdate: "2024-12-17",
      },
    ];
  }

  if (filter === "team") {
    return [
      {
        id: 1,
        brand: "TechCorp",
        member: "Alice Johnson",
        role: "Admin",
        email: "alice@techcorp.com",
        joined: "2024-01-15",
      },
      {
        id: 2,
        brand: "TechCorp",
        member: "Bob Smith",
        role: "Manager",
        email: "bob@techcorp.com",
        joined: "2024-03-20",
      },
      {
        id: 3,
        brand: "Fashion Hub",
        member: "Carol White",
        role: "Admin",
        email: "carol@fashionhub.com",
        joined: "2024-02-10",
      },
    ];
  }

  return baseData;
};

const generateDummyCreatorsData = (filter) => {
  if (filter === "linkedStorefront") {
    return [
      {
        id: 1,
        creator: "Jane Influencer",
        storefront: "jane-store",
        products: 45,
        visits: 1250,
        conversionRate: "3.2%",
      },
      {
        id: 2,
        creator: "Mark Creator",
        storefront: "mark-shop",
        products: 32,
        visits: 890,
        conversionRate: "2.8%",
      },
    ];
  }

  if (filter === "referal") {
    return [
      {
        id: 1,
        creator: "Jane Influencer",
        referrals: 125,
        conversions: 45,
        earnings: "$1,250",
        lastReferral: "2024-12-18",
      },
      {
        id: 2,
        creator: "Mark Creator",
        referrals: 89,
        conversions: 32,
        earnings: "$890",
        lastReferral: "2024-12-17",
      },
    ];
  }

  if (filter === "reports") {
    return [
      {
        id: 1,
        creator: "Jane Influencer",
        totalSales: "$45,200",
        avgOrderValue: "$125",
        topProduct: "Product A",
        period: "Dec 2024",
      },
      {
        id: 2,
        creator: "Mark Creator",
        totalSales: "$32,800",
        avgOrderValue: "$98",
        topProduct: "Product B",
        period: "Dec 2024",
      },
    ];
  }

  return null;
};

// ============================================================================
// TABLE COLUMNS
// ============================================================================

const getBuyersColumns = (filter) => {
  if (filter === "suspended") {
    return [
      { header: "Name", key: "name", sortable: true },
      { header: "Email", key: "email", sortable: true },
      { header: "Reason", key: "reason" },
      { header: "Date", key: "date", sortable: true },
      { header: "Duration", key: "duration" },
    ];
  }

  if (filter === "flagged") {
    return [
      { header: "Name", key: "name", sortable: true },
      { header: "Email", key: "email", sortable: true },
      { header: "Flag Reason", key: "flagReason" },
      { header: "Severity", key: "severity", badge: (row) => row.severity },
      { header: "Date", key: "date", sortable: true },
    ];
  }

  if (filter === "activity") {
    return [
      { header: "User", key: "user", sortable: true },
      { header: "Action", key: "action" },
      { header: "Timestamp", key: "timestamp", sortable: true },
      { header: "IP Address", key: "ip" },
    ];
  }

  return [
    {
      header: "Name",
      key: "name",
      sortable: true,
      className: "text-gray-900 font-medium",
      render: (_, row) => (
        <span>
          {`${row.first_name || ""} ${row.last_name || ""}`.trim() ||
            row.name ||
            "N/A"}
        </span>
      ),
    },
    { header: "Email", key: "email", sortable: true },
    { header: "Phone", key: "phone_number" },
    { header: "Total Orders", key: "orders", sortable: true },
    { header: "Total Spent", key: "spent", sortable: true },
    {
      header: "Status",
      key: "role",
      badge: (row) => (row.is_active === false ? "Suspended" : "Active"),
    },
  ];
};

const getBrandsColumns = (filter) => {
  if (filter === "imports") {
    return [
      { header: "Brand", key: "brand", sortable: true },
      { header: "Import Date", key: "importDate" },
      { header: "Products Imported", key: "productsImported", sortable: true },
      { header: "Approve", key: "approve", sortable: true },
      { header: "Pending", key: "pending", sortable: true },
      { header: "Status", key: "status", badge: (row) => row.status },
    ];
  }

  if (filter === "inventory") {
    return [
      { header: "Brand", key: "brand", sortable: true },
      { header: "Total Products", key: "totalProducts", sortable: true },
      { header: "In Stock", key: "inStock", sortable: true },
      { header: "Low Stock", key: "lowStock", sortable: true },
      { header: "Out of Stock ", key: "outOfStock", sortable: true },
      { header: "Inventory Value ", key: "inventoryValue", sortable: true },
    ];
  }

  if (filter === "team") {
    return [
      { header: "Name", key: "name", sortable: true },
      { header: "Brand", key: "brand", sortable: true },
      { header: "Role", key: "role", badge: (row) => row.role },
      { header: "Email", key: "email" },
      { header: "Access Level", key: "accessLevel", sortable: true },
      { header: "Status", key: "status", badge: (row) => row.status },
    ];
  }

  return [
    {
      header: "Brand",
      key: "name",
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
            <Store size={18} className="text-purple-600" />
          </div>
          <span className="font-medium text-gray-900">
            {row.first_name ? `${row.first_name} ${row.last_name}` : row.name}
          </span>
        </div>
      ),
    },
    { header: "Total Products", key: "products", sortable: true },
    { header: "Active Campaigns", key: "campaigns", sortable: true },
    { header: "Wallet Balance", key: "balance", sortable: true },
    {
      header: "Status",
      key: "role",
      badge: (row) => (row.is_active === false ? "Suspended" : "Active"),
    },
  ];
};

const getCreatorsColumns = (filter) => {
  if (filter === "linkedStorefront") {
    return [
      { header: "Creator Name", key: "creator", sortable: true },
      { header: "Storefront Name", key: "storefront" },
      { header: "Products", key: "products", sortable: true },
      { header: "Monthly Sales", key: "monthlySales", sortable: true },
      { header: "Conversion Rate", key: "conversionRate" },
      { header: "Status", key: "status" },
    ];
  }

  if (filter === "referal") {
    return [
      { header: "Creator Name", key: "creator", sortable: true },
      { header: "Total Referrals", key: "referrals", sortable: true },
      { header: "Successful Conversions", key: "conversions", sortable: true },
      { header: "Commision Earned", key: "earnings", sortable: true },
      { header: "Conversion Rate", key: "lastReferral", sortable: true },
    ];
  }

  if (filter === "reports") {
    return [
      { header: "Creator Name", key: "creator", sortable: true },
      { header: "Enaggement Rate ", key: "engagmentRate", sortable: true },
      { header: "Conversion Rate", key: "conversionRate", sortable: true },
      { header: "Customer Satisfaction", key: "customerSatisfaction" },
      { header: "Total Revenue", key: "totalRevenue" },
      { header: "Performance Score ", key: "performanceScore" },
    ];
  }

  return [
    {
      header: "Creator Name",
      key: "name",
      sortable: true,
      className: "text-gray-900 font-medium",
      render: (_, row) => (
        <span>
          {`${row.first_name || ""} ${row.last_name || ""}`.trim() ||
            row.name ||
            "N/A"}
        </span>
      ),
    },
    { header: "Followers", key: "followers", sortable: true },
    { header: "Storefront", key: "storefront", sortable: true },
    {
      header: "Total Sales",
      key: "sales",
      sortable: true,
    },
    {
      header: "Referral Bonus",
      key: "referal_bonus",
      sortable: true,
    },
  ];
};

// ============================================================================
// STATS
// ============================================================================

const creatorsStats = [
  {
    title: "Total Creators",
    value: "1,245",
    change: 8.2,
    description: "+8.2% from last month",
    bgColor: { bgColor: "rgb(244, 232, 255)", textColor: "text-purple-700" },
    Icon: Users,
  },
  {
    title: "Active Creators",
    value: "892",
    change: 12.4,
    description: "+12.4% from last month",
    bgColor: { bgColor: "rgb(235, 247, 250)", textColor: "text-blue-700" },
    Icon: Users,
  },
  {
    title: "Total Products",
    value: "15,678",
    change: 5.1,
    description: "+5.1% from last month",
    bgColor: { bgColor: "rgb(235, 253, 245)", textColor: "text-green-700" },
    Icon: Tag,
  },
  {
    title: "Total Revenue",
    value: "$5.8M",
    change: 16.8,
    description: "+16.8% from last month",
    bgColor: { bgColor: "rgb(255, 249, 229)", textColor: "text-yellow-700" },
    Icon: DollarSign,
  },
];

const brandsStats = [
  {
    title: "Total Brands",
    value: "1,245",
    change: 8.2,
    description: "+8.2% from last month",
    bgColor: { bgColor: "rgb(244, 232, 255)", textColor: "text-purple-700" },
    Icon: Building2,
  },
  {
    title: "Total Products",
    value: "15,678",
    change: 12.4,
    description: "+12.4% from last month",
    bgColor: { bgColor: "rgb(235, 247, 250)", textColor: "text-blue-700" },
    Icon: Tag,
  },
  {
    title: "Active Campaigns",
    value: "156",
    change: 5.1,
    description: "+5.1% from last month",
    bgColor: { bgColor: "rgb(235, 253, 245)", textColor: "text-green-700" },
    Icon: Store,
  },
  {
    title: "Total Wallet Balance",
    value: "$5.8M",
    change: 16.8,
    description: "+16.8% from last month",
    bgColor: { bgColor: "rgb(255, 249, 229)", textColor: "text-yellow-700" },
    Icon: DollarSign,
  },
];

// ============================================================================
// DROPDOWN FILTER OPTIONS
// ============================================================================
// Filter configurations for different roles
const filterConfigs = {
  buyers: [
    {
      type: "dropdown",
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
      ],
    },
    {
      type: "range",
      minKey: "minSpent",
      maxKey: "maxSpent",
      label: "Total Spent",
    },
    {
      type: "range",
      minKey: "minOrders",
      maxKey: "maxOrders",
      label: "Total Orders",
    },
  ],
  creators: [
    {
      type: "dropdown",
      key: "verified",
      label: "Status",
      options: [
        { label: "All Status", value: "allStatus" },
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Suspended", value: "false" },
      ],
    },
    {
      type: "dropdown",
      key: "storefrontStatus",
      label: "Storefront Status",
      options: [
        { label: "All", value: "all" },
        { label: "With Storefront", value: "withStorefront" },
        { label: "Without Storefront", value: "withoutStorefront" },
      ],
    },
    {
      type: "dropdown",
      key: "verifiedStatus",
      label: "Verified Status",
      options: [
        { label: "All", value: "all" },
        { label: "Verified", value: "withVerified" },
        { label: "Not Verified", value: "withoutVerified" },
      ],
    },
    {
      type: "range",
      minKey: "minFollowers",
      maxKey: "maxFollowers",
      label: "Follower Range",
      disabled: true,
    },
    {
      type: "range",
      minKey: "minSales",
      maxKey: "maxSales",
      label: "Sales Range",
      disabled: true,
    },
  ],
  brands: [
    {
      type: "dropdown",
      key: "plan",
      label: "Status",
      options: [
        { label: "All Status", value: "allStatus" },
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Suspended", value: "suspended" },
      ],
    },

    {
      type: "range",
      minKey: "minProducts",
      maxKey: "maxProducts",
      label: "Product Count",
      disabled: true,
    },
    {
      type: "range",
      minKey: "minCampaign",
      maxKey: "maxCampaign",
      label: "Campaign Count",
      disabled: true,
    },
    {
      type: "range",
      minKey: "minBalance",
      maxKey: "maxBalance",
      label: "Wallet Balance",
      disabled: true,
    },
    {
      type: "dropdown",
      key: "plan",
      label: "Date Joined",
      options: [{ label: "All Time", value: "allTime" }],
    },
  ],
};
const dropdownFilterMap = {
  buyers: [
    { label: "Active Users", value: "Active" },
    { label: "Suspended Users", value: "Suspended" },
  ],
  creators: [
    { label: "Verified Creators", value: "verified" },
    { label: "Active Creators", value: "Active" },
  ],
  brands: [
    { label: "Active Brands", value: "Active" },
    { label: "Pending Brands", value: "Pending" },
  ],
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function UserManagementPage() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || DEFAULT_TAB;
  const currentFilter = searchParams.get("filter") || "all";
  const pageCopy = {
    buyers: {
      title: "User Management",
      subtitle: "Manage all platform users and buyers",
      exportLabel: "Export Users",
    },
    creators: {
      title: "Creator Management",
      subtitle: "Manage all platform creators",
      exportLabel: "Export Creators",
    },
    brands: {
      title: "Brand Management",
      subtitle: "Manage brands and their products",
      exportLabel: "Export Brands",
    },
  };
  const { title: pageTitle, subtitle, exportLabel } = pageCopy[currentType];
  const [selectedFilters, hSelectedFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showStorefrontModal, setShowStorefrontModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCreatorDetailsModal, setShowCreatorDetailsModal] = useState(false);
  const [showBrandDetailsModal, setShowBrandDetailsModal] = useState(false);
  const [showBrandWalletModal, setShowBrandWalletModal] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    dateJoined: "",
    minSpent: "", // Initialize as empty string, not undefined
    maxSpent: "",
    minOrders: "",
    maxOrders: "",
    // Add creator/brand specific keys here as well
    minFollowers: "",
    maxFollowers: "",
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    limit: 20,
    search: "",
    date_from: null,
    date_to: null,
    role: ROLE_MAP[currentType],
  });

  useEffect(() => {
    console.log("Current Tab:", currentType);
    console.log("Mapped Role:", ROLE_MAP[currentType]);
    console.log("Query Sent:", query);
  }, [currentType, query]);

  const useRealData = currentFilter === "all";

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      role: ROLE_MAP[currentType],
      page: 1,
    }));
  }, [currentType]);

  const { users, loading, pagination } = useUserList(
    useRealData ? query : { role: ROLE_MAP[currentType], page: 1, limit: 20 }
  );

  const tableData = useMemo(() => {
    if (useRealData) return users;

    if (currentType === "buyers") return generateDummyBuyersData(currentFilter);
    if (currentType === "brands") return generateDummyBrandsData(currentFilter);
    if (currentType === "creators")
      return generateDummyCreatorsData(currentFilter);
    return [];
  }, [currentType, currentFilter, useRealData, users]);

  const tableColumns = useMemo(() => {
    if (currentType === "buyers") return getBuyersColumns(currentFilter);
    if (currentType === "brands") return getBrandsColumns(currentFilter);
    if (currentType === "creators") return getCreatorsColumns(currentFilter);
    return [];
  }, [currentType, currentFilter]);

  const getRowActions = useMemo(() => {
    const registry = {
      buyers: {
        all: [
          { key: "view", label: "View Details" },
          { key: "email", label: "Send Email" },
          { key: "suspend", label: "Suspend User", danger: true },
        ],
        suspended: [
          { key: "view", label: "View Details" },
          { key: "unsuspend", label: "Unsuspend User" },
        ],
        flagged: [
          { key: "view", label: "View Details" },
          { key: "investigate", label: "Investigate" },
          { key: "clear", label: "Clear Flag" },
        ],
      },

      creators: {
        all: [
          { key: "view", label: "View Creator" },
          { key: "activeCampaign", label: "Assign Campaign" },
          { key: "manageStorefront", label: "Manage Storefront" },
          { key: "suspend", label: "Suspend Creator", danger: true },
        ],
        linkedStorefront: [
          { key: "view", label: "View Creator" },
          { key: "manageStorefront", label: "Manage Storefront" },
        ],
        referal: [
          { key: "view", label: "View Creator" },
          { key: "export", label: "Export Referral Data" },
        ],
        reports: [
          { key: "view", label: "View Creator" },
          { key: "export", label: "Export Report" },
        ],
      },

      brands: {
        all: [
          { key: "view", label: "View Details" },
          { key: "manageCampaign", label: "Manage Campaign" },
          { key: "viewWallet", label: "View Wallet" },

          { key: "suspend", label: "Suspend Brand", danger: true },
        ],

        imports: [
          { key: "view", label: "View Import" },
          { key: "download", label: "Download File" },
        ],
        inventory: [{ key: "view", label: "View Inventory" }],
        team: [{ key: "view", label: "View Team Member" }],
      },
    };

    return (
      registry[currentType]?.[currentFilter] || registry[currentType]?.all || []
    );
  }, [currentType, currentFilter]);

  const handleRowAction = useCallback(
    (actionKey, row) => {
      setSelectedUser(row);

      const actionMap = {
        view: () => {
          if (currentType === "creators") {
            setShowCreatorDetailsModal(true);
          } else if (currentType === "brands") {
            setShowBrandDetailsModal(true);
          } else {
            setShowUserModal(true);
          }
        },

        email: () => setShowEmailModal(true),

        suspend: () => setShowStatusModal(true),
        unsuspend: () => setShowStatusModal(true),

        activeCampaign: () => setShowCampaignModal(true),

        manageStorefront: () => setShowStorefrontModal(true),
        viewWallet: () => setShowBrandWalletModal(true),
        manageCampaign: () => setShowCampaignModal(true),
        export: () => console.log("Export action", row),

        investigate: () => console.log("Investigate", row),
        clear: () => console.log("Clear flag", row),
        download: () => console.log("Download", row),
      };

      actionMap[actionKey]?.();
    },
    [currentType]
  );

  const handleExport = async (options) => {
    console.log("Exporting with options:", options);
  };

  const stats =
    currentType === "creators"
      ? creatorsStats
      : currentType === "brands"
      ? brandsStats
      : [];
  const basePath = `/users?type=${currentType}`;
  const filterList =
    currentType === "brands"
      ? brandFilters
      : currentType === "creators"
      ? creatorFilters
      : userFilters;

  const activeFilters = filterList.map((f) => ({
    ...f,
    href: `${basePath}&filter=${f.value}`,
  }));

  const searchPlaceholder = `Search ${
    currentType === "buyers" ? "users" : currentType
  }...`;
  const tableTitle =
    currentType === "buyers"
      ? "All Users"
      : currentType === "creators"
      ? "All Creators"
      : "All Brands";

  // Determine if the current tab is a linked tab for creators
  const isLinkedStoreFront = currentFilter === "linkedStorefront";
  const isreferalTab = currentFilter === "referal";
  const isReportsTab = currentFilter === "reports";

  const isLinkedTab =
    currentType === "creators" &&
    (isLinkedStoreFront || isreferalTab || isReportsTab);

  const isTeamMembers = currentFilter === "team";
  const isProductsImport = currentFilter === "imports";
  const isInventoryOverview = currentFilter === "inventory";

  const isBrandsTab =
    currentType === "brands" &&
    (isTeamMembers || isProductsImport || isInventoryOverview);

  return (
    <main className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
        <button
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setExportOpen(true)}
        >
          <Download size={18} />
          {exportLabel}
        </button>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      )}

      <PillFilterGroup active={currentFilter} items={activeFilters} />

      {showFilterDropdown && (
        <TableFilterDropdown
          options={dropdownFilterMap[currentType] || []}
          selected={selectedFilters}
          onToggle={(v) =>
            setSelectedFilters((p) =>
              p.includes(v) ? p.filter((x) => x !== v) : [...p, v]
            )
          }
          onClose={() => setShowFilterDropdown(false)}
        />
      )}

      <GenericTable
        title={tableTitle}
        columns={tableColumns}
        data={tableData}
        loading={useRealData ? loading : false}
        showSearch={!isLinkedTab && !isBrandsTab}
        showFilter={!isLinkedTab && !isBrandsTab}
        showActions={!isLinkedTab && !isBrandsTab}
        searchPlaceholder={searchPlaceholder}
        onFilterClick={() => setShowFilterModal(true)}
        pagination={
          useRealData
            ? pagination
            : { currentPage: 1, totalPages: 1, totalItems: tableData.length }
        }
        onSearch={(value) =>
          useRealData && setQuery((q) => ({ ...q, page: 1, search: value }))
        }
        onPageChange={(page) =>
          useRealData && setQuery((q) => ({ ...q, page }))
        }
        rowActions={getRowActions}
        onActionClick={handleRowAction}
        actionsVariant="dropdown"
      />

      <GenericFilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => {
          // This will now trigger your useUserList hook because 'filters' is a dependency
          console.log("Applying filters:", filters);
          setShowFilterModal(false);
        }}
        // Dynamically provide fields based on current tab
        fields={filterConfigs[currentType] || filterConfigs.buyers}
        title={`Filter ${
          currentType.charAt(0).toUpperCase() + currentType.slice(1)
        }`}
      />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        config={exportConfigs[currentType]}
        onExport={(data) => console.log("Exporting:", data)}
      />

      {/* Real Data Modals for All Roles */}
      {useRealData && (
        <>
          <UserDetailsModal
            open={showUserModal}
            onClose={() => {
              setShowUserModal(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          />
          <SendEmailModal
            open={showEmailModal}
            onClose={() => {
              setShowEmailModal(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          />
          {/* <UserStatusModal
            open={showStatusModal}
            onClose={() => {
              setShowStatusModal(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          /> */}
          <UserStatusModal
            open={showStatusModal}
            onClose={() => setShowStatusModal(false)}
            user={selectedUser}
            userType={currentType} // "buyers", "creators", or "brands"
            mode={selectedUser?.is_active ? "suspend" : "suspend"}
            onConfirm={(data) => handleStatusUpdate(data)}
          />
          <AssignCampaignModal
            open={showCampaignModal}
            onClose={() => setShowCampaignModal(false)}
            user={selectedUser}
          />

          <ManageStorefrontModal
            open={showStorefrontModal}
            onClose={() => setShowStorefrontModal(false)}
            user={selectedUser}
          />
          <CreatorDetailsModal
            open={showCreatorDetailsModal}
            onClose={() => setShowCreatorDetailsModal(false)}
            creator={selectedUser}
          />
          <BrandDetailsModal
            open={showBrandDetailsModal}
            onClose={() => setShowBrandDetailsModal(false)}
            brand={selectedUser}
          />
          <BrandWalletModal
            open={showBrandWalletModal}
            onClose={() => setShowBrandWalletModal(false)}
            brand={selectedUser}
          />
        </>
      )}
    </main>
  );
}
