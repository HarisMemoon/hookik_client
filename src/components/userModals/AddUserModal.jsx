import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal";
import Dropdown from "@/components/ui/DropDown";
import CustomPhoneInput from "@/components/ui/PhoneInput"; // Adjust path as needed
import { toast } from "react-hot-toast";
import { createUser, updateUser } from "@/lib/api/users";
import { Info, Eye, ImageUp } from "lucide-react";

export default function AddUserModal({
  open,
  onClose,
  user,
  type,
  role = "seller",
}) {
  const fileInputRef = useRef(null);

  const initialState = {
    profile_picture: null,
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    gender: "",
    business_name: "",
    business_address: "",
    business_reg_no: "",
    country: "",
    state: "",
    city: "",
    role: role,
    status: "active",
  };
  console.log(user);

  const [formData, setFormData] = useState(initialState);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const sanitizedGender =
        user.gender && user.gender !== "null" ? user.gender.toLowerCase() : "";
      const sanitizedUser = {};
      Object.keys(initialState).forEach((key) => {
        // If the user object has the key and it's not null/undefined, use it.
        // Otherwise, fall back to an empty string.
        sanitizedUser[key] =
          user[key] !== null && user[key] !== undefined ? user[key] : "";
      });

      setFormData({
        ...initialState,
        ...sanitizedUser,
        gender: sanitizedGender,
      });

      if (user.profile_picture && typeof user.profile_picture === "string") {
        setPreviewUrl(user.profile_picture); // Use URL directly
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFormData(initialState);
      setPreviewUrl(null);
    }
  }, [user, open]);
  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_picture: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ===== VALIDATION =====
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.first_name.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Only validate password on create OR if user entered one in edit
    if (!user || formData.password) {
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters and include an uppercase letter, number, and special character",
        );
        return;
      }
    }
    if (!formData.first_name || !formData.email) {
      toast("Please fill in the required details.", {
        icon: <Info className="w-4 h-4 text-yellow-500" />,
      });
      return;
    }

    try {
      const submissionData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          key !== "profile_picture" &&
          formData[key] !== null &&
          formData[key] !== ""
        ) {
          submissionData.append(key, formData[key]);
        }
      });

      submissionData.set("role", role);

      if (formData.profile_picture instanceof File) {
        submissionData.append("profile_picture", formData.profile_picture);
      }

      if (user) {
        // Edit mode — user prop exists
        await updateUser(user.id, submissionData);
        toast.success(`${role} updated successfully`);
      } else {
        // Create mode
        await createUser(submissionData);
        toast.success(`${role} created successfully`);
      }

      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Submit Error:", error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const footer = (
    <div className="flex justify-end gap-3 w-full  pt-4">
      <button
        onClick={onClose}
        className="px-6 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition text-black"
      >
        Close
      </button>
      <button
        className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </>
        ) : type === "add" ? (
          `Add ${role === "seller" ? "Brand" : "Influencer"}`
        ) : (
          `Edit ${role === "seller" ? "Brand" : "Influencer"}`
        )}
      </button>
    </div>
  );

  const labelStyles =
    "block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tight";
  const inputStyles =
    "w-full px-3 py-2 text-sm rounded-lg outline-none transition-all text-black border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500";

  const countryOptions = [
    { label: "Nigeria", value: "Nigeria" },
    { label: "Pakistan", value: "Pakistan" },
  ];
  const stateOptions = [
    { label: "Lagos", value: "Lagos" },
    { label: "Islamabad", value: "Islamabad" },
  ];
  const cityOptions = [
    { label: "Ikeja", value: "Ikeja" },
    { label: "I-8", value: "I-8" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        type === "add"
          ? `Add ${role === "seller" ? "Brand" : "Influencer"}`
          : `Edit ${role === "seller" ? "Brand" : "Influencer"}`
      }
      size="lg"
      footer={footer}
    >
      <div className="text-black">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="relative w-16 h-16 rounded-full bg-white border-2 border-purple-100 overflow-hidden flex items-center justify-center ">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300 text-2xl font-bold">
                {" "}
                <ImageUp
                  size={20}
                  className="text-gray-500 hover:text-gray-700"
                />
              </span>
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-700">Profile Image</h4>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-xs font-bold text-purple-700 hover:text-purple-700 underline"
            >
              Change Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
          {/* --- Column 1: Personal Info --- */}
          <section className="space-y-4">
            <h3 className="text-sm font-black text-purple-700 border-b border-purple-50 pb-1">
              Personal Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyles}>First Name</label>
                <input
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className={inputStyles}
                />
              </div>
              <div>
                <label className={labelStyles}>Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Ele"
                  className={inputStyles}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className={labelStyles}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={inputStyles}
                />
              </div>

              <label className={labelStyles}>Password</label>
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full max-w-md">
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    required={type === "add"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={inputStyles}
                    placeholder="Enter your password"
                  />

                  {/* Icon stays inside the input */}
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    <Eye
                      size={20}
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelStyles}>Residential Address</label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="67, Allen Avenue, Ikeja"
                  className={inputStyles}
                />
              </div>
              {/* --- In the Personal Information Grid --- */}
              <div>
                <CustomPhoneInput
                  label="Phone Number"
                  value={formData.phone_number}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, phone_number: val }))
                  }
                />
              </div>
              <div>
                <label className={labelStyles}>Gender</label>
                <div className="flex gap-4 p-2 rounded-lg">
                  {["male", "female"].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-600 uppercase"
                    >
                      <input
                        type="radio"
                        name="gender"
                        // Set value simply to "male" or "female"
                        value={g}
                        // This determines which one looks selected based on your fetched data
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="accent-purple-700"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- Column 2: Business Info --- */}
          <section className="space-y-4">
            <h3 className="text-sm font-black text-purple-700 border-b border-purple-50 pb-1">
              {role === "seller" ? "Business Details" : "Residential Details"}
            </h3>
            {role === "seller" && (
              <div className="space-y-3">
                <div>
                  <label className={labelStyles}>Business Name</label>
                  <input
                    name="business_name"
                    type="text"
                    value={formData.business_name}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label className={labelStyles}>Business Address</label>
                  <input
                    name="business_address"
                    type="text"
                    value={formData.business_address}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelStyles}>Registration No. (CAC)</label>
                  <input
                    name="business_reg_no"
                    type="text"
                    value={formData.business_reg_no}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyles}>Country</label>
                <Dropdown
                  options={countryOptions}
                  value={formData.country}
                  onChange={(v) => setFormData({ ...formData, country: v })}
                  label="Country"
                />
              </div>
              <div>
                <label className={labelStyles}>State</label>
                <Dropdown
                  options={stateOptions}
                  value={formData.state}
                  onChange={(v) => setFormData({ ...formData, state: v })}
                  label="State"
                />
              </div>
              <div className="col-span-2">
                <label className={labelStyles}>City</label>
                <Dropdown
                  options={cityOptions}
                  value={formData.city}
                  onChange={(v) => setFormData({ ...formData, city: v })}
                  label="City"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
}
