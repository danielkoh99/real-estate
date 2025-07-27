import { PromotionType } from "@real-estate/shared";
interface BannerProps {
  type: PromotionType;
}
const promotionTypeLabels = {
  [PromotionType.NewPrice]: "New Price!",
  [PromotionType.NewListing]: "New Listing!",
  [PromotionType.Sold]: "Sold!",
  [PromotionType.LimitedOffer]: "Limited Offer!",
} as const;
const promotionTypeClasses = {
  [PromotionType.NewPrice]: "bg-emerald-500",
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
      className={`absolute top-10 w-1/2 ${bannerColor} opacity-80 text-center text-white p-1 z-10 rounded-r-xl text-xs`}
    >
      {renderContent()}
    </div>
  );
};

export default Banner;
