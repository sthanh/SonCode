import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-lg font-semibold">Clinical Trial Matcher</span>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/search">
              <span className="text-white hover:text-gray-200">Search</span>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <span className="text-white hover:text-gray-200">Sign Up</span>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <span className="text-white hover:text-gray-200">Login</span>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <span className="text-white hover:text-gray-200">Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/chat">
              <span className="text-white hover:text-gray-200">Chat</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <span className="text-white hover:text-gray-200">Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}