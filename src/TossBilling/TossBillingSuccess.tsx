import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TossBillingSuccess = () => {
  const query = useQuery();

  const handleBtnClick = () => {
    const customerKey = query.get("customerKey");
    const authKey = query.get("authKey");

    const secretKey = btoa(process.env.REACT_APP_TOSS_SK + ":");
    const postURL =
      "https://api.tosspayments.com/v1/billing/authorizations/issue";
    const headers = {
      Authorization: `Basic ${secretKey}`,
      "Content-Type": "application/json",
    };
    const data = {
      authKey: authKey,
      customerKey: customerKey,
    };

    const postBillingKey = async () => {
      try {
        const res = await axios.post(postURL, data, { headers });
        console.log(res.data);
      } catch (error) {
        console.error("post Payment Confirm Axios Error : ", error);
      }
    };

    postBillingKey();
  };

  return (
    <div>
      <h3>토스 빌링 키 발급 성공</h3>

      <button
        onClick={() => {
          handleBtnClick();
        }}
      >
        빌링 값 확인
      </button>
    </div>
  );
};

export default TossBillingSuccess;
