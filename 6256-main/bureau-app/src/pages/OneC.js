import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space } from 'antd';
import { DatabaseOutlined, SyncOutlined, CalculatorOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function OneC() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Интеграция с 1C</Title>
      <Paragraph>
        Синхронизация данных с системами 1C:Предприятие. Автоматизация бухгалтерского и управленческого учета.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Синхронизаций" value={1200} prefix={<SyncOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Документов" value={5600} prefix={<DatabaseOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Контрагентов" value={890} prefix={<CalculatorOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Отчетов" value={45} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Модули 1C" bordered={false}>
            <List
              dataSource={[
                '1C:Бухгалтерия',
                '1C:Управление торговлей',
                '1C:Зарплата и управление персоналом',
                '1C:Документооборот',
                '1C:ERP',
                '1C:Комплексная автоматизация'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Функционал интеграции" bordered={false}>
            <List
              dataSource={[
                'Автоматический обмен данными',
                'Синхронизация справочников',
                'Формирование первичных документов',
                'Передача финансовых данных',
                'Управление договорами',
                'Аналитическая отчетность'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="1C Действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<SyncOutlined />}>
                Синхронизировать
              </Button>
              <Button icon={<CalculatorOutlined />}>
                Создать документ
              </Button>
              <Button icon={<BarChartOutlined />}>
                Отчеты
              </Button>
              <Button icon={<SettingOutlined />}>
                Настройки интеграции
              </Button>
              <Button>
                Мониторинг
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OneC;