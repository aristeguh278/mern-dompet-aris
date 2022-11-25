import React, { useState } from "react";
import { Form, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TransferFunds, VerifyRecieverAccount } from "../api/transactions";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";

const TransferFundsModal = ({ showModal, setShowModal, reloadData }) => {
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.users);
  const balance = user.balance;
  const handleClose = () => {
    setShowModal(false);
  };
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());
      const receiver = form.getFieldValue("receiver");
      const response = await VerifyRecieverAccount({ receiver });

      dispatch(HideLoading());

      if (response.success) {
        console.log(response);
        setIsVerified("true");
      } else {
        //setIsVerified("true");
        setIsVerified("false");
        dispatch(HideLoading());
      }
    } catch (error) {
      setIsVerified("false");
      dispatch(HideLoading());
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const payload = {
        ...values,
        sender: user._id,
        reference: values.receiver,
        status: "Success",
      };

      const response = await TransferFunds(payload);
      console.log(response);

      if (response.success) {
        setShowModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <div>
      <Modal
        title="transfer funds"
        open={showModal}
        onClose={handleClose}
        onCancel={handleClose}
        footer={null}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item label="Account Number" name="receiver" className="w-100">
              <input type="text" />
            </Form.Item>
            <button
              type="button"
              className="verify primary contained-btn mt-1"
              onClick={verifyAccount}>
              Verify
            </button>
          </div>

          {isVerified === "true" && (
            <div>
              <h1 className="text-sm text-green">Account Verified</h1>
              <div className="mt-2">
                <Form.Item
                  on
                  label="Amount"
                  name="amount"
                  className="w-100"
                  rules={[
                    { required: true, message: "Please  input your amount" },
                    { max: balance, message: "In sufficient balance" },
                  ]}>
                  <input type="number" max={balance} />
                </Form.Item>
                <Form.Item label="Description" name="description" className="w-100">
                  <textarea />
                </Form.Item>
              </div>
              <div className="mt-1">
                <div className="flex justify-end gap-1" style={{ justifyContent: "flex-end" }}>
                  <button className="primary outline-btn">Cancel</button>
                  {/* {Number(form.getFieldValue("amount")) < balance && ( */}
                  <button className="primary contained-btn">Transfer</button>
                  {/* )} */}
                  {JSON.stringify(Number(form.getFieldValue("amount")))}
                </div>
              </div>
            </div>
          )}
          {isVerified === "false" && <h5>Invalid account</h5>}
        </Form>
      </Modal>
    </div>
  );
};

export default TransferFundsModal;
