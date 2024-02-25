import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { emptyCartItem } from "../redux/actions/cartAction";

export default function Payment() {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    currentUser: currentUser && currentUser,
    totalPrice: orderData?.totalPrice,
  };

  function createOrder(data, actions) {}
  function onApprove(data, actions) {}
  function paypalPaymentHandler(data, actions) {}
  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
    name: orderData?.name,
    address: {
      line1: orderData?.shippingAddress?.address1,
      postal_code: orderData?.shippingAddress?.zipCode,
      city: orderData?.shippingAddress?.city,
      state: orderData?.shippingAddress?.address2,
      country: orderData?.shippingAddress?.country,
    },
  };

  async function paymentHandler(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/payment/process", paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios.post("/api/order/create-order", order).then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order successful!");
            dispatch(emptyCartItem());
          });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  }
  function cashOnDeliveryHandler() {}

  return (
    <div>
      <div className="w-full flex flex-col items-center py-8">
        <div className="w-[90%] xl:w-[70%] block lg:flex">
          <div className="w-full lg:w-[65%]">
            <PaymentInfo
              currentUser={currentUser}
              open={open}
              setOpen={setOpen}
              createOrder={createOrder}
              onApprove={onApprove}
              paypalPaymentHandler={paypalPaymentHandler}
              paymentHandler={paymentHandler}
              cashOnDeliveryHandler={cashOnDeliveryHandler}
            />
          </div>
          <div className="w-full lg:w-[35%] lg:mt-0 mt-8">
            <CartData orderData={orderData} />
          </div>
        </div>
      </div>
    </div>
  );
}

const PaymentInfo = ({
  paymentHandler,
  currentUser,
  open,
  setOpen,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);
  return (
    <div className="w-full lg:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={currentUser && currentUser.name}
                    className="border p-1 rounded-[5px] !w-[95%] text-[#444]"
                    defaultValue={currentUser && currentUser.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className="w-full border p-1 rounded-[5px]"
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className="border p-1 rounded-[5px] h-[35px] w-[95%]"
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className="w-full border p-1 rounded-[5px] h-[35px]"
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="w-[150px] my-3 flex items-center justify-center bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className="w-[150px] my-3 flex items-center justify-center !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full lg:w-[40%] h-screen lg:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className="w-[150px] my-3 flex items-center justify-center bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
const CartData = () => {};
