import React, { useEffect, useMemo, useState } from "react";
import type { Company } from "../types/Company";
import fetchService from "../services/fetchCompanies";
import CompanyCard from "../components/CompanyCard";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";

type SortOption =
  | "name-asc"
  | "name-desc"
  | "employees-asc"
  | "employees-desc"
  | "";

const PER_PAGE = 10;

const CompaniesPage: React.FC = () => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [sort, setSort] = useState<SortOption>("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchService
      .fetchAllCompanies(350)
      .then((data) => {
        if (!mounted) return;
        setAllCompanies(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err.message ?? err));
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  // compute industries for FilterBar dropdown
  const industries = useMemo(() => {
    const set = new Set<string>();
    allCompanies.forEach((c) => {
      if (c.industry) set.add(c.industry);
    });
    return Array.from(set).sort();
  }, [allCompanies]);

  // Apply search, industry filter
  const filtered = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    let items = allCompanies.slice();

    if (s) {
      items = items.filter((c) => c.name.toLowerCase().includes(s));
    }

    if (industry) {
      items = items.filter((c) => c.industry === industry);
    }

    // sorting
    if (sort === "name-asc") items.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc")
      items.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "employees-asc")
      items.sort((a, b) => (a.employees ?? 0) - (b.employees ?? 0));
    else if (sort === "employees-desc")
      items.sort((a, b) => (b.employees ?? 0) - (a.employees ?? 0));

    return items;
  }, [allCompanies, debouncedSearch, industry, sort]);

  // pagination (client-side pagination over filtered results)
  const [page, setPage] = useState(1);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, industry, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (loading) return <Loader message="Loading companies..." />;

  if (error)
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <p className="font-semibold">Error</p>
          <p className="mt-1 text-sm">{error}</p>
          <div className="mt-3">
            <button
              className="px-3 py-2 bg-red-600 text-white rounded"
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchService
                  .fetchAllCompanies(200)
                  .then((data) => setAllCompanies(data))
                  .catch((e) => setError(String(e)))
                  .finally(() => setLoading(false));
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Left Text */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Companies Directory
            </h1>

            <p className="mt-1 text-sm sm:text-base text-slate-600 max-w-lg">
              Discover leading companies shaping Hyderabad’s growth and innovation landscape
            </p>
          </div>

          {/* Decorative Badge */}
          <div
            className="
      mt-2 sm:mt-0 inline-flex items-center gap-2 
      px-4 py-2 bg-blue-50 text-blue-700 text-xs 
      font-semibold rounded-full border border-blue-100
      shadow-sm
    "
          >
            <span className="text-lg">📊</span>
            <span>100+ Companies Listed</span>
          </div>
        </div>
      </header>

      <div className="mb-4">
        <FilterBar
          search={search}
          setSearch={setSearch}
          industry={industry}
          setIndustry={setIndustry}
          industries={industries}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <div className="mt-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 tracking-wide">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {(page - 1) * PER_PAGE + 1} - {Math.min(page * PER_PAGE, total)}
          </span>{" "}
          of <span className="font-semibold text-gray-900">{total}</span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="
        px-3 py-1.5 rounded-lg border bg-white shadow-sm 
        text-sm font-medium text-gray-700 
        hover:bg-gray-50 hover:border-gray-300 
        transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
      "
          >
            « First
          </button>

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="
        px-3 py-1.5 rounded-lg border bg-white shadow-sm 
        text-sm font-medium text-gray-700 
        hover:bg-gray-50 hover:border-gray-300
        transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
      "
          >
            ‹ Prev
          </button>

          <span
            className="
        px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold 
        border border-blue-100 shadow-sm select-none
      "
          >
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="
        px-3 py-1.5 rounded-lg border bg-white shadow-sm 
        text-sm font-medium text-gray-700 
        hover:bg-gray-50 hover:border-gray-300
        transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
      "
          >
            Next ›
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            className="
        px-3 py-1.5 rounded-lg border bg-white shadow-sm 
        text-sm font-medium text-gray-700 
        hover:bg-gray-50 hover:border-gray-300
        transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
      "
          >
            Last »
          </button>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mt-8">
        {displayed.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <p className="text-lg font-medium">No companies found</p>
            <p className="mt-2 text-sm">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayed.map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default CompaniesPage;
