import { PromotionType } from "@real-estate/shared";
interface BannerProps {
  type: PromotionType;
}
const promotionTypeLabels = {
  [PromotionType.PriceIncrease]: "Price Increased",
  [PromotionType.PriceDecrease]: "Price Decreased",
  [PromotionType.NewListing]: "New Listing!",
  [PromotionType.Sold]: "Sold!",
  [PromotionType.LimitedOffer]: "Limited Offer!",
} as const;
const promotionTypeClasses = {
  [PromotionType.PriceIncrease]: "bg-red-500",
  [PromotionType.PriceDecrease]: "bg-green-500",
  [PromotionType.NewListing]: "bg-blue-500",
  [PromotionType.Sold]: "bg-gray-500",
  [PromotionType.LimitedOffer]: "bg-yellow-500",
} as const;
const Banner: React.FC<BannerProps> = ({ type }) => {
  const bannerColor = promotionTypeClasses[type];

  if (type === PromotionType.None) return null;

  const renderContent = () => {
    return promotionTypeLabels[type];
  };

  return (
    <div
      className={`absolute bottom-0 w-full ${bannerColor} opacity-80 text-center text-white p-1`}
    >
      {renderContent()}
    </div>
  );
};

export default Banner;
