import React from 'react';
import { formatStrip } from '@/app/helpers';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = props => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    onSearchEnter,
    isLoading
  } = props;
  return (
    <div className="row align-items-center mb-4">
      <div className="col-sm-4">
        {isLoading ? (
          <Skeleton height={34} borderRadius={8} />
        ) : (
          <select
            className="form-select"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((category, idx) => (
              <option key={idx} value={formatStrip(category).toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          placeholder="Cari panduan berdasarkan judul..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSearchEnter();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Index;
