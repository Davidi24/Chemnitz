export function validateParam(name: string, email: string, pass: string): string | null {
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return 'Invalid email address.';
  }

  if (!pass || pass.length < 6) {
    return 'Password must be at least 8 characters long.';
  }

  return null;
}
