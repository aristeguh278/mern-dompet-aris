import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../resources/images/logo.png";
import logoCollapse from "../resources/images/logo-collapsed.png";

import { Button, Dropdown, Space } from "antd";
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },

  {
    type: "divider",
  },
  {
    label: (
      <span>
        <i className="ri-logout-circle-r-line" style={{ color: "red", fontSize: "19px" }} /> Logout
      </span>
    ),
    key: "3",
  },
];

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  //   const {user} = useSelector((state)=>state.users)

  const userMenu = [
    {
      title: "Home",
      icon: <i class="ri-home-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transaction"),
      path: "/transaction",
    },
    {
      title: "Request",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/transaction"),
      path: "/transaction",
    },
    {
      title: "Profile",
      icon: <i class="ri-user-settings-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i class="ri-home-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <i class="ri-file-user-line"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transaction"),
      path: "/transaction",
    },
    {
      title: "Request",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/request"),
      path: "/request",
    },
    {
      title: "Profile",
      icon: <i class="ri-user-settings-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];
  return (
    <div className="layouts">
      <div className={collapsed ? "sidebar-collapse" : "sidebar"}>
        {/* MENU ITEM */}
        <img style={{ maxWidth: collapsed ? "80px" : 180 }} src={collapsed ? logoCollapse : logo} />
        <div className={collapsed ? "menu-collapse" : "menu"}>
          {adminMenu.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                onClick={item.onClick}
                className={`${collapsed ? "menu-item-collapse" : "menu-item"} ${
                  isActive ? "active-menu-item" : ""
                }`}
                style={{ display: "flex", alignItems: "center" }}>
                <span
                  className={collapsed ? "menu-icon-collapse" : "menu-icon"}
                  // style={{ marginRight: 20, fontSize: 25 }}
                >
                  {" "}
                  {item.icon}
                </span>
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>

        <div className="box-sidebar">
          <img
            className="box-image"
            src="https://demos.wrappixel.com/free-admin-templates/react/flexy-react-free/main/static/media/sidebar-buynow.b08d6a6e.png"
            alt="/free-admin-templates/react/flexy-react-free/main/static/media/sidebar-buynow.b08d6a6e.png"
          />

          <h5 className="text-box">
            <strong>Dompet Aris</strong> MERN STACK
          </h5>

          <Button type="primary" danger>
            Logout
          </Button>
        </div>
      </div>
      <div className="body">
        <div
          className={
            collapsed
              ? "header-collapse flex justify-between items-center"
              : "header flex justify-between items-center"
          }>
          <div>
            {collapsed ? (
              <i
                onClick={() => setCollapsed(!collapsed)}
                class="ri-close-circle-line"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              />
            ) : (
              <i
                onClick={() => setCollapsed(!collapsed)}
                className="ri-menu-2-fill"
                style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
              />
            )}
          </div>

          <div style={{ color: "white" }}></div>
          <div
            style={{
              minWidth: "150px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <i class="ri-notification-3-line" style={{ fontSize: "25px" }}></i>
            <div className="vl" />

            <Dropdown
              placement="bottomRight"
              menu={{
                items,
              }}
              trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {" "}
                  <img
                    alt="/free-admin-templates/react/flexy-react-free/main/static/media/user.e18935c7.jpg"
                    src="https://demos.wrappixel.com/free-admin-templates/react/flexy-react-free/main/static/media/user.e18935c7.jpg"
                    className="image"
                  />{" "}
                  Aris Teguh
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className={collapsed ? "content-collapse" : "content"}>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
