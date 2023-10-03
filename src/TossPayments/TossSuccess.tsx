import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TossSuccess = () => {
  const query = useQuery();

  const handleBtnClick = () => {
    const orderId = query.get("orderId");
    const paymentKey = query.get("paymentKey");
    const amount = query.get("amount");

    const secretKey = btoa(process.env.REACT_APP_TOSS_SK + ":");
    const postURL = "https://api.tosspayments.com/v1/payments/confirm";
    const headers = {
      Authorization: `Basic ${secretKey}`,
      "Content-Type": "application/json",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    };
    const data = {
      paymentKey: paymentKey,
      orderId: orderId,
      amount: amount,
    };

    const postPaymentConfirm = async () => {
      try {
        const res = await axios.post(postURL, data, { headers });
        console.log(res.data);
      } catch (error) {
        console.error("post Payment Confirm Axios Error : ", error);
      }
    };

    postPaymentConfirm();
  };

  return (
    <div>
      <h3>토스 성공 페이지</h3>

      <button
        onClick={() => {
          handleBtnClick();
        }}
      >
        토스 결제창 OPEN
      </button>
    </div>
  );
};

export default TossSuccess;
