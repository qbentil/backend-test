export function getRandomItems<T>(arr: T[], count: number = 1): T[] {
  if (arr.length === 0) {
    throw new Error("Array cannot be empty");
  }

  if (count <= 0) {
    throw new Error("Count must be greater than 0");
  }

  if (count > arr.length) {
    throw new Error(
      `Cannot get ${count} items from an array of length ${arr.length}`,
    );
  }

  // Create a copy of the array to avoid modifying the original
  const shuffled = [...arr];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' elements
  return shuffled.slice(0, count);
}
