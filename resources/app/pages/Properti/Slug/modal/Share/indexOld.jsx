export default function Index(props) {
  const { onClose } = props;
  return (
    <div
      className="modal show"
      style={{ display: 'block' }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bagikan Properti</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose} // Close modal
            ></button>
          </div>
          <div className="modal-body">
            <p>Bagikan properti ini melalui media sosial:</p>
            <div>
              <a
                href={`https://wa.me/?text=${window.location.href}`}
                target="_blank"
                className="btn btn-success mb-2 w-100"
              >
                Bagikan di WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                className="btn btn-primary mb-2 w-100"
              >
                Bagikan di Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                className="btn btn-info mb-2 w-100"
              >
                Bagikan di Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
