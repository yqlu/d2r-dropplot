import { range } from "lodash-es";

export type Matrix = number[][];

export const cols = (a: Matrix) => {
  return a[0].length;
};

export const rows = (a: Matrix) => {
  return a.length;
};

export const canMultiply = (a: Matrix, b: Matrix) => {
  return cols(a) === rows(b);
};

export const makeEmpty = (rows: number, cols: number) => {
  return [...Array(rows)].fill(0).map(() => [...Array(cols)].fill(0));
};

export const multiply = (a: Matrix, b: Matrix) => {
  if (!canMultiply(a, b)) {
    throw new Error("operands don't have compatible shapes");
  }
  const numRows = rows(a);
  const numCols = cols(b);
  const dotProductLength = cols(a);
  return makeEmpty(numRows, numCols).map((resultRow, i) =>
    resultRow.map((element: number, j: number) => {
      return range(dotProductLength)
        .map((idx) => a[i][idx] * b[idx][j])
        .reduce((acc, val) => acc + val, 0);
    })
  );
};
