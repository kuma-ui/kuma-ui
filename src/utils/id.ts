export function generateRandomId() {
  return Math.random().toString(36).substr(2, 10);
}
