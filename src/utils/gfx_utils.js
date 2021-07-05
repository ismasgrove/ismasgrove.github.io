import { Color } from 'three'

export const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low)
}

export const mapRanges = (n, start1, stop1, start2, stop2, withinBounds = false) => {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
  }
    
export const paletteLerpRGB = (a, b, n) => {
  let palette = []

  if (n == 1) {
    palette.push(a)
    return palette
  }

  for (let i = 0; i < n; i++) {
    let amount = mapRanges(i, 0, n-1, 0, 1)
    const col = new Color()
    col.lerpColors(a, b, amount)
    palette.push(col)
  }
  
  return palette
}