import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function UserPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>User page</h1>
        </div>
      </div>
    </DefaultLayout>
  );
}
