/* eslint-disable no-restricted-globals */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  customerKey: string;
  cardNumber: string;
  cardExpirationYear: string;
  cardExpirationMonth: string;
  customerIdentityNumber: string;
};

type Payment = {
  customerKey: string;
  amount: string;
  orderId: string;
  orderName: string;
};

const Input = ({ label, register, required }: any) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} style={{ marginBottom: "8px" }} />
  </>
);

export default function TossBillingWithApi() {
  const [paymentBtn, setPaymentBtn] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<Payment>({
    customerKey: "",
    amount: "",
    orderId: "",
    orderName: "",
  });
  const [billingKey, setBillingKey] = useState<string>("");
  const { register, handleSubmit } = useForm<FormValues>({});
  const secretKey = btoa(process.env.REACT_APP_TOSS_SK + ":");

  const onSubmit = (values: FormValues) => {
    const postURL =
      "https://api.tosspayments.com/v1/billing/authorizations/card";
    const headers = {
      Authorization: `Basic ${secretKey}`,
      "Content-Type": "application/json",
    };
    const uuid = self.crypto.randomUUID();
    const data = { ...values, customerKey: uuid };

    const postBillingKey = async () => {
      try {
        const res = await axios.post(postURL, data, { headers });
        console.log("post Billing Key Response Data : ", res.data);
        setPaymentBtn(true);
        setBillingKey(res.data.billingKey);
        setPaymentData({ ...paymentData, customerKey: res.data.customerKey });
      } catch (error) {
        console.error("post Billing Key Axios Error : ", error);
      }
    };

    postBillingKey();
  };

  // 빌링키 생성까지는 되지만 결제는 안됨
  // NOT_SUPPORTED_CARD_TYPE
  const handlePaymentBtn = () => {
    const postPaymentURL = `https://api.tosspayments.com/v1/billing/${billingKey}`;
    const uuid = self.crypto.randomUUID();
    setPaymentData({
      ...paymentData,
      amount: "5000",
      orderId: "hayou" + uuid,
      orderName: "테스트용 결제 품목",
    });
    const headers = {
      Authorization: `Basic ${secretKey}`,
      "Content-Type": "application/json",
    };

    const postPayment = async () => {
      try {
        const res = await axios.post(postPaymentURL, paymentData, { headers });
        console.log(res.data);
      } catch (error) {
        console.error("post Payment Axios Error : ", error);
      }
    };

    postPayment();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "4px",
          width: "320px",
        }}
      >
        <Input label="cardNumber" register={register} required />
        <Input label="cardExpirationYear" register={register} required />
        <Input label="cardExpirationMonth" register={register} required />
        <Input label="customerIdentityNumber" register={register} required />
        <button type="submit">빌링 키 발급</button>
      </form>
      {paymentBtn && (
        <button onClick={handlePaymentBtn}>빌링 키 결제 요청</button>
      )}
    </div>
  );
}
