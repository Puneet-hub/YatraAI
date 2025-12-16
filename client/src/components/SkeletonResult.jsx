export default function SkeletonResult() {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow animate-pulse">
      
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>

      {/* Paragraph lines */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Section */}
      <div className="mt-6 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>

    </div>
  );
}
