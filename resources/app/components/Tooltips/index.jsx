// file: components/Tooltips.js
import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';

export default function useTooltips() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);
}
