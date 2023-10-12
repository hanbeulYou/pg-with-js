// import TossBiliingComponent from "./TossBilling/TossBillingComponent";
import TossBillingWithApi from "./TossBillingWithAPI/TossBillingWithApi";
// import TossKeyInPayment from "./TossPayments/TossKeyIn";
// import SmartroPayment from "./Smartro/SmartroPayComponent";
// import TossPaymentsComponent from "./TossPayments/TossPaymentsComponent";

export default function Home() {
  return (
    <div>
      {/* <SmartroPayment/> */}
      {/* <TossPaymentsComponent /> */}
      {/* <TossBiliingComponent /> */}
      <TossBillingWithApi />
      {/* <TossKeyInPayment /> */}
    </div>
  );
}
