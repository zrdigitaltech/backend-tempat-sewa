import React from 'react';

const Index = props => {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories } = props;

  return (
    <div className="row align-items-center mb-4">
      <div className="col-sm-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          placeholder="Cari panduan berdasarkan judul..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Index;
