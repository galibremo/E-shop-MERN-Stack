import { useState } from "react";
import { useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Checkout() {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  function paymentSubmit() {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        country: formData.country,
        city: formData.city,
        address1: formData.address1,
        address2: formData.address2,
        zipCode: formData.zipCode,
      };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPercentenge,
        shippingAddress,
        currentUser,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = couponCode;
    await axios.get(`/api/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);
        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  }

  const discountPercentenge = couponCodeData ? discountPrice : "";
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div>
      <div className="w-full flex flex-col items-center py-8">
        <div className="w-[90%] 1000px:w-[70%] block lg:flex">
          <div className="w-full lg:w-[65%]">
            <ShippingInfo
              formData={formData}
              currentUser={currentUser}
              setFormData={setFormData}
            />
          </div>
          <div className="w-full lg:w-[35%] lg:mt-0 mt-8">
            <CartData
              totalPrice={totalPrice}
              subTotalPrice={subTotalPrice}
              shipping={shipping}
              setCouponCode={setCouponCode}
              couponCode={couponCode}
              discountPercentenge={discountPercentenge}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <div
          className="bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer w-[150px] lg:w-[280px] mt-10"
          onClick={paymentSubmit}
        >
          <h5 className="text-white">Go to Payment</h5>
        </div>
      </div>
    </div>
  );
}

const ShippingInfo = ({ formData, currentUser, setFormData }) => {
  const [userInfo, setUserInfo] = useState(false);

  function handleChange(e) {
    const { id, value, checked } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  return (
    <div className="w-full lg:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              defaultValue={currentUser && currentUser.name}
              required
              className="w-[95%] border p-1 rounded-[5px]"
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              defaultValue={currentUser && currentUser.email}
              required
              className="w-[95%] border p-1 rounded-[5px]"
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              defaultValue={currentUser && currentUser.phoneNumber}
              className="w-[95%] border p-1 rounded-[5px]"
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              id="zipCode"
              type="number"
              value={formData?.zipCode}
              onChange={handleChange}
              required
              className="w-full border p-1 rounded-[5px]"
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              id="country"
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={formData?.country}
              onChange={handleChange}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              id="city"
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={formData?.city}
              onChange={handleChange}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(formData?.country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              id="address1"
              type="text"
              required
              value={formData?.address1}
              onChange={handleChange}
              className="w-[95%] border p-1 rounded-[5px]"
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              id="address2"
              type="text"
              value={formData?.address2}
              onChange={handleChange}
              required
              className="w-full border p-1 rounded-[5px]"
            />
          </div>
        </div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {currentUser &&
            currentUser.addresses.map((item, index) => (
              <div className="w-full flex mt-1" key={index}>
                <input
                  type="radio"
                  className="mr-3"
                  name="selectedAddress"
                  value={item.addressType}
                  onClick={() =>
                    setFormData({
                      address1: item.address1,
                      address2: item.address2,
                      zipCode: item.zipCode,
                      country: item.country,
                      city: item.city,
                    })
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
const CartData = ({
  totalPrice,
  subTotalPrice,
  discountPercentenge,
  shipping,
  couponCode,
  setCouponCode,
  handleSubmit,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border p-1 rounded-[5px] h-[40px] pl-2"
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};
