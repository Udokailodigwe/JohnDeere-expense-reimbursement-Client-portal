import {
  MdDashboard,
  MdReceipt,
  MdAddCircle,
  MdCheckCircle,
  MdPendingActions,
  MdBarChart,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const links = [
  {
    id: 1,
    text: "Home",
    path: "/",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    text: "My Expenses",
    path: "my-expenses",
    icon: <MdReceipt />,
  },
  {
    id: 3,
    text: "Add Expense",
    path: "add-expense",
    icon: <MdAddCircle />,
  },
  {
    id: 4,
    text: "Approvals",
    path: "approvals",
    icon: <MdCheckCircle />,
  },
  {
    id: 5,
    text: "Pending",
    path: "pending",
    icon: <MdPendingActions />,
  },
  {
    id: 6,
    text: "Reports",
    path: "reports",
    icon: <MdBarChart />,
  },
  {
    id: 7,
    text: "Profile",
    path: "profile",
    icon: <MdPerson />,
  },
  {
    id: 8,
    text: "Settings",
    path: "settings",
    icon: <MdSettings />,
  },
  {
    id: 9,
    text: "Logout",
    path: "activate-account?form=login",
    icon: <MdLogout />,
  },
];

export default links;
