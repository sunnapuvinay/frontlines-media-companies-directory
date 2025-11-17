import type { Company } from '../types/Company'
import React from 'react'

type Props = {
  company: Company
}

export const CompanyCard: React.FC<Props> = ({ company }) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition duration-200 ease-in-out">
      <div className="h-40 w-full bg-gray-100 overflow-hidden">
        {company.image ? (
          <img className="w-full h-full object-cover" src={company.image} alt={company.name} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{company.name}</h3>
            <p className="text-xs text-gray-500 truncate">{company.industry} • {company.location}</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-700 line-clamp-3">{company.description}</p>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>{company.employees ?? '—'} employees</span>
          <a
            href={company.website ?? '#'}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Visit
          </a>
        </div>
      </div>
    </article>
  )
}

export default CompanyCard
