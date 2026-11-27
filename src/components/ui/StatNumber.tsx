import React from 'react';
import CountUp from './CountUp';

/**
 * A stat written as text, such as "1,200+", "$2,000", "92%", "<$80" or "2 hrs". The number counts up when it comes
 * into view (the same CountUp the other number cards use), keeping whatever stands before and after it. Anything
 * that isn't a whole number is shown as written.
 */
const StatNumber: React.FC<{ value: string; duration?: number; className?: string }> = ({ value, duration = 2, className }) => {
  const parts = /^(\D*?)(\d[\d,]*)(\D.*)?$/.exec(value.trim());
  if (!parts || /\d\.\d/.test(value)) return <span className={className}>{value}</span>;
  const [, prefix, whole, suffix = ''] = parts;
  return (
    <CountUp
      to={Number(whole.replace(/,/g, ''))}
      prefix={prefix}
      suffix={suffix}
      separator={whole.includes(',') ? ',' : ''}
      duration={duration}
      className={className}
    />
  );
};

export default StatNumber;
