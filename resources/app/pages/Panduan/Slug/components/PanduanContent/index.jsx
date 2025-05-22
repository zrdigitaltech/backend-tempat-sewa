import React from 'react';

const PanduanContent = ({ content }) => (
  <div className="col-12 col-lg-8 mb-4 mb-lg-0">
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  </div>
);

export default PanduanContent;
