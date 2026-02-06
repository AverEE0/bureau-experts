import React from 'react';
import { Layout, Card, Row, Col, Button, Typography, Space, Statistic } from 'antd';
import { DollarOutlined, BankOutlined, FileTextOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const Finance = () => {
  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Финансовая интеграция</Title>
      <Text>Автоматическая фискализация, электронный документооборот, интеграция с 1С и банками.</Text>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="ОФД (Онлайн-кассы)" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Автоматическая фискализация счетов через операторов (Ярус, Платформа ОФД).</Text>
              <Text>Формирование чеков по 54-ФЗ с QR-кодами.</Text>
              <Button type="primary" block>Создать чек</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="ЭДО (Электронный документооборот)" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Обмен документами через СБИС, Контур.Диадок, 1С-ЭДО.</Text>
              <Text>Юридически значимое подписание КЭП/УКЭП.</Text>
              <Button type="primary" block>Отправить документ</Button>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Интеграция с 1С" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Синхронизация контрагентов, договоров, счетов, актов.</Text>
              <Text>Передача данных по зарплате для экспертов.</Text>
              <Button type="primary" block>Синхронизировать</Button>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Банковская интеграция" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Онлайн-оплата счетов через ЮKassa, Cloud Payments, СБП.</Text>
              <Text>Формирование платежных поручений на зарплату.</Text>
              <Text>Экспорт в форматы "Клиент-Банк" (СберБизнес, Тинькофф, ВТБ).</Text>
              <Button icon={<BankOutlined />} type="primary" block>Оплатить</Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Финансовые показатели" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Выручка" value={2847500} prefix={<DollarOutlined />} suffix="₽" />
              </Col>
              <Col span={12}>
                <Statistic title="Расходы" value={1200000} prefix={<DollarOutlined />} suffix="₽" />
              </Col>
            </Row>
            <Button type="primary" block style={{ marginTop: 16 }}>Отчет по финансам</Button>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Finance;