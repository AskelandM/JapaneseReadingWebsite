import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo / Title */}
          <h1 className="text-2xl font-bold text-blue-600">YOMI</h1>

          {/* Navigation Buttons */}
          <nav className="space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-24 container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
