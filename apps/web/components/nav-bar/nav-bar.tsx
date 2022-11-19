import Link from 'next/link';
import { FC } from 'react';

export const NavBar: FC = () => (
  <nav className="navbar">
    <div className="flex-1">
      <Link href="/" className="btn btn-ghost normal-case text-xl" shallow>
        Toy
      </Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal p-0">
        <li>
          <Link href="/" shallow>
            Projects
          </Link>
        </li>
        <li>
          <Link href="/projects/de50764d-1352-4b9b-a016-6a70d91dc57b">
            Project
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);
