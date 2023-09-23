import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
declare global {
  interface Window {
    smartropay: any; // 원하는 타입으로 대체 가능합니다.
  }
}

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

const SmartroPayment = () => {
  const { register, handleSubmit } = useForm();
  const Mid = "t_2304208m";
  const MerchantKey =
    "0/4GFsSd7ERVRGX9WHOzJ96GyeMTwvIaKSWUCKmN3fDklNRGw3CualCFoMPZaS99YiFGOuwtzTkrLo4bR4V+Ow==";
  const EdiDate = new Date().yyyyMMddHHmmss();
  const Amt = "1004";
  const [encryptData, setEncryptData] = useState<string>("");
  const today = new Date().yyyyMMdd();

  useEffect(() => {
    // 스마트로페이 초기화
    if (window.smartropay) {
      window.smartropay.init({ mode: "STG" }); // STG: 테스트, REAL: 운영(운영서버 전환 시 변경 필수!)
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await encodeSHA256Base64(EdiDate + Mid + Amt + MerchantKey);
      setEncryptData(data);
    };

    fetchData();
  }, [EdiDate, Mid, Amt, MerchantKey]);

  const onSubmit = () => {
    if (window.smartropay && encryptData) {
      window.smartropay.payment({
        PayMethod: "CARD",
        GoodsCnt: "1",
        GoodsName: "상품명",
        Amt: Amt,
        Moid: "Moid_20210112145131",
        Mid: Mid,
        ReturnUrl: "가맹점 ReturnUrl",
        StopUrl: "가맹점 StopUrl", // Mobile 연동 시 필수
        BuyerName: "구매자명",
        BuyerTel: "01099991111",
        BuyerEmail: "noname@smartro.co.kr",
        UserIp: "127.0.0.1",
        MallIp: "127.0.0.1",
        EdiDate: EdiDate,
        Forward: "Y",
        EncryptData: encryptData,

        Callback: function (res: any) {
          handleSubmit((data) => {
            data.Tid = res.Tid;
            data.TrAuthKey = res.TrAuthKey;
            // TODO: Implement further approval logic here if needed.
          })();
        },
      });
    }
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan={4}>
              <button type="button" onClick={onSubmit}>
                결제하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <form id="approvalForm" name="approvalForm" method="post">
        <input type="hidden" {...register("Tid")} />
        <input type="hidden" {...register("TrAuthKey")} />
      </form>
    </div>
  );
};

export default SmartroPayment;
