import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { message, Table } from "antd";
import TransferFundsModal from "../components/TransferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { GetTransactionsOfUser } from "../api/transactions";
import moment from "moment";
import DepositModal from "../components/DepositModal";

const Transaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.users);
  const columns = [
    { title: "Transaction ID", dataIndex: "_id" },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY");
      },
    },
    {
      title: "Amount",
      //dataIndex: "amount",
      render: (text, record) => {
        return record.receiver._id === user._id ? (
          <span style={{ color: "green", fontWeight: "bold" }}>+ {record.amount}</span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>- {record.amount}</span>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender._id === user._id ? "Transfer" : "TopUp";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "type",
      render: (text, record) => {
        return record.receiver._id === user._id ? (
          <span>
            <h1 className="text-sm">
              You
              {record.receiver._id === record.sender._id ? (
                <span> has already top up</span>
              ) : (
                <span>
                  ,from {record.sender.firstname} {record.sender.lastname}
                </span>
              )}
            </h1>
          </span>
        ) : (
          <span>
            <h1 className="text-sm">
              to: {record.receiver.firstname} {record.receiver.lastname}
            </h1>
          </span>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUser();
      console.log(response);
      if (response.success) {
        setData(response.data);
        console.log(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle title="Transaction" />
        <div className="flex gap-1">
          <button className="outline-btn" onClick={() => setShowDepositModal(true)}>
            Deposit
          </button>
          <button className="primary contained-btn" onClick={() => setShowModal(true)}>
            Transfer
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" pagination={{ pageSize: 6 }} />

      {showModal && <TransferFundsModal showModal={showModal} setShowModal={setShowModal} />}

      {showDepositModal && (
        <DepositModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </>
  );
};

export default Transaction;
