import PaginationComponent from "@/components/Pagination";
import PropertiesView from "@/components/PropertiesView";
import SearchFilter from "@/components/SearchFilter";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 h-full justify-between">
        <SearchFilter />

        <PropertiesView />
        <PaginationComponent />
      </div>
    </DefaultLayout>
  );
}
