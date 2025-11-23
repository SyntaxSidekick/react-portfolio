const FilterTabs = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <section className="portfolio-filters" aria-label="Project category filters">
      <div className="card">
        <div className="card-body">
          <nav className="filter-tabs" role="tablist" aria-label="Filter projects by category">
            <i className="fas fa-filter filter-icon" aria-label="Filter projects" aria-hidden="true"></i>
            {filters.map((filter) => (
              <button
                key={filter.key}
                id={`${filter.key}-filter`}
                className={`filter-tab ${activeFilter === filter.key ? "active" : ""}`}
                onClick={() => onFilterChange(filter.key)}
                role="tab"
                aria-selected={activeFilter === filter.key}
                aria-controls={`${filter.key}-panel`}
                aria-label={`Filter by ${filter.label}`}
              >
                <i className={filter.icon} aria-hidden="true"></i>
                <span>{filter.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default FilterTabs;
