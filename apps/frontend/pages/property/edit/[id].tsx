import { GetServerSideProps } from "next/types";
import "swiper/css/bundle";

import { PropertyResponse } from "@/types";
import DefaultLayout from "@/layouts/default";
const EditPropertyPage: React.FC<{
  property: PropertyResponse;
}> = ({ property }) => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">{property.id}</div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

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

    if (!apiUrl) throw new Error("API_URL is not defined");

    const response = await fetch(`${apiUrl}/property/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch property data: ${response.statusText}`);
    }

    const property: PropertyResponse = await response.json();

    property.lastUpdated = new Date(property.updatedAt).toLocaleString();

    return {
      props: {
        property,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
export default EditPropertyPage;
