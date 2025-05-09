import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeKost } from '@/app/redux/action/tipeKost/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const { tipeKost, handleChange } = props;

  const tipeKostList = useSelector(state => state?.tipeKost?.tipeKostList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTipeKost = async () => {
    setIsLoading(true);
    await dispatch(getListTipeKost());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTipeKost();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton height={34} borderRadius={8} />
      ) : (
        <select
          className="form-select rounded-3"
          name="tipeKost"
          value={tipeKost || ''}
          onChange={handleChange}
        >
          <option value="">Tipe Kost</option>
          {tipeKostList.map((item, idx) => (
            <option key={idx} value={item.slug}>
              {item.nama}
            </option>
          ))}
        </select>
      )}
    </Fragment>
  );
}
