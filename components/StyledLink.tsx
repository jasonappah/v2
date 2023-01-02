import Link from 'next/link';
import {
  PropsWithChildren,
  DetailedHTMLProps,
  AnchorHTMLAttributes,
} from 'react';

function StyledLink({
  children,
  href,
}: PropsWithChildren<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
>) {
  return (
    <Link
      href={href}
      className="transition text-accent hover:text-back hover:bg-content"
    >
      {children}
    </Link>
  );
}

export default StyledLink;
