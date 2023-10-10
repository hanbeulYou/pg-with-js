/* eslint-disable no-restricted-globals */
import axios from "axios";
import { useForm } from "react-hook-form";

type FormValues = {
  cardNumber: string;
  cardExpirationYear: string;
  cardExpirationMonth: string;
  customerIdentityNumber: string;
};

const Input = ({ label, register, required }: any) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} style={{ marginBottom: "8px" }} />
  </>
);

export default function TossKeyInPayment() {
  const { register, handleSubmit } = useForm<FormValues>({});
  const secretKey = btoa(process.env.REACT_APP_TOSS_SK + ":");

  const onSubmit = (values: FormValues) => {
    const postURL = "https://api.tosspayments.com/v1/payments/key-in";
    const headers = {
      Authorization: `Basic ${secretKey}`,
      "Content-Type": "application/json",
    };
    const uuid = self.crypto.randomUUID();
    const data = {
      ...values,
      amount: "5000",
      orderId: "hayou" + uuid,
      orderName: "테스트용 결제 품목",
    };

    const postKeyInPayment = async () => {
      try {
        const res = await axios.post(postURL, data, { headers });
        console.log("post Key-In Payment Response Data : ", res.data);
      } catch (error) {
        console.error("post Key-In Payment Axios Error : ", error);
      }
    };

    postKeyInPayment();
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
        <button type="submit">키인 결제 요청</button>
      </form>
    </div>
  );
}
