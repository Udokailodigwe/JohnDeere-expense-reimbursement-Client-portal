import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../../features/expense/expenseSlice";
import {
  MdAttachMoney,
  MdDescription,
  MdCategory,
  MdCalendarToday,
  MdNote,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdTrendingUp,
  MdTrendingDown,
  MdMoreVert,
} from "react-icons/md";

const ExpenseList = () => {
  const { expenses, totalExpenses, isLoading } = useSelector(
    (state) => state.expense
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "travel":
        return "✈️";
      case "meals":
        return "🍽️";
      case "office_supplies":
        return "📋";
      case "equipment":
        return "💻";
      case "training":
        return "🎓";
      default:
        return "📄";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Expenses
            </h1>
            <p className="text-gray-600">
              Track and manage your expense submissions
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{totalExpenses}</p>
            <p className="text-sm text-gray-500">Total Expenses</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Amount</p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  expenses.reduce((sum, expense) => sum + expense.amount, 0)
                )}
              </p>
            </div>
            <MdTrendingUp className="text-3xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Pending</p>
              <p className="text-2xl font-bold">
                {
                  expenses.filter((expense) => expense.status === "pending")
                    .length
                }
              </p>
            </div>
            <MdTrendingDown className="text-3xl text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Approved</p>
              <p className="text-2xl font-bold">
                {
                  expenses.filter((expense) => expense.status === "approved")
                    .length
                }
              </p>
            </div>
            <MdTrendingUp className="text-3xl text-purple-200" />
          </div>
        </div>
      </div>

      {/* Expenses List */}
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MdAttachMoney className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No expenses yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by adding your first expense
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Add Expense
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getCategoryIcon(expense.category)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize">
                        {expense.category.replace("_", " ")}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(expense.expenseDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        expense.status
                      )}`}
                    >
                      {expense.status}
                    </span>
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <MdMoreVert className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Amount
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-start space-x-2">
                    <MdDescription className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="text-gray-900 line-clamp-2">
                        {expense.description}
                      </p>
                    </div>
                  </div>
                </div>

                {expense.notes && (
                  <div className="mb-4">
                    <div className="flex items-start space-x-2">
                      <MdNote className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Notes
                        </p>
                        <p className="text-gray-700 text-sm line-clamp-2">
                          {expense.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MdVisibility className="text-lg" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <MdEdit className="text-lg" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">
                    ID: {expense._id.slice(-8)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

