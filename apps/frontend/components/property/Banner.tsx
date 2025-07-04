import { PromotionType } from "@real-estate/shared";
interface BannerProps {
  type: PromotionType;
}

const Banner: React.FC<BannerProps> = ({ type }) => {
  const getBannerColor = () => {
    switch (type) {
      case PromotionType.PriceIncrease:
        return "bg-green-500";
      case PromotionType.PriceDecrease:
        return "bg-red-500";
      case PromotionType.NewListing:
        return "bg-blue-500";
      case PromotionType.Sold:
        return "bg-gray-500";
      case PromotionType.LimitedOffer:
        return "bg-yellow-500";
      default:
        return "bg-blue-400";
    }
  };

  const renderContent = () => {
    switch (type) {
      case PromotionType.PriceIncrease:
        return "Price Increased";
      case PromotionType.PriceDecrease:
        return "Price Decreased";
      case PromotionType.NewListing:
        return "New Listing!";
      case PromotionType.Sold:
        return "Sold Out!";
      case PromotionType.LimitedOffer:
        return "Limited Offer!";
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute bottom-0 w-full ${getBannerColor()} opacity-80 text-center text-white p-1`}
    >
      {renderContent()}
    </div>
  );
};

export default Banner;
