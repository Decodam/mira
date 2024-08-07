export function checkPasswordStrength(password) {
  if (!password) return "empty";

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  let strengthScore = 0;

  if (hasUpperCase) strengthScore++;
  if (hasLowerCase) strengthScore++;
  if (hasNumbers) strengthScore++;
  if (hasSpecialChar) strengthScore++;
  if (isLongEnough) strengthScore++;

  if (strengthScore === 0) return "empty";
  if (strengthScore <= 2) return "weak";
  if (strengthScore === 3) return "medium";
  if (strengthScore === 4) return "strong";
  if (strengthScore === 5) return "very-strong";
}
