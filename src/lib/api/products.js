const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api/admin";

export async function fetchProductList(query = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Authentication token not found.");

  const params = new URLSearchParams({
    page: query.page || 1,
    limit: query.limit || 20,
    ...(query.filter && { filter: query.filter }),
    ...(query.search && { search: query.search }),
    ...(query.status && { status: query.status }),
    ...(query.category_id && { category_id: query.category_id }),
    ...(query.brand_id && { brand_id: query.brand_id }),
    ...(query.minPrice && { minPrice: query.minPrice }),
    ...(query.maxPrice && { maxPrice: query.maxPrice }),
  });

  const res = await fetch(`${BASE_URL}/products?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
  return res.json();
}
export async function updateProductDetails(id, formData) {
  const token = localStorage.getItem("admin_token");
  console.log("=== UPDATE PRODUCT API CALL ===");
  console.log("Product ID:", id);
  console.log("Form Data:", formData);
  console.log("URL:", `${BASE_URL}/products/${id}`);
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  // NEW DEBUGGING LOGIC
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({})); // Try to parse error JSON
    console.error("Server Error Data:", errorData); // Look at this in Browser Console
    throw new Error(errorData.message || "Failed to update product");
  }

  return res.json();
}
