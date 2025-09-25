import NavLinks from "./navlinks";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-64 min-h-screen shadow-2xl border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">JD</span>
          </div>
        </div>
        <h2 className="text-center text-lg font-bold text-white tracking-wide">
          Expense Reimbursement Portal
        </h2>
        <p className="text-center text-xs text-slate-400 mt-1">
          John Deere Portal
        </p>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 p-4">
        <NavLinks />
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <div className="text-center">
          <p className="text-xs text-slate-400">© 2024 John Deere</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
