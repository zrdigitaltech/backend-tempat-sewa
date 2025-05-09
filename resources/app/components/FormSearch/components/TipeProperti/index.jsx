import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKategori } from '@/app/redux/action/kategori/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const { tipeProperti, handleChange } = props;

  const kategoriList = useSelector(state => state?.kategori?.kategoriList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchKategori = async () => {
    setIsLoading(true);
    await dispatch(getListKategori());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton height={34} borderRadius={8} />
      ) : (
        <select
          className="form-select rounded-3"
          name="tipeProperti"
          value={tipeProperti}
          onChange={handleChange}
        >
          <option>Tipe Properti</option>
          {kategoriList.map((item, idx) => (
            <option key={idx} value={item.slug}>
              {item.nama}
            </option>
          ))}
        </select>
      )}
    </Fragment>
  );
}
