import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RegisterForm = () => {
  return (
    <div className="w-1/2 mt-[-50px]">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold">Create an account</h1>
        <p className="text-sm text-center">
          Enter your email below to create your account
        </p>
      </div>

      <form className="w-full mt-9 flex flex-col items-center gap-3">
        <div className="w-full flex flex-col gap-2">
          <Label>Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Password</Label>
          <Input type="password" placeholder="Password" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Confirm Password</Label>
          <Input type="password" placeholder="Confirm Password" />
        </div>

        <Button variant="default" className="w-full">
          Sign in with Email
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
