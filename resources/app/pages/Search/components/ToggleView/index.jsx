import React from 'react';
import useTooltips from '@/app/components/Tooltips';

export default function Index(props) {
  const { viewMode, handleGridView, handleListView } = props;
  useTooltips();
  return (
    <div className="btn-group w-100">
      <button
        className={`btn btn-outline-primary ${viewMode === 'list' ? 'active' : ''}`}
        onClick={handleListView}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="Tampilan List"
      >
        <i className="fas fa-list"></i>
      </button>
      <button
        className={`btn btn-outline-primary ${viewMode === 'grid' ? 'active' : ''}`}
        onClick={handleGridView}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="Tampilan Grid"
      >
        <i className="fas fa-th-large"></i>
      </button>
    </div>
  );
}
