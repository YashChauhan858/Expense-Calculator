import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to Expense Manager
        </h1>
        <p className="text-lg mb-6 text-gray-300">
          Manage all your expenses and get beautiful analytics
        </p>
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
