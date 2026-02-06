import React from 'react';
import { Layout, Card, Row, Col, Button, Typography, Space, Switch } from 'antd';
import { MessageOutlined, PhoneOutlined, GlobalOutlined, MailOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const Omnichannel = () => {
  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Omnichannel Связь</Title>
      <Text>Поддержка каналов: Telegram, MAX, BIP, SMS, Email, WebRTC звонки. Автоматическое определение каналов по номеру телефона.</Text>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="Telegram" extra={<Switch defaultChecked />} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Интеграция через Bot API.</Text>
              <Text>Автоматические уведомления и чат с клиентами.</Text>
              <Button type="primary" block>Настроить бота</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="MAX" extra={<Switch defaultChecked />} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Российский мессенджер, API интеграция.</Text>
              <Text>Безопасная связь с клиентами.</Text>
              <Button type="primary" block>Подключить</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="BIP" extra={<Switch />} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Турецкий мессенджер, API интеграция.</Text>
              <Text>Международная связь.</Text>
              <Button type="primary" block>Активировать</Button>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="SMS" extra={<Switch defaultChecked />} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Через SMSc.ru, ~0.80 руб/SMS.</Text>
              <Text>Шаблоны сообщений для каждого этапа.</Text>
              <Button type="primary" block>Отправить SMS</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Email" extra={<Switch defaultChecked />} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Через SMTP Яндекс 360.</Text>
              <Text>Автоматические письма.</Text>
              <Button type="primary" block>Отправить Email</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="WebRTC Звонки" extra={<Switch defaultChecked />} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Голосовые звонки через WebRTC.</Text>
              <Text>Интеграция с телефонией.</Text>
              <Button type="primary" block>Позвонить</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Omnichannel;