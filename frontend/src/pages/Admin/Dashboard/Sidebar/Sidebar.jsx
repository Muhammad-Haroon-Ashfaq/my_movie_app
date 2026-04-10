import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Dashboard', path: '/admin/movies/dashboard' },
    { label: 'Create Movie', path: '/admin/movies/create' },
    { label: 'Create Genre', path: '/admin/movies/genre' },
    { label: 'Update Movie', path: '/admin/movies-list' },
    { label: 'Comments', path: '/admin/movies/comments' },
  ];

  return (
    <aside className="w-64 border-r border-[#242424] h-screen sticky top-0 p-6 hidden lg:block bg-[#0f0f0f]">
      <ul className="space-y-4 pt-10">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-3 rounded-full text-center transition-all duration-300 font-semibold ${
                isActive(item.path)
                  ? "bg-gradient-to-b from-green-500 to-lime-400 text-black shadow-lg shadow-green-500/20"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;