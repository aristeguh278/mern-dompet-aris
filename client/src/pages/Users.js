import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllUsers } from "../api/users";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";
import { message, Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await GetAllUsers();
    dispatch(HideLoading());
    if (response.success) {
      setUsers(response.data);
    } else {
      message.error(response.error);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
  ];

  useEffect(() => {
    getData();
  }, [setUsers]);
  console.log(users);
  return <div>{users !== [] && <Table dataSource={users} columns={columns} />}</div>;
};

export default Users;
