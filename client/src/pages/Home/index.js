import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GetUserInfo } from "../../api/users";
import PageTitle from "../../components/PageTitle";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  console.log(user);
  return (
    <div>
      <PageTitle title={`Hello ${user.firstname}, Welcome to Aris Wallet`} />

      <div className="mt-2 p-3">
        <table style={{ border: "none" }}>
          <tr>
            <td>User ID</td>
            <td>:</td>
            <td>{user._id}</td>
          </tr>
          <tr>
            <td>Fullname</td>
            <td>:</td>
            <td>
              {user.firstname}&nbsp;
              {user.lastname}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>:</td>
            <td>{user.phoneNumber}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>:</td>
            <td>{user.balance}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Home;
