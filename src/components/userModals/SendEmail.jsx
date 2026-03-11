"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

export default function SendEmailModal({ open, onClose, user, onSend }) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL_EMAIL ||
    "http://localhost:9292/api/send-email";
  const [form, setForm] = useState({
    to: user?.email || "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSend = async () => {
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: user.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Email Sent");
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Send Email"
      subtitle="Send a direct message to this user"
      size="md"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Mail size={16} />
            {loading ? "Sending..." : "Send Email"}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            name="to"
            value={user?.email}
            disabled
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter email subject"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}
