declare global {
  interface Window {
    TossPayments: any; // 원하는 타입으로 대체 가능합니다.
  }
}

export default function TossBiliingComponent() {
  const handleBtnClick = () => {
    const clientKey = process.env.REACT_APP_TOSS_CK;

    if (window.TossPayments) {
      const tossPayments = window.TossPayments(clientKey);
      tossPayments
        .requestBillingAuth("카드", {
          // customerKey 관련 레퍼런스 : https://docs.tosspayments.com/reference#v1billingauthorizationsissuepost-customerkey
          customerKey: "78_wDrJ1Ym5PF7nCl-SiX",
          successUrl: "http://localhost:3000/toss-billing/success",
          failUrl: "http://localhost:3000/toss-billing/fail",
        })
        .catch(function (error: any) {
          if (error.code === "USER_CANCEL") {
            console.error("고객이 결제창을 닫았습니다");
          }
        });
    } else {
      console.error("TossPayments 스크립트가 로드되지 않았습니다.");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleBtnClick();
        }}
      >
        토스 카드 등록 OPEN
      </button>
    </div>
  );
}
