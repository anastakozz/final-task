export default function shuffleProducts<T>(data: T[]): T[] {
  const random = data.map(Math.random);
  data.sort((a, b) => random[data.indexOf(a)] - random[data.indexOf(b)]);
  return data;
}
