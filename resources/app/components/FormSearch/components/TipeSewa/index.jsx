import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeSewa } from '@/app/redux/action/tipeSewa/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const { tipeSewa, handleChange } = props;

  const tipeSewaList = useSelector(state => state?.tipeSewa?.tipeSewaList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTipeSewa = async () => {
    setIsLoading(true);
    await dispatch(getListTipeSewa());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTipeSewa();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton height={34} borderRadius={8} />
      ) : (
        <Fragment>
          <label htmlFor="tipeSewa" className="form-label visually-hidden">
            Tipe Sewa
          </label>
          <select
            id="tipeSewa"
            className="form-select rounded-3"
            name="tipeSewa"
            value={tipeSewa || ''}
            onChange={handleChange}
          >
            <option value="">Tipe Sewa</option>
            {tipeSewaList.map((item, idx) => (
              <option key={idx} value={item.slug}>
                {item.nama}
              </option>
            ))}
          </select>
        </Fragment>
      )}
    </Fragment>
  );
}
