import { Form, message } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../api/transactions";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

const DepositModal = ({ showDepositModal, setShowDepositModal, reloadData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await DepositFunds({ token, amount: form.getFieldValue("amount") });
      dispatch(HideLoading());
      if (response.success) {
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      footer={null}
      onCancel={() => setShowDepositModal(false)}>
      <div className="flex-col gap-1 mt-2">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            ]}>
            <input type="number" />
          </Form.Item>
          <div className="flex justify-end" style={{ justifyContent: "flex-end" }}>
            {/* <button className="rimary outline-btn">Cancel</button> */}

            <StripeCheckout
              currency="USD"
              amount={form.getFieldValue("amount") / 15000}
              // shippingAddress
              // billingAddress
              token={onToken}
              stripeKey="pk_test_51M791ZK3dVkEG6ovM0IYLtJAr4bkJnh4oONNYpfxfYvZEnsXcOlZalwpKTRROto0GVKZXI6t1ZswyrHR1bkSq15t00sUprMzLp">
              <button className="primary contained-btn">Deposit</button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DepositModal;
