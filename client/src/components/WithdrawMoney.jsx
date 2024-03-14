import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../redux/actions/orderAction";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../redux/actions/userAction";
import { AiOutlineDelete } from "react-icons/ai";

export default function WithdrawMoney() {
  const [open, setOpen] = useState(false);
  const { currentSeller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: 0,
    bankHolderName: "",
    bankAddress: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopOrders(currentSeller._id));
  }, [dispatch]);

  function handleChange(e) {
    const { id, value } = e.target;
    setBankInfo({
      ...bankInfo,
      [id]: value,
    });
  }

  async function withdrawHandler() {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `/api/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw money request is successful!");
        });
    }
  }

  async function deleteHandler() {
    await axios
      .delete(`/api/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPaymentMethod(false);

    await axios
      .put(`/api/shop/update-payment-methods`, bankInfo, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: 0,
          bankAccountNumber: 0,
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  const availableBalance = currentSeller?.availableBalance?.toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className="w-[150px] bg-black my-3 flex items-center justify-center cursor-pointer text-white h-[42px] rounded"
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] lg:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add new Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={handleChange}
                      id="bankName"
                      placeholder="Enter your Bank name!"
                      className="w-full border p-1 rounded-[5px] mt-2"
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bankInfo.bankCountry}
                      onChange={handleChange}
                      id="bankCountry"
                      required
                      placeholder="Enter your bank Country!"
                      className="w-full border p-1 rounded-[5px] mt-2"
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="bankSwiftCode"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={handleChange}
                      placeholder="Enter your Bank Swift Code!"
                      className="w-full border p-1 rounded-[5px] mt-2"
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="bankAccountNumber"
                      value={bankInfo.bankAccountNumber}
                      onChange={handleChange}
                      required
                      placeholder="Enter your bank account number!"
                      className="w-full border p-1 rounded-[5px] mt-2"
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankHolderName}
                      onChange={handleChange}
                      id="bankHolderName"
                      placeholder="Enter your bank Holder name!"
                      className="w-full border p-1 rounded-[5px] mt-2"
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      id="bankAddress"
                      value={bankInfo.bankAddress}
                      onChange={handleChange}
                      placeholder="Enter your bank address!"
                      className="w-full border p-1 rounded-[5px] mt-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[18px] mt-4 mb-3 text-white"
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins">
                  Available Withdraw Methods:
                </h3>

                {currentSeller && currentSeller?.withdrawMethod ? (
                  <div>
                    <div className="lg:flex w-full justify-between items-center">
                      <div className="lg:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            currentSeller?.withdrawMethod.bankAccountNumber
                              .length - 3
                          ) +
                            currentSeller?.withdrawMethod.bankAccountNumber.slice(
                              -3
                            )}
                        </h5>
                        <h5>
                          Bank Name: {currentSeller?.withdrawMethod.bankName}
                        </h5>
                      </div>
                      <div className="lg:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="lg:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="lg:w-[100px] w-[full] border lg:mr-3 p-1 rounded"
                      />
                      <div
                        className="w-[150px] bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer h-[42px] text-white"
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      No Withdraw Methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer text-[#fff] text-[18px] mt-4"
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
