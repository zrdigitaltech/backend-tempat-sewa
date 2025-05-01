import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';

export default function Index() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => {
      new bootstrap.Tooltip(el);
    });

    // Cleanup (prevent duplicate tooltips)
    return () => {
      tooltipTriggerList.forEach(el => {
        const tooltipInstance = bootstrap.Tooltip.getInstance(el);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      });
    };
  }, []);
}
