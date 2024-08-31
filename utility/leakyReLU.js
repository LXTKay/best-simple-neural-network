export default function leakyReLU(value) {
  if (value < 0) return value * 0.01;
  return value;
}