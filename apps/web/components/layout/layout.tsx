import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { Auth } from '@mmmoli/shared/data';
import { NavBar } from '../nav-bar/nav-bar';

/* eslint-disable-next-line */
export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Auth />
      {children}
    </div>
  );
};

export default Layout;
