// src/lib/services/exportService.js
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Field mapping for each entity type
 * Maps checkbox keys to actual data fields
 */
const FIELD_MAPPINGS = {
  buyers: {
    basicInformation: [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "created_at",
    ],
    contactDetails: [
      "email",
      "phone_number",
      "address",
      "city",
      "state",
      "country",
    ],
    orderHistory: ["total_orders", "total_spent", "recentOrders"],
    supportTickets: ["support_tickets"],
  },
  creators: {
    basicInformation: [
      "id",
      "first_name",
      "last_name",
      "email",
      "username",
      "created_at",
    ],
    performanceMetrics: ["total_sales", "storefront", "followers"],
    salesData: ["total_sales", "referal_bonus"],
    campaignHistory: ["campaigns"],
    RefferalData: ["referral_code", "referred_by"],
  },
  brands: {
    basicInformation: [
      "id",
      "first_name",
      "last_name",
      "business_name",
      "email",
      "created_at",
    ],
    productStatistics: ["total_products", "recentProducts"],
    walletTransactions: [
      "wallet_balance",
      "brand_wallet",
      "recentTransactions",
    ],
  },
  storefront: {
    // ✅ All possible fields for storefront
    all: ["id", "name", "description", "user_id", "is_public", "created_at"],
    basicInformation: ["id", "name", "description", "user_id", "created_at"],
    active: ["id", "name", "description", "user_id", "created_at"],
    suspended: ["id", "name", "description", "user_id", "created_at"],
  },
  productListings: {
    all: [
      "id",
      "name",
      "description",
      "sku",
      "price",
      "discount",
      "quantity",
      "status",
      "category_id",
      "brand_id",
    ],
    productDetails: ["id", "name", "description", "sku", "category_id"],
    priceInformation: ["price", "discount"],
    stockLevels: ["quantity", "status"],
    brandInformation: ["brand_id", "brandOwner"],
  },
  orders: {
    all: ["id", "order_code", "user_id", "grand_total", "status", "created_at"],
    orderDetails: ["id", "order_code", "user_id", "created_at"],
    priceInformation: ["grand_total", "status"],
    customerInfo: ["buyer"],
  },
};

/**
 * Column headers for export
 */
const COLUMN_HEADERS = {
  id: "ID",
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  phone_number: "Phone",
  username: "Username",
  created_at: "Date Joined",
  address: "Address",
  city: "City",
  state: "State",
  country: "Country",
  business_name: "Business Name",
  storefront: "Storefront",
  total_sales: "Total Sales",
  total_orders: "Total Orders",
  total_spent: "Total Spent",
  total_products: "Total Products",
  wallet_balance: "Wallet Balance",
  followers: "Followers",
  referal_bonus: "Referral Bonus",
  referral_code: "Referral Code",
  referred_by: "Referred By",
  name: "Name",
  description: "Description",
  sku: "SKU",
  price: "Price",
  discount: "Discount",
  quantity: "Stock",
  status: "Status",
  category_id: "Category",
  brand_id: "Brand ID",
  order_code: "Order Code",
  grand_total: "Total Amount",
  user_id: "User ID",
  is_public: "Public",
};

/**
 * Get selected fields based on checkbox selections OR dropdown selections
 */
function getSelectedFields(
  entityType,
  fieldSelections,
  dropdownSelections = {},
) {
  const mapping = FIELD_MAPPINGS[entityType];
  if (!mapping) return [];

  const selectedFields = [];

  console.log("=== GET SELECTED FIELDS ===");
  console.log("Entity Type:", entityType);
  console.log("Field Selections:", fieldSelections);
  console.log("Dropdown Selections:", dropdownSelections);

  // ✅ Check if fieldSelections is empty or has only boolean values
  const hasCheckboxes =
    Object.keys(fieldSelections).length > 0 &&
    Object.values(fieldSelections).some((val) => typeof val === "boolean");

  console.log("Has Checkboxes:", hasCheckboxes);

  if (hasCheckboxes) {
    // Original checkbox logic
    Object.entries(fieldSelections).forEach(([key, isSelected]) => {
      if (isSelected && mapping[key]) {
        selectedFields.push(...mapping[key]);
      }
    });
  } else {
    // ✅ Handle dropdown-only configs
    console.log("Using dropdown-only logic");

    // Check if reportType dropdown has a value
    if (dropdownSelections.reportType) {
      const reportTypeValue = dropdownSelections.reportType;
      console.log("Report Type Value:", reportTypeValue);

      if (mapping[reportTypeValue]) {
        selectedFields.push(...mapping[reportTypeValue]);
      } else if (reportTypeValue === "all" && mapping.all) {
        selectedFields.push(...mapping.all);
      }
    }

    // Check if productScope dropdown has a value
    if (dropdownSelections.productScope) {
      const scopeValue = dropdownSelections.productScope;
      console.log("Product Scope Value:", scopeValue);

      if (scopeValue === "all" && mapping.all) {
        selectedFields.push(...mapping.all);
      }
    }

    // Check if orderStatus dropdown has a value
    if (dropdownSelections.orderStatus) {
      const statusValue = dropdownSelections.orderStatus;
      console.log("Order Status Value:", statusValue);

      if (statusValue === "all" && mapping.all) {
        selectedFields.push(...mapping.all);
      }
    }

    // ✅ FALLBACK: If still no fields selected, export all available fields
    if (selectedFields.length === 0 && mapping.all) {
      console.log("No specific selection, using 'all' fields");
      selectedFields.push(...mapping.all);
    }
  }

  console.log("Final Selected Fields:", selectedFields);

  // Remove duplicates
  return [...new Set(selectedFields)];
}

