/* eslint-disable no-extend-native */
declare global {
  interface Date {
    yyyyMMddHHmmss: () => string;
    yyyyMMdd: () => string;
  }
}

Date.prototype.yyyyMMddHHmmss = function () {
  const yyyy = this.getFullYear().toString();
  const MM = makeLenTwo(this.getMonth() + 1);
  const dd = makeLenTwo(this.getDate());
  const HH = makeLenTwo(this.getHours());
  const mm = makeLenTwo(this.getMinutes());
  const ss = makeLenTwo(this.getSeconds());
  return yyyy + MM + dd + HH + mm + ss;
};

Date.prototype.yyyyMMdd = function () {
  const yyyy = this.getFullYear().toString();
  const MM = makeLenTwo(this.getMonth() + 1);
  const dd = makeLenTwo(this.getDate());
  return yyyy + MM + dd;
};

function makeLenTwo(value: number) {
  return value >= 10 ? value.toString() : "0" + value.toString();
}

async function encodeSHA256Base64(strPW: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(strPW);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

export const Mid = "";
export const MerchantKey = "";
export const EdiDate = new Date().yyyyMMddHHmmss();
export const Amt = "1004";
export const EncryptData = encodeSHA256Base64(
  EdiDate + Mid + Amt + MerchantKey
);
export const today = new Date().yyyyMMdd();
