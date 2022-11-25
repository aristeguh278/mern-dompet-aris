import React, { useState } from "react";
import { Col, Form, message, Row, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const onFinish = async (values) => {
    if (values.password !== values.confirmpassword) {
      return message.error("password not same");
    }

    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        dispatch(ShowLoading());
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoading());
      message.error(error.message);
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
        <div style={{ alignItems: "flex-end" }} onClick={() => navigate("/login")}>
          Already a member? Login here
        </div>
      </div>
      <hr />

      <Form className="container" layout="vertical" onFinish={onFinish}>
        <Row className="row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col flex="1 0 25%" className="column">
            <Form.Item label="First Name" name="firstname">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col flex="1 0 25%" className="column">
            <Form.Item label="Last Name" name="lastname">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col flex="1 0 25%" className="column">
            <Form.Item label="Email" name="email">
              <input type="email" />
            </Form.Item>
          </Col>

          <Col flex="1 0 25%" className="column">
            <Form.Item label="Mobile Number" name="phoneNumber">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item label="Identification Type" name="identificationType">
              <select>
                <option value="NATIONAL ID">National ID</option>
                <option>Passport</option>
                <option>Driving License</option>
                <option>Social Security Card</option>
              </select>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item label="Identification Number" name="identificationNumber">
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea></textarea>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item label="Password" name="password">
              <div className="input-password">
                <input type={passwordType} className="input" />
                <i
                  onClick={togglePassword}
                  className={
                    passwordType === "password"
                      ? `fa-sharp fa-solid fa-eye`
                      : `fa-sharp fa-solid fa-eye-slash`
                  }
                  style={{ cursor: "pointer" }}></i>
              </div>
            </Form.Item>
          </Col>
          <Col flex="1 0 25%" className="column">
            <Form.Item label="Confirm Password" name="confirmpassword">
              <div className="input-password">
                <input type={passwordType} className="input" />
                <i
                  className={
                    passwordType === "password"
                      ? `fa-sharp fa-solid fa-eye`
                      : `fa-sharp fa-solid fa-eye-slash`
                  }
                  style={{ cursor: "pointer" }}
                  onClick={togglePassword}></i>
              </div>
            </Form.Item>
          </Col>
          <Col className="column flex justfiy-end flex-end" style={{ alignItems: "center" }}>
            <div>
              <button className="primary-contained-btn " onClick={onFinish}>
                Register
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
