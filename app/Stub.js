import React from 'react';
import './Stub.scss';
import Background from './Background';

const Stub = () => {
  return (
    <>
      <Background />
      <div className="stub">
        <h1 className="stub__label">Coming soon</h1>
      </div>
    </>
  );
};

export default Stub;
