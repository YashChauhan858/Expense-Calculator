import { createFileRoute, useNavigate } from "@tanstack/react-router";
import expenseLogo from "@/assets/expense.svg";
import RegisterForm from "@/components/login/RegisterForm";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/login/LoginForm";

type TLoginSearch = {
  type: "login" | "register";
};

export const Route = createFileRoute("/login-register")({
  component: Login,
  validateSearch: (search: Record<string, unknown>): TLoginSearch => {
    if (search.type === "login" || search.type === "register") {
      return {
        type: search.type,
      };
    }
    // default to login so search param will be /login-register?type=login
    return {
      type: "login",
    };
  },
});

function Login() {
  const navigate = useNavigate();
  const { type } = Route.useSearch();

  const isLogin = !!type && type === "login";

  const toggleBetweenLoginAndRegister = () => {
    if (isLogin) {
      return navigate({
        to: "/login-register",
        search: { type: "register" },
        replace: true,
      });
    }
    navigate({
      to: "/login-register",
      search: { type: "login" },
      replace: true,
    });
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 h-full bg-[#18181b]">
        <header className="p-5 flex items-center gap-3">
          <img src={expenseLogo} alt="logo" className="h-[45px]" />
          <p>Expenses Insight</p>
        </header>
      </div>
      <div className="w-1/2 h-full flex flex-col items-end">
        <Button
          variant="outline"
          className="m-5"
          onClick={toggleBetweenLoginAndRegister}
        >
          Login
        </Button>
        <div className="h-full w-full flex justify-center items-center">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
