import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { DollarOutlined, BankOutlined, CheckCircleOutlined, FileTextOutlined, SyncOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function OFD() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Интеграция с ОФД</Title>
      <Paragraph>
        Работа с операторами фискальных данных. Автоматический сбор и обработка чеков, формирование отчетности.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Чеков" value={45600} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="ОФД" value={5} prefix={<BankOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Обработано" value={99.8} suffix="%" prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Выручка" value={12500000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Операторы ФД" bordered={false}>
            <List
              dataSource={[
                'Первый ОФД',
                'Тандер ОФД',
                'Платформа ОФД',
                'Яндекс ОФД',
                'Контур ОФД'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Функционал ОФД" bordered={false}>
            <List
              dataSource={[
                'Автоматический сбор чеков',
                'Валидация фискальных данных',
                'Формирование отчетов для ФНС',
                'Интеграция с бухгалтерией',
                'Мониторинг выручки в реальном времени',
                'Анализ продаж по категориям'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="OFD Действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<SyncOutlined />}>
                Синхронизировать чеки
              </Button>
              <Button icon={<CheckCircleOutlined />}>
                Проверить данные
              </Button>
              <Button icon={<BarChartOutlined />}>
                Аналитика продаж
              </Button>
              <Button>
                Экспорт отчетов
              </Button>
              <Button>
                Настройки интеграции
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OFD;