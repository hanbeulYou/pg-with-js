import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

declare global {
  interface Window {
    smartropay: any; // 원하는 타입으로 대체 가능합니다.
  }
}

const SmartroPayment = () => {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    // 스마트로페이 초기화
    if (window.smartropay) {
      window.smartropay.init({ mode: "STG" }); // STG: 테스트, REAL: 운영(운영서버 전환 시 변경 필수!)
    }
  }, []);

  const onSubmit = () => {
    if (window.smartropay) {
      window.smartropay.payment({
        // ... other payment details ...
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
