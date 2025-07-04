import {
  useQueryStates,
  parseAsInteger,
  parseAsStringEnum,
  parseAsString,
  parseAsArrayOf,
} from "nuqs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import _ from "lodash";

import usePropertyStore from "@/stores/propertyStore";
import { useQueryStore } from "@/stores/queryStore";
import {
  SortDirection,
  PropertyType,
  PropertyFilters,
  BPDistricts,
} from "@/types";

const defaultParams = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortDirection: SortDirection.asc,
};

const useFilterParams = () => {
  const { fetchProperties } = usePropertyStore();
  const { updateFilters, filters } = useQueryStore();
  const router = useRouter();

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger,
      limit: parseAsInteger,
      priceMin: parseAsInteger,
      priceMax: parseAsInteger,
      sizeMax: parseAsInteger,
      type: parseAsStringEnum<PropertyType>(Object.values(PropertyType)),
      sortBy: parseAsString,
      yearBuilt: parseAsInteger,
      sortDirection: parseAsStringEnum<SortDirection>(
        Object.values(SortDirection)
      ),
      districts: parseAsArrayOf<BPDistricts>(
        parseAsStringEnum<BPDistricts>(Object.values(BPDistricts)),
        ","
      ),
    },
    { history: "push" }
  );

  const prevQueryParams = useRef(queryParams);
  const prevFilters = useRef(filters);

  useEffect(() => {
    if (!router.isReady) return;

    const urlQuery = router.query;
    const missingParams = Object.keys(defaultParams).reduce(
      (acc, key) => {
        if (!(key in urlQuery)) {
          acc[key] = defaultParams[key as keyof typeof defaultParams];
        }

        return acc;
      },
      {} as Record<string, any>
    );

    if (Object.keys(missingParams).length > 0) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...urlQuery, ...missingParams },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router.isReady]);

  //  Sync Zustand store with URL query params
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (router.pathname !== "/") return;

    const queryChanged = !_.isEqual(prevQueryParams.current, queryParams);

    if (!queryChanged && !isFirstLoad.current) return;

    prevQueryParams.current = queryParams;
    isFirstLoad.current = false; // Mark as no longer first load

    const syncAndFetch = async () => {
      updateFilters(queryParams as Partial<PropertyFilters>);
      const res = await fetchProperties();

      if (res && res.currentPage !== queryParams.page) {
        setQueryParams((prev) => ({
          ...prev,
          page: res.currentPage,
        }));
      }
    };

    syncAndFetch();
  }, [
    queryParams,
    fetchProperties,
    setQueryParams,
    updateFilters,
    router.pathname,
  ]);

  // Sync URL query params from Zustand store
  useEffect(() => {
    const filtersChanged = !_.isEqual(prevFilters.current, filters);

    if (!filtersChanged) return;

    prevFilters.current = filters;

    setQueryParams((prev) => ({
      ...prev,
      ...filters,
    }));
  }, [filters, setQueryParams]);
};

export default useFilterParams;
