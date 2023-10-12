/* eslint-disable no-restricted-globals */
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import BINNumber from "../BINNumber.json";

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

type CheckValidProps = {
  cardNumber: string;
  cardIssuer: string;
  setCardIssuer: React.Dispatch<SetStateAction<string>>;
};

const Input = ({ label, register, required }: any) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} style={{ marginBottom: "8px" }} />
  </>
);

function checkCardNumberValid({
  cardNumber,
  cardIssuer,
  setCardIssuer,
}: CheckValidProps) {
  if (cardNumber === undefined) return setCardIssuer("");
  if (cardNumber.length < 4) return setCardIssuer("");

  let tmpCardIssuer = "";
  const intCardNumber = parseInt(cardNumber.slice(0, 4));
  if (cardNumber[0] === "4") tmpCardIssuer = "VISA";
  if (intCardNumber >= 2221 && intCardNumber <= 2720) tmpCardIssuer = "MASTER";
  if (cardNumber[0] === "3" && (cardNumber[1] === "4" || cardNumber[1] === "7"))
    cardIssuer = "AMERICAN EXPRESS";
  if (intCardNumber >= 3528 && intCardNumber <= 3589) tmpCardIssuer = "JCB";
  if (intCardNumber >= 5100 && intCardNumber <= 5599) tmpCardIssuer = "MASTER";

  console.log(tmpCardIssuer);
  let idx = -1;
  for (let i = 8; i >= 4; i--) {
    if (cardNumber.length < i) continue;
    idx = Math.max(
      idx,
      BINNumber.findIndex((e) => e.BinNumber === cardNumber.slice(0, i))
    );
  }
  if (idx === -1)
    return setCardIssuer(tmpCardIssuer !== "" ? tmpCardIssuer : cardIssuer);
  const koreanCardIssuer = BINNumber[idx].Company;
  tmpCardIssuer === ""
    ? (tmpCardIssuer = koreanCardIssuer)
    : (tmpCardIssuer += "/" + koreanCardIssuer);

  return setCardIssuer(tmpCardIssuer);
}

export default function TossBillingWithApi() {
  const [paymentBtn, setPaymentBtn] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<Payment>({
    customerKey: "",
    amount: "",
    orderId: "",
    orderName: "",
  });
  const [billingKey, setBillingKey] = useState<string>("");
  const { register, handleSubmit, control } = useForm<FormValues>({});
  const secretKey = btoa(process.env.REACT_APP_TOSS_SK + ":");
  const watchedCardNumber = useWatch({ control, name: "cardNumber" });
  const [cardIssuer, setCardIssuer] = useState<string>("");

  useEffect(() => {
    checkCardNumberValid({
      cardNumber: watchedCardNumber,
      cardIssuer,
      setCardIssuer,
    });
  }, [cardIssuer, watchedCardNumber]);

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
        <Controller
          control={control}
          name="cardNumber"
          render={() => (
            <Input label="cardNumber" register={register} required />
          )}
        ></Controller>
        <Input label="cardExpirationYear" register={register} required />
        <Input label="cardExpirationMonth" register={register} required />
        <Input label="customerIdentityNumber" register={register} required />
        <button type="submit">빌링 키 발급</button>
      </form>
      <p>카드 타입 : {cardIssuer}</p>
      {paymentBtn && (
        <button onClick={handlePaymentBtn}>빌링 키 결제 요청</button>
      )}
    </div>
  );
}
