import React, { useState } from "react";
import { Col, Form, Row, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());

      if (response) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
        // window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <div
      className="m-1half"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h1 className="text-2xl bold mb-1">MERN WALLET</h1>
      <div
        style={{
          width: "100%",
          margin: 5,
          display: "flex",
          justifyContent: "flex-end",
        }}
        className="column">
        <div style={{ alignItems: "flex-end" }} onClick={() => navigate("/register")}>
          Not a member? Registre here
        </div>
      </div>
      <hr />

      <Form className="container-login" layout="vertical" onFinish={onFinish}>
        <div>
          <Col span={24}>
            <Form.Item label="Email" name="email">
              <input type="email" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Password" name="password">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col className="column flex justfiy-end flex-end" style={{ alignItems: "center" }}>
            <div>
              <button className="primary-contained-btn ">Login</button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default Login;
