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
        key: "status",
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
      campaignData: true,
      walletTransactions: true,
      teamMembers: true,
    },
    selects: [],
    selectDefaults: {},
  },
  storefront: {
    selects: [
      {
        key: "reportType",
        label: "Report Type",
        options: [
          { label: "All Storefront", value: "all" },
          { label: "Active", value: "active" },
          { label: "Suspended", value: "suspended" },
        ],
        selectDefaults: { status: "all" },
      },
      {
        key: "status",
        label: "Date Range",
        options: [
          { label: "All", value: "all" },
          { label: "One week ago", value: "oneWeekAgo" },
          { label: "One month ago", value: "oneMonthAgo" },
          { label: "One year ago", value: "oneYearAgo" },
        ],
        selectDefaults: { status: "all" },
      },
    ],
  },
  productListings: {
    selects: [
      {
        key: "productScope",
        label: "Product Selection",
        options: [
          { label: "All Products", value: "all" },
          { label: "Selected Products", value: "selected" },
        ],
        selectDefaults: { status: "all" },
      },
    ],
    checkboxes: {
      productDetails: true,
      priceInformation: true,
      stockLevels: false,
      brandInformation: false,
    },
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
        selectDefaults: { status: "all" },
      },
    ],
  },
};
