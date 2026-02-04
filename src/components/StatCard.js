import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  description,
  bgColor, // full object: { bgColor: "...", textColor: "..." }
  CardIcon: IconComponent,
}) {
  const isPositive = change > 0;
  const ChangeArrow = isPositive ? ArrowUp : ArrowDown;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const displayValue = String(value);
  return (
    <div
      className="p-5 rounded-2xl shadow-sm border border-gray-200 flex  space-x-3"
      style={{ backgroundColor: bgColor.bgColor }}
    >
      {/* LEFT ICON */}
      <div className=" rounded-xl   flex ">
        {IconComponent && (
          <IconComponent size={28} className={bgColor.textColor} />
        )}
      </div>

      {/* RIGHT TEXT BLOCK */}
      <div className="flex flex-col flex-1">
        {/* Title */}
        <div className={`text-sm font-semibold ${bgColor.textColor}`}>
          {title}
        </div>

        {/* Value + Change */}
        <div className="flex items-center space-x-3 mt-1">
          <div className={`text-3xl font-bold ${bgColor.textColor}`}>
            {displayValue.startsWith("N")
              ? displayValue.replace("N", "$")
              : displayValue}
          </div>

          {/* {change !== undefined && (
            <div
              className={`flex items-center text-xs font-semibold ${changeColor}`}
            >
              <ChangeArrow size={14} className="mr-1" />
              {Math.abs(change)}%
            </div>
          )} */}
        </div>

        {/* Description */}
        <div className={`text-xs mt-1 ${bgColor.textColor}`}>{description}</div>
      </div>
    </div>
  );
}
