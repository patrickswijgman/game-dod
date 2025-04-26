export function addVector(i: number, x1: Float32Array, y1: Float32Array, j: number, x2: Float32Array, y2: Float32Array, s = 1) {
  x1[i] += x2[j] * s;
  y1[i] += y2[j] * s;
}

export function scaleVector(i: number, x: Float32Array, y: Float32Array, s: number) {
  x[i] *= s;
  y[i] *= s;
}

export function normalizeVector(i: number, x: Float32Array, y: Float32Array) {
  const len = getVectorLength(i, x, y);
  if (len) {
    x[i] /= len;
    y[i] /= len;
  }
}

export function resetVector(i: number, x: Float32Array, y: Float32Array) {
  x[i] = 0;
  y[i] = 0;
}

export function getVectorLength(i: number, x: Float32Array, y: Float32Array) {
  return Math.sqrt(x[i] * x[i] + y[i] * y[i]);
}
