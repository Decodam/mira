import { LoginForm } from "@/components/auth-forms";
import { Button } from "@/components/ui/button";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import Link from "next/link";


export default function Login({}) {
  return (
    <div className="min-h-svh md:flex justify-center items-center py-10">
      <div className="md:fixed flex md:justify-center items-center mb-5 ml-5 md:m-0 top-5 gap-2 right-10">
        <ToggleTheme />
        <Button variant="outline" asChild>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>
      <LoginForm icon={true} borderless={false} />
    </div>
  );
}