'use client';
import {scan} from 'react-scan';
// react-scan must be imported before react
import {useEffect} from 'react';

const ReactScan = () => {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
};

export default ReactScan;
