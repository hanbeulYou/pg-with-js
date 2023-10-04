// import TossBiliingComponent from "./TossBilling/TossBillingComponent";
import TossBillingWithApi from "./TossBillingWithAPI/TossBillingWithApi";
// import SmartroPayment from "./Smartro/SmartroPayComponent";
// import TossPaymentsComponent from "./TossPayments/TossPaymentsComponent";

export default function Home() {
  return (
    <div>
      {/* <SmartroPayment/> */}
      {/* <TossPaymentsComponent /> */}
      {/* <TossBiliingComponent /> */}
      <TossBillingWithApi />
    </div>
  );
}
