import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/authSlice";
import { useLoginUserMutation, useRegisterUserMutation } from "../../services/api/modules/auth"
import Layout from "../../components/Layout";

export interface IInitialState {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const initialState: IInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const AuthPage = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [showRegister, setShowRegister] = useState(false);
  const { firstName, lastName, email, password } = formValue;
  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError }] = useLoginUserMutation();
  const [registerUser, { data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError }] = useRegisterUserMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  };

  const onFinish = async () => {
    if (showRegister) {
      if (email && password) {
        await loginUser({ email, password })
      } else {
        toast.error("please fill all Input field")
      }
    } else {
      if (firstName && lastName && password && email) {
        await registerUser({ firstName, lastName, email, password });
      }
    }
  }


  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User Login Successfully");
      dispatch(setUser({ name: loginData.result.name, token: loginData.token }))
      navigate("/dashboard")
    }
    if (isRegisterSuccess) {
      toast.success("User Register Successfully");
      dispatch(setUser({ name: registerData.result.name, token: registerData.token }))
      navigate("/dashboard")
    }
  }, [isLoginSuccess, isRegisterSuccess])

  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.message);
    }
    if (isRegisterError) {
      toast.error((registerError as any).data.message);
    }
  }, [isLoginError, isRegisterError])


  return (
    <Layout>
      <Row>
        <Col span={24}>
          <h1>
            {!showRegister
              ? "Вэлком бэк!"
              : "Создать аккаунт Lorby"}
          </h1>
        </Col>
        <Col span={24}>
          <Form
            name="auth"
            labelCol={{ span: 8 }}
            layout="vertical"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {showRegister && (
              <Form.Item name="email">
                <Input placeholder="Введи адрес почты" />
              </Form.Item>
            )}

            <Form.Item name="username">
              <Input placeholder={showRegister ? 'Придумай логин' : 'Введи логин'} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder={showRegister ? 'Создай пароль' : 'Введи пароль'} />
            </Form.Item>

            {showRegister && (
              <Form.Item name="repeat">
                <Input />
              </Form.Item>
            )}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {!showRegister ? 'Login' : 'Register'}
              </Button>
            </Form.Item>
            {!showRegister ? (
              <>
                Don't have an account?
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowRegister(true)}
                >
                  Signup
                </p>
              </>
            ) : (
              <div>
                <span> Already have an acount ? </span>
                <Button
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowRegister(false)}
                >
                  Sign In
                </Button>
              </div>
            )}
          </Form >
        </Col >
      </Row >
    </Layout>
  );
};

export default AuthPage;