import React, { useMemo } from 'react'

type SortOption = 'name-asc' | 'name-desc' | 'employees-asc' | 'employees-desc' | ''

type Props = {
  search: string
  setSearch: (v: string) => void
  industry: string
  setIndustry: (v: string) => void
  industries: string[]
  sort: SortOption
  setSort: (v: SortOption) => void
}

export const FilterBar: React.FC<Props> = ({
  search,
  setSearch,
  industry,
  setIndustry,
  industries,
  sort,
  setSort,
}) => {
  const industryOptions = useMemo(() => ['All', ...industries], [industries])

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="col-span-1 md:col-span-2">
          <label className="sr-only">Search companies</label>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies by name..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="sr-only">Industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border rounded-md cursor-pointer focus:outline-none"
          >
            {industryOptions.map((opt) => (
              <option key={opt} value={opt === 'All' ? '' : opt} className='cursor-pointer'>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="sr-only">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full px-3 py-2 border rounded-md cursor-pointer focus:outline-none"
          >
            <option value="">Sort</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="employees-asc">Employees ↑</option>
            <option value="employees-desc">Employees ↓</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end">
        <div className="text-xs text-gray-500">Showing filters for: {industry || 'All industries'}</div>
      </div>
    </div>
  )
}

export default FilterBar
