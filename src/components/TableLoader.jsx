// src/components/ui/TableLoader.jsx

export default function TableLoader({ rows = 6, columns = 5 }) {
  return (
    <div className="w-full animate-pulse">
      {/* Header row */}
      <div className="flex gap-4 px-4 py-3 border-b border-gray-100">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200 rounded-full"
            style={{ flex: i === 0 ? 2 : 1 }}
          />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 px-4 py-4 border-b border-gray-50"
          style={{ opacity: 1 - rowIndex * 0.1 }} // fade out toward bottom
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-3 bg-gray-100 rounded-full"
              style={{ flex: colIndex === 0 ? 2 : 1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
