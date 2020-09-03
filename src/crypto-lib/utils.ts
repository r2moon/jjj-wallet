const SATOSHI = 100000000;

export const encodeQueryData = (data: any) => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

export const toSatoshi = (value: number) => {
  return Math.round(value * SATOSHI);
};

export const fromSatoshi = (value: number) => {
  return value / SATOSHI;
};

export default {
  encodeQueryData
};
