import React, { Fragment } from 'react';
import { Link, useMatches } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Breadcrumb = props => {
  const { className = '', containerClassName = '', isLoading = false } = props;
  const matches = useMatches();

  const items = matches
    .filter(match => match.handle?.breadcrumb)
    .map(match => ({
      name:
        typeof match.handle.breadcrumb === 'function'
          ? match.handle.breadcrumb(match.params)
          : match.handle.breadcrumb,
      link: match.pathname
    }));

  return (
    <section className={`${className && className + ' pt-3'}`}>
      <div className={`container ${containerClassName}`}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 text-truncate" style={{ flexWrap: 'nowrap' }}>
            {/* Always add Home as the first breadcrumb */}
            <li className="breadcrumb-item">
              {isLoading ? (
                <Skeleton width={60} height={16} />
              ) : (
                <Link to="/" className="">
                  Beranda
                </Link>
              )}
            </li>

            {isLoading ? (
              <Fragment>
                <li className="breadcrumb-item">
                  <Skeleton width={100} height={16} />
                </li>
                <li className="breadcrumb-item w-75">
                  <Skeleton width={`100%`} height={16} />
                </li>
              </Fragment>
            ) : (
              items.map((item, idx) => (
                <li
                  key={idx}
                  className={`breadcrumb-item ${idx === items.length - 1 ? 'active text-truncate w-75' : ''}`}
                  aria-current={idx === items.length - 1 ? 'page' : undefined}
                >
                  {idx !== items.length - 1 ? (
                    item?.name === 'Panduan' ? (
                      <Link to={item.link}>{item.name}</Link>
                    ) : (
                      <span className="text-primary">{item.name}</span>
                    )
                  ) : (
                    <b className="text-primary" title={item.name}>
                      {item.name}
                    </b>
                  )}
                </li>
              ))
            )}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
