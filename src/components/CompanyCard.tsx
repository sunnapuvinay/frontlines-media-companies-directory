import type { Company } from '../types/Company'
import React from 'react'
import Logo from '../assets/frontline_logo.webp'

type Props = {
  company: Company
}

export const CompanyCard: React.FC<Props> = ({ company }) => {
  return (
    <article className="
      bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
      overflow-hidden border border-gray-100 hover:-translate-y-1
    ">
      
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden group">
        {company.image ? (
          <img
            className="
              w-full h-full object-cover transition-transform duration-500 
              group-hover:scale-110
            "
            src={company.image}
            alt={company.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            No Image
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
      </div>

      {/* Text Section */}
      <div className="p-5">

        {/* Name & Industry */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate">
              {company.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1 truncate">
              {company.industry} • {company.location}
            </p>
          </div>

          {/* Logo */}
          {company.logo && (
            <img
              src={Logo}
              alt={company.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          )}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
          {company.description}
        </p>

        {/* Tags & Bottom Section */}
        <div className="mt-4 flex items-center justify-between">
          <span className="
            text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 
            font-medium border border-blue-100
          ">
            👥 {company.employees} Employees
          </span>

          <a
            href="https://frontlinesmedia.in/"
            target="_blank"
            className="
              text-sm font-semibold text-blue-600 hover:text-blue-800
              transition duration-200
            "
          >
            Visit →
          </a>
        </div>

      </div>
    </article>
  )
}

export default CompanyCard
