import { Suspense } from "react";
import { SearchView } from "@/components/search/search-view";
import { PageLoader } from "@/components/common/page-loader";

export default function SearchPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SearchView />
    </Suspense>
  );
}