/**
 * Flatten nested data for export
 */
function flattenData(data, selectedFields) {
  return data.map((item) => {
    const flattened = {};

    selectedFields.forEach((field) => {
      if (field.includes(".")) {
        const parts = field.split(".");
        let value = item;
        parts.forEach((part) => {
          value = value?.[part];
        });
        flattened[field] = value || "N/A";
      } else if (field === "recentOrders") {
        flattened["Recent Orders Count"] = item.recentOrders?.length || 0;
      } else if (field === "recentProducts") {
        flattened["Recent Products Count"] = item.recentProducts?.length || 0;
      } else if (field === "recentTransactions") {
        flattened["Recent Transactions Count"] =
          item.recentTransactions?.length || 0;
      } else if (field === "brand_wallet") {
        if (item.brand_wallet) {
          flattened["Total Earned"] = item.brand_wallet.total_earned || 0;
          flattened["Pending"] = item.brand_wallet.pending || 0;
          flattened["Withdrawn"] = item.brand_wallet.withdrawn || 0;
        }
      } else {
        flattened[COLUMN_HEADERS[field] || field] = item[field] || "N/A";
      }
    });

    return flattened;
  });
}

/**
 * Apply date range filter
 */
function applyDateFilter(data, dateRange) {
  if (!dateRange || dateRange === "all") return data;

  const now = new Date();
  let startDate;

  switch (dateRange) {
    case "oneWeekAgo":
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case "oneMonthAgo":
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case "oneYearAgo":
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      return data;
  }

  return data.filter((item) => {
    const itemDate = new Date(item.created_at);
    return itemDate >= startDate;
  });
}

/**
 * Export to CSV
 */
function exportToCSV(data, filename) {
  if (!data.length) {
    alert("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}

/**
 * Export to Excel
 */
function exportToExcel(data, filename) {
  if (!data.length) {
    alert("No data to export");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const maxWidth = 50;
  const colWidths = Object.keys(data[0]).map((key) => ({
    wch: Math.min(
      Math.max(key.length, ...data.map((row) => String(row[key] || "").length)),
      maxWidth,
    ),
  }));
  worksheet["!cols"] = colWidths;

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Export to PDF
 */
function exportToPDF(data, filename, title) {
  if (!data.length) {
    alert("No data to export");
    return;
  }

  const doc = new jsPDF("l", "mm", "a4");

  doc.setFontSize(16);
  doc.text(title, 14, 15);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

  const headers = Object.keys(data[0]);
  const rows = data.map((row) => headers.map((header) => row[header]));

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 28,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [147, 51, 234] },
  });

  doc.save(`${filename}.pdf`);
}

/**
 * Main export function
 */
export async function handleExport({
  entityType,
  data,
  format,
  fields,
  selections = {},
  filename,
}) {
  try {
    console.log("=== EXPORT DEBUG ===");
    console.log("Entity Type:", entityType);
    console.log("Fields:", fields);
    console.log("Selections:", selections);

    // ✅ UPDATED: Pass selections to getSelectedFields
    const selectedFields = getSelectedFields(entityType, fields, selections);

    console.log("Selected Fields:", selectedFields);

    if (selectedFields.length === 0) {
      alert("Please select at least one field to export");
      return;
    }

    // 2. Apply filters (date range, status, etc.)
    let filteredData = [...data];

    // Apply date range filter
    if (selections.status) {
      filteredData = applyDateFilter(filteredData, selections.status);
    }
    if (selections.dateRange) {
      filteredData = applyDateFilter(filteredData, selections.dateRange);
    }

    // Apply status filter for storefronts
    if (selections.reportType && selections.reportType !== "all") {
      if (selections.reportType === "active") {
        filteredData = filteredData.filter((item) => item.is_public === true);
      } else if (selections.reportType === "suspended") {
        filteredData = filteredData.filter((item) => item.is_public === false);
      }
    }

    // Apply order status filter
    if (selections.orderStatus && selections.orderStatus !== "all") {
      filteredData = filteredData.filter(
        (item) => item.status?.toLowerCase() === selections.orderStatus,
      );
    }

    console.log("Filtered Data Count:", filteredData.length);

    // 3. Flatten data
    const flattenedData = flattenData(filteredData, selectedFields);

    if (flattenedData.length === 0) {
      alert("No data matches the selected filters");
      return;
    }

    // 4. Export based on format
    const finalFilename = filename || `${entityType}_export_${Date.now()}`;
    const title = `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} Export`;

    switch (format) {
      case "csv":
        exportToCSV(flattenedData, finalFilename);
        break;
      case "xlsx":
        exportToExcel(flattenedData, finalFilename);
        break;
      case "pdf":
        exportToPDF(flattenedData, finalFilename, title);
        break;
      default:
        console.error("Unsupported export format:", format);
    }

    console.log(
      `✅ Exported ${flattenedData.length} ${entityType} records as ${format}`,
    );
  } catch (error) {
    console.error("Export error:", error);
    alert("Failed to export data. Please try again.");
  }
}
