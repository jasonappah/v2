'use client';

import { useEffect, useState } from 'react';
import StyledLink from './StyledLink';

function Email() {
  const [electronicMailIdentifier, setElectronicMailIdentifier] = useState('...');
  useEffect(() => {
    setElectronicMailIdentifier(Buffer.from('aGV5QGphc29uYWEubWU=', 'base64').toString('utf8'));
    console.log(
      '👋 you should also follow my Instagram: https://instagram.com/jasonaa_'
    );
  }, []);
  return (
    <StyledLink href={`mailto:${electronicMailIdentifier}`}>
      <noscript>sorry, you need JavaScript enabled for this</noscript>
      {electronicMailIdentifier}
    </StyledLink>
  );
}

export default Email;
