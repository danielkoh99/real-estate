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

  // eslint-disable-next-line no-console
  console.log(id);
  if (!id) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  try {
    const apiUrl = process.env.API_URL;

    // eslint-disable-next-line no-console
    console.log(apiUrl);
    if (!apiUrl) throw new Error("API_URL is not defined");

    const response = await fetch(`${apiUrl}/property/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch property data: ${response.statusText}`);
    }

    const property: PropertyResponse = await response.json();

    let relatedProperties: PropertyResponse[] = [];

    try {
      const relatedResponse = await fetch(`${apiUrl}/property/${id}/related`);

      if (relatedResponse.ok) {
        relatedProperties = await relatedResponse.json();
      }
    } catch (relatedError) {
      // eslint-disable-next-line no-console
      console.warn("Failed to fetch related properties:", relatedError);
    }

    property.lastUpdated = new Date(property.updatedAt).toLocaleString();

    return {
      props: {
        property,
        relatedProperties,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
export default PropertyPage;
