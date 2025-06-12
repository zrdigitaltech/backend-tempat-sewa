import { Fragment } from 'react';
import ReasonSection from './Reason';
import TipsSection from './Tips';

export default function Index() {
  return (
    <Fragment>
      <div className="container py-5">
        <ReasonSection />
        <TipsSection />
      </div>
    </Fragment>
  );
}
