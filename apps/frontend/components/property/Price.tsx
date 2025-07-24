export default function Price({
  oldPrice,
  price,
  priceChange,
}: {
  oldPrice?: number;
  price: number;
  priceChange?: number;
}) {
  if (oldPrice && priceChange) {
    return (
      <>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {price.toLocaleString()} M Ft
          </h2>
          <span className="block text-sm text-gray-500 line-through mt-1">
            {oldPrice.toLocaleString()} M Ft
          </span>
        </div>
        {priceChange !== 0 && (
          <span
            className={`text-xs font-medium ${
              priceChange > 0
                ? "text-green-600"
                : priceChange < 0
                  ? "text-red-600"
                  : "text-gray-500"
            }`}
          >
            {priceChange > 0 ? "+" : ""}
            {priceChange.toFixed(1)}%
          </span>
        )}
      </>
    );
  }

  return (
    <h2 className="text-lg font-semibold text-slate-800 truncate ">
      {price.toLocaleString()} M Ft
    </h2>
  );
}
