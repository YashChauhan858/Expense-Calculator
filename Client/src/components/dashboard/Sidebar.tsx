import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Home, Upload } from "lucide-react";

const Sidebar = () => {
  return (
    <section className=" h-full flex flex-col gap-2 mt-4">
      <Button variant={"outline"} asChild>
        <Link
          to="/dashboard"
          activeProps={{ className: "bg-white text-black" }}
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Link>
      </Button>

      <Button variant={"outline"} asChild>
        <Link
          to="/upload-expense"
          className="w-full"
          activeProps={{ className: "bg-white text-black" }}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Link>
      </Button>
    </section>
  );
};

export default Sidebar;
