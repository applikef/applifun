export function getTimestamp(): string {
  return new Date().valueOf().toString();
} 

export function toRadians(degrees: number): number {
  return degrees * Math.PI / 180.0;
}