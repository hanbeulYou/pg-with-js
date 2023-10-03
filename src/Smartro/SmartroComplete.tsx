import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type ApiProps = {
  TrAuthKey: string;
  Tid: string;
};

const Complete = () => {
  const [result, setResult] = useState({});
  const query = useQuery();

  const TEST_URL =
    "https://tapproval.smartropay.co.kr/payment/approval/urlCallApproval.do";
  // const OPERATING_URL =
  //   "https://approval.smartropay.co.kr/payment/approval/urlCallApproval.do";
  const URL = TEST_URL; // or OPERATING_URL;

  const callApi = async ({ TrAuthKey, Tid }: ApiProps) => {
    try {
      const response = await axios.post(
        URL,
        {
          Tid: Tid,
          TrAuthKey: TrAuthKey,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000, // 10 seconds
        }
      );

      console.log("response", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  useEffect(() => {
    const TrAuthKey = query.get("TrAuthKey");
    const Tid = query.get("Tid");

    // Tid와 TrAuthKey가 있을 때만 API 호출
    if (Tid && TrAuthKey) {
      callApi({ TrAuthKey, Tid });
    }
  }, []);

  return (
    <div>
      <p>컴플리트</p>
    </div>
  );
};

export default Complete;
