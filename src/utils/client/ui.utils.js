export function checkPasswordError(password) {
  const minLength = 8;

  if (password.length < minLength) {
    return(`Password must be at least ${minLength} characters long.`);
  }

  if (!/[A-Z]/.test(password)) {
    return('Password must contain at least one uppercase letter.');
  }

  if (!/[a-z]/.test(password)) {
    return('Password must contain at least one lowercase letter.');
  }

  if (!/[0-9]/.test(password)) {
    return('Password must contain at least one digit.');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return('Password must contain at least one special character.');
  }

}

export function getInitials(fullName) {
  return fullName
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .join('')
}