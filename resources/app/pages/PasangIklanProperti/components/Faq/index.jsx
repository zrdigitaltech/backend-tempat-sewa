export default function Faq() {
  const faqs = [
    {
      question: 'Bagaimana cara pasang iklan cepat?',
      answer: 'Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.'
    },
    {
      question: 'Apa saja properti yang bisa saya iklankan?',
      answer: 'Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.'
    },
    {
      question: 'Apakah gratis atau berbayar?',
      answer: 'Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.'
    },
    {
      question: 'Bagaimana agar iklan muncul di pencarian?',
      answer: 'Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.'
    },
    {
      question: 'Bisakah mengedit iklan setelah posting?',
      answer: 'Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.'
    }
  ];

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h2 className="fw-bold text-center mb-4">Pertanyaan Seputar Pasang Iklan Properti</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map(({ question, answer }, idx) => (
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
                <div className="accordion-body text-muted small">{answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
