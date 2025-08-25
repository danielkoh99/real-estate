"use client";

import type { PriceHistory } from "@/types";

import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Chip } from "@heroui/react";

const getPriceChange = (next: number, current: number) => {
  if (current === 0) return 0;

  return ((next - current) / current) * 100;
};

export default function PHistory({
  priceHistory,
  currentPrice,
}: {
  priceHistory: PriceHistory[];
  currentPrice: number;
}) {
  if (!priceHistory.length) return null;

  const history = [...priceHistory].reverse();
  const getPrevPrice = (i: number) => {
    return i === 0 ? currentPrice : history[i - 1]?.price;
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-gray-700 font-semibold text-lg">Price History</h3>
      {history.map((item, i) => (
        <PriceHistoryItem
          key={item.price + "-" + item.changedAt}
          prevPrice={getPrevPrice(i)}
          priceHistory={item}
        />
      ))}
    </div>
  );
}

function PriceHistoryItem({
  priceHistory,
  prevPrice,
}: {
  priceHistory: PriceHistory;
  prevPrice?: number;
}) {
  const priceChange = getPriceChange(prevPrice || 0, priceHistory.price);
  const date = new Date(priceHistory.changedAt).toLocaleDateString();

  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="text-gray-600">{date}</span>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-800">
          {priceHistory.price.toLocaleString()} Ft
        </span>
        <PriceChangeBadge priceChange={priceChange} />
      </div>
    </div>
  );
}

function PriceChangeBadge({ priceChange }: { priceChange: number }) {
  if (priceChange === 0) return null;

  const isPositive = priceChange > 0;

  return (
    <Chip
      color={isPositive ? "success" : "danger"}
      endContent={
        isPositive ? (
          <ArrowTrendingUpIcon className="w-4 h-4" />
        ) : (
          <ArrowTrendingDownIcon className="w-4 h-4" />
        )
      }
      size="md"
      variant="flat"
    >
      <span>{`${isPositive ? "+" : ""}${priceChange.toFixed(1)}%`}</span>
    </Chip>
  );
}
