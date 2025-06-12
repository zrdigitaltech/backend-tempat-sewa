import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <Fragment>
      {/* FAQ Section */}
      <div className="container py-5">
        <div className="mb-5">
          <h2 className="fw-bold text-center mb-4">Pertanyaan Seputar Pasang Iklan</h2>
          <div className="accordion" id="faqAccordion">
            {[
              'Bagaimana cara pasang iklan cepat?',
              'Apa saja properti yang bisa saya iklankan?',
              'Apakah gratis atau berbayar?',
              'Bagaimana agar iklan muncul di pencarian?',
              'Bisakah mengedit iklan setelah posting?'
            ].map((question, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={`accordion-button shadow-none ${idx > 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded={idx === 0}
                    aria-controls={`collapse${idx}`}
                  >
                    {question}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted small">
                    Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
