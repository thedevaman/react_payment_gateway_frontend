import useRazorpay from "react-razorpay";
const App=()=>{
  const [Razorpay] = useRazorpay()
  const  payNow= async ()=>{
     const response = await fetch('http://localhost:8080/')
     const data = await response.json()
     const options = {
      amount:data.amount,
      order_id:data.orderId,
      key: "rzp_test_JVoQUmr7AVNOjC",
      currency: "INR",
      name: "Test",
      description: "React Paymentgateway test",
      image: "https://example.com/your_logo",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Aman Kumar",
        email: "aman@example.com",
        contact: "9999999999",
      },
     }
     const razor = new Razorpay(options)
     razor.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
     razor.open();
  }
  return (
    <div>
      <h1>Payment gateway</h1>
      <button onClick={payNow}>Pay Now</button>
    </div>
  )
}

export default App
