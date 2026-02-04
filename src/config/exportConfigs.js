// src/config/exportConfigs.js
export const exportConfigs = {
  buyers: {
    checkboxes: {
      basicInformation: true,
      contactDetails: true,
      orderHistory: true,
      supportTickets: true,
    },
    selects: [
      {
        key: "dateRange",
        label: "Date Range",
        options: [
          { label: "All", value: "all" },
          { label: "One week ago", value: "oneWeekAgo" },
          { label: "One month ago", value: "oneMonthAgo" },
          { label: "One year ago", value: "oneYearAgo" },
        ],
      },
    ],
    selectDefaults: { status: "all" },
  },

  creators: {
    checkboxes: {
      basicInformation: true,
      performanceMetrics: true,
      salesData: true,
      campaignHistory: true,
      RefferalData: true,
    },
  },

  brands: {
    checkboxes: {
      basicInformation: true,
      productStatistics: true,
      walletTransactions: true,
    },
    selects: [],
    selectDefaults: {},
  },

  // ✅ FIXED: Dropdown-only config
  storefront: {
    selects: [
      {
        key: "reportType",
        label: "Report Type",
        options: [
          { label: "All Storefronts", value: "all" }, // ✅ Maps to FIELD_MAPPINGS.storefront.all
          { label: "Active", value: "active" }, // ✅ Maps to FIELD_MAPPINGS.storefront.active
          { label: "Suspended", value: "suspended" }, // ✅ Maps to FIELD_MAPPINGS.storefront.suspended
        ],
      },
      {
        key: "dateRange",
        label: "Date Range",
        options: [
          { label: "All", value: "all" },
          { label: "One week ago", value: "oneWeekAgo" },
          { label: "One month ago", value: "oneMonthAgo" },
          { label: "One year ago", value: "oneYearAgo" },
        ],
      },
    ],
    selectDefaults: { reportType: "all", status: "all" },
  },

  productListings: {
    selects: [
      {
        key: "productScope",
        label: "Product Selection",
        options: [{ label: "All Products", value: "all" }],
      },
    ],
    checkboxes: {
      productDetails: true,
      priceInformation: true,
      stockLevels: false,
      brandInformation: false,
    },
    selectDefaults: { productScope: "all" },
  },

  orders: {
    selects: [
      {
        key: "orderStatus",
        label: "Order Status",
        options: [
          { label: "All", value: "all" },
          { label: "Completed", value: "completed" },
          { label: "Disputed", value: "disputed" },
        ],
      },
      {
        key: "dateRange",
        label: "Date Range",
        options: [
          { label: "All", value: "all" },
          { label: "One week ago", value: "oneWeekAgo" },
          { label: "One month ago", value: "oneMonthAgo" },
          { label: "One year ago", value: "oneYearAgo" },
        ],
      },
    ],
    selectDefaults: { orderStatus: "all", dateRange: "all" },
  },
};
