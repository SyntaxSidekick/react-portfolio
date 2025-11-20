import React from "react";

const FilterTabs = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <section className="portfolio-filters" aria-label="Project category filters">
      <div className="filter-header">
        <i className="fas fa-filter" aria-hidden="true"></i>
        <span className="filter-label">Filter by:</span>
      </div>
      <nav className="filter-tabs" role="tablist">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-tab ${activeFilter === filter.key ? "active" : ""}`}
            onClick={() => onFilterChange(filter.key)}
            role="tab"
            aria-selected={activeFilter === filter.key}
            aria-controls={`${filter.key}-panel`}
          >
            <i className={filter.icon} aria-hidden="true"></i>
            <span>{filter.label}</span>
          </button>
        ))}
      </nav>
    </section>
  );
};

export default FilterTabs;
