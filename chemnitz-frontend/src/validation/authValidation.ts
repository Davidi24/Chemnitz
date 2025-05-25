export function validateParam(name: string, email: string, pass: string): string | null {
  if (!name || name.trim() === '') {
    return 'Name cannot be empty.';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long.';
  }

  if (!email || email.trim() === '') {
    return 'Email cannot be empty.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address.';
  }

  if (!pass || pass.trim() === '') {
    return 'Password cannot be empty.';
  }
  if (pass.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  return null;
}
