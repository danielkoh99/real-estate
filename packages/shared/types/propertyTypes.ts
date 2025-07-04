enum BPDistricts {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
  V = "V",
  VI = "VI",
  VII = "VII",
  VIII = "VIII",
  IX = "IX",
  X = "X",
  XI = "XI",
  XII = "XII",
  XIII = "XIII",
  XIV = "XIV",
  XV = "XV",
  XVI = "XVI",
  XVII = "XVII",
  XVIII = "XVIII",
  XIX = "XIX",
  XX = "XX",
  XXI = "XXI",
  XXII = "XXII",
  XXIII = "XXIII",
}
enum PropertyType {
  APARTMENT = "Apartment",
  HOUSE = "House",
}
enum PropertyCategory {
  USED = "Used",
  NEW = "New",
  NEWLY_BUILT = "Newly Built",
  UNDER_CONSTRUCTION = "Under Construction",
  RENOVATED = "Renovated",
  LUXURY = "Luxury",
  COMMERCIAL = "Commercial",
  INDUSTRIAL = "Industrial",
  VACATION_HOME = "Vacation Home",
  OTHER = "Other",
}
enum BuildingType {
  APARTMENT = "apartment",
  HOUSE = "house",
  TOWNHOUSE = "townhouse",
  VILLA = "villa",
  APARTMENT_BLOCK = "apartment block",
  HOUSE_BLOCK = "house block",
  TOWNHOUSE_BLOCK = "townhouse block",
  VILLA_BLOCK = "villa block",
}
enum HeatingType {
  GAS = "gas",
  ELECTRIC = "electric",
  CENTRAL = "central",
  OTHER = "other",
}
enum PromotionType {
  PriceIncrease = 1,
  PriceDecrease = 2,
  NewListing = 3,
  Sold = 4,
  LimitedOffer = 5,
}
const promotionTypeLabels = {
  [PromotionType.PriceIncrease]: "Price Increased",
  [PromotionType.PriceDecrease]: "Price Decreased",
  [PromotionType.NewListing]: "New Listing!",
  [PromotionType.Sold]: "Sold Out!",
  [PromotionType.LimitedOffer]: "Limited Offer!",
} as const;

export {
  PromotionType,
  promotionTypeLabels,
  BPDistricts,
  PropertyType,
  PropertyCategory,
  BuildingType,
  HeatingType,
};
