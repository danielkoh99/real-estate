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
  None = 0,
  PriceIncrease = 1,
  PriceDecrease = 2,
  NewListing = 3,
  Sold = 4,
  LimitedOffer = 5,
}

export {
  PromotionType,
  BPDistricts,
  PropertyType,
  PropertyCategory,
  BuildingType,
  HeatingType,
};
