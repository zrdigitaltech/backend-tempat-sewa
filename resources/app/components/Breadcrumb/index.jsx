import React from 'react';
import { Link, useMatches } from 'react-router-dom';

const Breadcrumb = props => {
  const { className = '', containerClassName = '' } = props;
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
              <Link to="/" className="text-decoration-none">
                Home
              </Link>
            </li>

            {items.map((item, idx) => (
              <li
                key={idx}
                className={`breadcrumb-item ${idx === items.length - 1 ? 'active text-truncate w-75' : ''}`}
                aria-current={idx === items.length - 1 ? 'page' : undefined}
              >
                {idx !== items.length - 1 ? (
                  <span className="text-primary">{item.name}</span>
                ) : (
                  <b className="text-primary" title={item.name}>
                    {item.name}
                  </b>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
