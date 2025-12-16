export function TransportCard({ item }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4 space-y-1">
      <div className="flex justify-between">
        <h4 className="font-medium text-gray-900">
          {item.name}
        </h4>
        <span className="text-sm text-gray-500">
          ₹{item.fare}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        {item.from} → {item.to}
      </p>

      <p className="text-xs text-gray-500">
        {item.departure} – {item.arrival}
      </p>

      <a
        href={item.bookingLink}
        target="_blank"
        className="text-xs underline"
      >
        Book on {item.platform}
      </a>
    </div>
  );
}
