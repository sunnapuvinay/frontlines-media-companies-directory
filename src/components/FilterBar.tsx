import React, { useMemo } from "react";

type SortOption =
  | "name-asc"
  | "name-desc"
  | "employees-asc"
  | "employees-desc"
  | "";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  industry: string;
  setIndustry: (v: string) => void;
  industries: string[];
  sort: SortOption;
  setSort: (v: SortOption) => void;
};

export const FilterBar: React.FC<Props> = ({
  search,
  setSearch,
  industry,
  setIndustry,
  industries,
  sort,
  setSort,
}) => {
  const industryOptions = useMemo(() => ["All", ...industries], [industries]);

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Field */}
        <div className="col-span-1 md:col-span-2 relative">
          <label className="sr-only">Search companies</label>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies by name or industry..."
            className="
          w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 
          bg-gray-50 focus:bg-white
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
          transition-all duration-200 text-sm
        "
          />
        </div>

        {/* Industry Filter */}
        <div className="relative">
          <label className="sr-only">Industry</label>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🏭
          </span>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="
          w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 
          bg-gray-50 focus:bg-white
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
          cursor-pointer text-sm transition-all
        "
          >
            {industryOptions.map((opt) => (
              <option key={opt} value={opt === "All" ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div className="relative">
          <label className="sr-only">Sort</label>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🗂️
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="
          w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 
          bg-gray-50 focus:bg-white
          focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
          cursor-pointer text-sm transition-all
        "
          >
            <option value="">Sort</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="employees-asc">Employees ↑</option>
            <option value="employees-desc">Employees ↓</option>
          </select>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-3 text-right">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
          Filters Applied: {industry || "All Industries"}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
