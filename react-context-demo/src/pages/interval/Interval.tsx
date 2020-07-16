import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from 'antd';

interface MutableRefObject<T> {
  current: T;
}

export function Interval() {
  const countRef: MutableRefObject<any> = useRef();
  const [step, setStep] = useState<number>(3);

  useEffect(() => {
    countRef.current = setInterval(() => {
      countRef.current += step;
    }, 1000);
    return () => {
      clearInterval(countRef.current);
    };
  }, [step]);

  return (
    <div>
      <div>
        <Button type="primary">{countRef.current}</Button>
      </div>
    </div>
  );
}
