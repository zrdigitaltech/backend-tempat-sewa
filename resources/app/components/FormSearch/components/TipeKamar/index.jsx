import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeKamar } from '@/app/redux/action/tipeKamar/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const { tipeKamar, handleChange, tipeProperti } = props;

  const tipeKamarList = useSelector(state => state?.tipeKamar?.tipeKamarList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTipeKamar = async () => {
    setIsLoading(true);
    await dispatch(getListTipeKamar(tipeProperti));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTipeKamar();
  }, [tipeProperti]);

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton height={34} borderRadius={8} />
      ) : (
        <select
          className="form-select rounded-3"
          name="tipeKamar"
          value={tipeKamar || ''}
          onChange={handleChange}
        >
          <option value="">Tipe Kamar</option>
          {tipeKamarList.map((item, idx) => (
            <option key={idx} value={item.slug}>
              {item.nama}
            </option>
          ))}
        </select>
      )}
    </Fragment>
  );
}
