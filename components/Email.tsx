'use client';

import { useEffect, useState } from 'react';
import { decodeEmail } from '../lib/constants';
import StyledLink from './StyledLink';

function Email() {
  const [electronicMailIdentifier, setElectronicMailIdentifier] = useState('...');
  useEffect(() => {
    setElectronicMailIdentifier(decodeEmail());
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
