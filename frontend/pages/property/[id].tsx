import { GetServerSideProps } from "next/types";
import "swiper/css/bundle";

import { PropertyResponse } from "@/types";
import SimilarProperties from "@/components/property/SimilarProperties";
import DefaultLayout from "@/layouts/default";
import PropertyDetails from "@/components/property/PropertyDetailsView";

const PropertyPage: React.FC<{
  property: PropertyResponse;
  relatedProperties: PropertyResponse[];
}> = ({ property, relatedProperties }) => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <PropertyDetails property={property} />
        <SimilarProperties relatedProperties={relatedProperties} />
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}`,
  );
  const relatedResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}/related`,
  );

  const property: PropertyResponse = await response.json();
  const relatedProperties: PropertyResponse[] = await relatedResponse.json();

  if (!property) {
    return {
      notFound: true,
    };
  }
  property.lastUpdated = new Date(property.updatedAt).toLocaleString();

  return {
    props: {
      property,
      relatedProperties,
    },
  };
};
export default PropertyPage;
