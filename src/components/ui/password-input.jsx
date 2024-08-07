import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff, IconCircleCheckFilled, IconAlertCircle } from "@tabler/icons-react";
import { checkPasswordStrength } from "@/utils/ui.utils";

const PasswordInput = forwardRef(function PasswordInput(
  { className, strongPassword, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const disabled = props.value === "" || props.value === undefined || props.disabled;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    props.onChange && props.onChange(e);

    if (strongPassword) {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const strengthColors = {
    "empty": "",
    "weak": "bg-red-500",
    "medium": "bg-yellow-500",
    "strong": "bg-blue-500",
    "very-strong": "bg-green-500"
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle pr-10", className)}
        ref={ref}
        {...props}
        onChange={handlePasswordChange}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <IconEye className="w-4 h-4" aria-hidden="true" />
        ) : (
          <IconEyeOff className="w-4 h-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {strongPassword && passwordStrength && (
        <div className={`absolute inset-y-0 right-10 flex items-center pr-3 ${strengthColors[passwordStrength]}`}>
          {passwordStrength === "very-strong" || passwordStrength === "strong" ? (
            <IconCircleCheckFilled className="w-4 h-4 text-white" aria-hidden="true" />
          ) : (
            <IconAlertCircle className="w-4 h-4 text-white" aria-hidden="true" />
          )}
          <span className="sr-only">
            {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)} password
          </span>
        </div>
      )}

      {/* hides browsers password toggles */}
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
});

export { PasswordInput };
