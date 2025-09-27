export const categories = [
  { value: "travel", label: "Travel" },
  { value: "meals", label: "Meals" },
  { value: "office_supplies", label: "Office Supplies" },
  { value: "equipment", label: "Equipment" },
  { value: "training", label: "Training" },
  { value: "other", label: "Other" },
];

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const categoryIcons = {
  travel: "✈️",
  meals: "🍽️",
  office_supplies: "📋",
  equipment: "💻",
  training: "🎓",
  other: "📄",
};
export const getCategoryIcon = (category) => categoryIcons[category] || "📄";

const statusColors = {
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
};
export const getStatusColor = (status) =>
  statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
