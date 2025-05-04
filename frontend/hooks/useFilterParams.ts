import {
  useQueryStates,
  parseAsInteger,
  parseAsStringEnum,
  parseAsString,
  parseAsArrayOf,
} from "nuqs";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { useRef } from "react";

import usePropertyStore from "@/stores/propertyStore";
import { useQueryStore } from "@/stores/queryStore";
import {
  SortDirection,
  PropertyType,
  PropertyFilters,
  BPDistricts,
} from "@/types";

const useFilterParams = () => {
  const { fetchProperties } = usePropertyStore();
  const { updateFilters } = useQueryStore();
  const router = useRouter();

  const defaultParams = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortDirection: SortDirection.asc,
  };

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
      {} as Record<string, any>,
    );

    if (Object.keys(missingParams).length > 0) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...urlQuery, ...missingParams },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router.isReady]);
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
        Object.values(SortDirection),
      ),
      districts: parseAsArrayOf<BPDistricts>(
        parseAsStringEnum<BPDistricts>(Object.values(BPDistricts)),
        ",",
      ),
    },
    { history: "push" },
  );

  const prevQueryParams = useRef(queryParams);

  const debouncedFetchProperties = useCallback(
    debounce(() => {
      fetchProperties();
    }, 300),
    [fetchProperties],
  );

  // Synchronize filters, query params, and fetched data with debounce
  useEffect(() => {
    const fetchAndSync = async () => {
      updateFilters(queryParams as Partial<PropertyFilters>); // Sync filters in the store

      const res = await fetchProperties(); // Fetch properties based on current query params

      if (res) {
        if (res.currentPage !== queryParams.page) {
          setQueryParams((prev) => {
            if (prev.page !== res.currentPage) {
              return { ...prev, page: res.currentPage };
            }

            return prev;
          });
        }
      }
    };

    if (prevQueryParams.current !== queryParams) {
      fetchAndSync();
      prevQueryParams.current = queryParams;
    }
  }, [
    queryParams,
    fetchProperties,
    setQueryParams,
    updateFilters,
    debouncedFetchProperties,
  ]);

  return {
    queryParams,
    setQueryParams,
  };
};

export default useFilterParams;
