import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PanduanContent = props => {
  const { content, isLoading } = props;
  return (
    <Fragment>
      {isLoading ? (
        <div>
          <Skeleton height={30} width={`80%`} className="mb-2" />
          <Skeleton count={10} />
        </div>
      ) : (
        <article>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      )}
    </Fragment>
  );
};

export default PanduanContent;
