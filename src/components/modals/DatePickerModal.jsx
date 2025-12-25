"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Date range picker modal with calendar interface
 * @param {boolean} open - Modal visibility state
 * @param {function} onClose - Close handler
 * @param {object} dateRange - Current date range {startDate, endDate}
 * @param {function} onApply - Apply handler (receives {startDate, endDate})
 */
export default function DatePickerModal({ open, onClose, dateRange, onApply }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(
    dateRange?.startDate ? new Date(dateRange.startDate) : null
  );
  const [selectedEnd, setSelectedEnd] = useState(
    dateRange?.endDate ? new Date(dateRange.endDate) : null
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const days = [];

    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = adjustedStart - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Start new selection
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      // Complete the range
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  };

  const isDateInRange = (date) => {
    if (!selectedStart || !selectedEnd) return false;
    return date >= selectedStart && date <= selectedEnd;
  };

  const isDateSelected = (date) => {
    if (!selectedStart) return false;
    if (!selectedEnd) {
      return date.toDateString() === selectedStart.toDateString();
    }
    return (
      date.toDateString() === selectedStart.toDateString() ||
      date.toDateString() === selectedEnd.toDateString()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      onApply({
        startDate: selectedStart.toISOString().split("T")[0],
        endDate: selectedEnd.toISOString().split("T")[0],
      });
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
    onClose();
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <Modal
      open={open}
      title="Date Picker Menu"
      onClose={handleCancel}
      size="md"
      footer={
        <div className="flex justify-between items-center w-full">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            disabled={!selectedStart || !selectedEnd}
            className="px-5 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Apply
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Selected Date Range Display */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
          <div className="text-sm">
            <span className="text-gray-600">
              {formatDate(selectedStart) || "Select start date"}
            </span>
          </div>
          <span className="text-gray-400">—</span>
          <div className="text-sm">
            <span className="text-gray-600">
              {formatDate(selectedEnd) || "Select end date"}
            </span>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <h3 className="text-base font-semibold text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div>
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayObj, index) => {
              const isInRange = isDateInRange(dayObj.date);
              const isSelected = isDateSelected(dayObj.date);
              const isToday =
                dayObj.date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={index}
                  onClick={() =>
                    dayObj.isCurrentMonth && handleDateClick(dayObj.date)
                  }
                  disabled={!dayObj.isCurrentMonth}
                  className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                      ${
                        !dayObj.isCurrentMonth
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-900 hover:bg-gray-100"
                      }
                      ${
                        isSelected
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : ""
                      }
                      ${
                        isInRange && !isSelected
                          ? "bg-purple-100 text-purple-700"
                          : ""
                      }
                      ${
                        isToday && !isSelected && !isInRange
                          ? "border-2 border-purple-300"
                          : ""
                      }
                    `}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
