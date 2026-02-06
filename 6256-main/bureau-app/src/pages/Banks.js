import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { BankOutlined, CreditCardOutlined, TransactionOutlined, DollarOutlined, SyncOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Banks() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Интеграция с Банками</Title>
      <Paragraph>
        Прямое подключение к банковским системам. Автоматический сбор выписок, платежи, мониторинг счетов.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Банков" value={8} prefix={<BankOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Счетов" value={15} prefix={<CreditCardOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Транзакций" value={23400} prefix={<TransactionOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Оборот" value={45000000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Банковские системы" bordered={false}>
            <List
              dataSource={[
                'Сбербанк',
                'ВТБ',
                'Газпромбанк',
                'Альфа-Банк',
                'Тинькофф',
                'Райффайзенбанк'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Банковские операции" bordered={false}>
            <List
              dataSource={[
                'Автоматическое получение выписок',
                'Мониторинг поступлений',
                'Формирование платежных поручений',
                'Контроль остатков на счетах',
                'Анализ денежных потоков',
                'Интеграция с бухгалтерией'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Банковские действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<SyncOutlined />}>
                Синхронизировать выписки
              </Button>
              <Button icon={<EyeOutlined />}>
                Просмотр счетов
              </Button>
              <Button icon={<TransactionOutlined />}>
                Транзакции
              </Button>
              <Button>
                Платежи
              </Button>
              <Button>
                Аналитика
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Banks;