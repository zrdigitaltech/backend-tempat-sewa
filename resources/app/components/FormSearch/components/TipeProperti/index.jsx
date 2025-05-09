import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/app/redux/action/tipeProperti/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const { tipeProperti, handleChange } = props;

  const tipePropertiList = useSelector(state => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTipeProperti = async () => {
    setIsLoading(true);
    await dispatch(getListTipeProperti());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTipeProperti();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton height={34} borderRadius={8} />
      ) : (
        <select
          className="form-select rounded-3"
          name="tipeProperti"
          value={tipeProperti || ''}
          onChange={handleChange}
        >
          <option value="">Tipe Properti</option>
          {tipePropertiList.map((item, idx) => (
            <option key={idx} value={item.slug}>
              {item.nama}
            </option>
          ))}
        </select>
      )}
    </Fragment>
  );
}
