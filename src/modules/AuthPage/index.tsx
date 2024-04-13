import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormProps, Input, Row, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/authSlice";
import { useLoginUserMutation, useRegisterUserMutation } from "../../services/api/modules/auth"
import Layout from "../../components/Layout";

export interface IInitialState {
  username: ''
  email: string,
  password: string,
  repeat: string,
}

const initialState: IInitialState = {
  username: '',
  email: "",
  password: "",
  repeat: '',
};

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError }] = useLoginUserMutation();
  const [registerUser, { data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError }] = useRegisterUserMutation();



  const onFinish: FormProps<IInitialState>["onFinish"] = async (values) => {
    console.log(values)
    if (!showRegister) {
      if (values.username && values.password) {
        await loginUser({
          username: values.username,
          password: values.password
        })
      } else {
        api.error({
          message: 'Ошибка!',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          placement: 'topRight',
        })
      }
    } else {
      if (values.password && values.email && values.username) {
        await registerUser({
          username: values.username,
          email: values.email,
          password: values.password
        });
      }
    }
  }

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setUser({ name: loginData.result.name, token: loginData.token }))
      navigate("/dashboard")
    }
    if (isRegisterSuccess) {
      dispatch(setUser({ name: registerData.result.name, token: registerData.token }))
      navigate("/dashboard")
    }
  }, [isLoginSuccess, isRegisterSuccess])

  useEffect(() => {
    if (isLoginError) {
      api.error({
        message: 'Ошибка!',
        placement: 'topRight',
      })
    }
    if (isRegisterError) {
      api.error({
        message: 'Ошибка!',
        placement: 'topRight',
      })
    }
  }, [isLoginError, isRegisterError])


  return (
    <Layout>
      <Row gutter={[0, 20]}>
        {contextHolder}
        <Col span={24}>
          {!showRegister
            ?
            <h1>Вэлком бэк!</h1>
            :
            <>
              <h1>Создать аккаунт</h1><h1>Lorby</h1>
            </>
          }
        </Col>
        <Col span={24}>
          <Form
            name="authƒ"
            form={form}
            layout="vertical"
            initialValues={initialState}
            style={{ maxWidth: 568 }}
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
              rules={showRegister ? [{ required: true, message: 'Пожалуйста введите ваш пароль!' }] : undefined}
            >
              <Input.Password placeholder={showRegister ? 'Создай пароль' : 'Введи пароль'} />
            </Form.Item>

            {showRegister && (
              <Form.Item
                name="repeat"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, подтвердите пароль!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Пароли не совпадают'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Повторите пароль" />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {!showRegister ? 'Login' : 'Register'}
              </Button>
            </Form.Item>
          </Form >
        </Col >

        <Col span={24}>
          <Button type="text" onClick={() => setShowRegister(prev => !prev)}>
            {!showRegister ? 'У меня еще нет аккаунта' : 'У меня уже есть аккаунт'}
          </Button>
        </Col>
      </Row >
    </Layout>
  );
};

export default AuthPage;