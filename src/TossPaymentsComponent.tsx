declare global {
  interface Window {
    TossPayments: any; // 원하는 타입으로 대체 가능합니다.
  }
}

export default function TossPaymentsComponent() {
  const handleBtnClick = () => {
    const clientKey = process.env.REACT_APP_TOSS_CK;

    if (window.TossPayments) {
      const tossPayments = window.TossPayments(clientKey);
      tossPayments.requestPayment("카드", {
        amount: 15000,
        orderId: "nhHscjVLLU06jzULNDWp6",
        orderName: "토스 티셔츠 외 2건",
        customerName: "박토스",
        successUrl: "http://localhost:3000/toss/success",
        failUrl: "http://localhost:3000/toss/fail",
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
        토스 결제창 OPEN
      </button>
    </div>
  );
}
