"use client";

type MovieFiltersProps = {
  search: string;
  year: string;
  onSearchChange: (v: string) => void;
  onYearChange: (v: string) => void;
};

export default function MovieFilters({
  search,
  year,
  onSearchChange,
  onYearChange,
}: MovieFiltersProps) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={year} onChange={(e) => onYearChange(e.target.value)}>
        <option value="">Toutes les années</option>
        <option value="2020+">2020 et plus</option>
        <option value="2010-2019">2010 - 2019</option>
        <option value="avant-2010">Avant 2010</option>
      </select>
    </div>
  );
}
