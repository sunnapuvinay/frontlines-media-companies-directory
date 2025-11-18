import React, { useState, useRef, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder?: string;
  icon?: string;
  onClear?: () => void;
};

export const CustomSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  label,
  placeholder = "Select...",
  icon,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = value
    ? options.find((opt) => opt === value) || value
    : placeholder;

  return (
    <div ref={dropdownRef} className="relative">
      <label className="sr-only">{label}</label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full px-3 py-2 rounded-lg border border-gray-200 
          bg-white hover:bg-gray-50
          focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
          cursor-pointer text-sm transition-all text-left
          flex items-center justify-between gap-2
        "
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 flex-1">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {selectedLabel}
          </span>
        </span>
        <span
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {value && onClear && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
            setIsOpen(false);
          }}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 bg-white rounded-full focus:outline-none z-20"
          aria-label="Clear selection"
          title="Clear"
        >
          ✕
        </button>
      )}

      {isOpen && (
        <div
          className="
            absolute top-full left-0 right-0 mt-1 z-50
            bg-white border border-gray-200 rounded-lg shadow-lg
            overflow-hidden animate-in fade-in duration-150
          "
          role="listbox"
        >
          <div className="max-h-64 overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors text-sm
                ${
                  !value
                    ? "bg-blue-100 text-blue-900 font-medium"
                    : "text-gray-900"
                }
              `}
              role="option"
              aria-selected={!value}
            >
              All
            </button>

            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors text-sm
                  ${
                    value === opt
                      ? "bg-blue-100 text-blue-900 font-medium"
                      : "text-gray-900"
                  }
                `}
                role="option"
                aria-selected={value === opt}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
