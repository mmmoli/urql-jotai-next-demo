import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { Auth } from '@mmmoli/shared/data';

/* eslint-disable-next-line */
export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [value, setValue] = useState('content');
  return (
    <div className="border-2 m-2 border-black p-2">
      <nav>
        <ul className="flex space-x-2">
          <li>
            <Link href="/" shallow>
              Index
            </Link>
          </li>
          <li>
            <Link href="/projects/de50764d-1352-4b9b-a016-6a70d91dc57b" shallow>
              Project: de50764d-1352-4b9b-a016-6a70d91dc57b
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <input
        className="border-emerald-500 border-2"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <hr />
      <Auth />
      <hr />
      {children}
    </div>
  );
};

export default Layout;
