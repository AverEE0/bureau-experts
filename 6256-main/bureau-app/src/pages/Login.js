import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Tabs, Typography } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import { api, getToken } from '../api';
import logoBuro from '../assets/logo-buro.png';
import './Login.css';

const { Text } = Typography;

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const t = getToken();
    if (t && (t.startsWith('demo-') || t === 'demo-admin' || t === 'demo-expert')) {
      setCanRegister(true);
      return;
    }
    api.canRegister().then(setCanRegister).catch(() => setCanRegister(false));
  }, []);

  const onFinishLogin = async (values) => {
    const email = (values.email || '').trim().toLowerCase();
    const password = values.password || '';
    setLoading(true);
    try {
      if (email === 'admin' && password === 'админ') {
        const token = 'demo-admin';
        const user = { id: 1, email: 'admin', role: 'admin', full_name: 'Администратор' };
        localStorage.setItem('bureau_token', token);
        onLogin(token, user);
        return;
      }
      if (email === 'expert' && password === 'expert') {
        const token = 'demo-expert';
        const user = { id: 2, email: 'expert', role: 'manager', full_name: 'Эксперт' };
        localStorage.setItem('bureau_token', token);
        onLogin(token, user);
        return;
      }
      const { access_token, user } = await api.login(values.email, values.password);
      localStorage.setItem('bureau_token', access_token);
      onLogin(access_token, user);
    } catch (e) {
      message.error(e.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const onFinishRegister = async (values) => {
    setLoading(true);
    try {
      const { access_token, user } = await api.register(
        values.email,
        values.password,
        values.full_name,
      );
      localStorage.setItem('bureau_token', access_token);
      message.success('Регистрация успешна');
      onLogin(access_token, user);
    } catch (e) {
      message.error(e.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: 'login',
      label: 'Вход',
      children: (
        <>
          <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            По умолчанию: admin / админ или expert / expert
          </Text>
          <Form name="login" onFinish={onFinishLogin} size="large" autoComplete="off">
            <Form.Item name="email" rules={[{ required: true, message: 'Введите email' }]}>
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  if (canRegister) {
    tabItems.push({
      key: 'register',
      label: 'Регистрация',
      children: (
        <Form name="register" onFinish={onFinishRegister} size="large" autoComplete="off">
          <Form.Item name="full_name" label="Ф. И. О.">
            <Input prefix={<IdcardOutlined />} placeholder="Иванов Иван Иванович" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Введите email' }, { type: 'email' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль', min: 4 }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ),
    });
  }

  return (
    <div className="login-page">
      <Card className="login-card" title={
        <div className="login-title">
          <img src={logoBuro} alt="БЮРО ЭКСПЕРТОВ" className="login-logo" />
          <span>Вход в программу</span>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>Чат, личный кабинет, регистрация</Text>
        </div>
      }>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  );
}
