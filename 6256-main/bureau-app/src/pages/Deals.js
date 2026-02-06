import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { DollarOutlined, RiseOutlined, FallOutlined, BarChartOutlined, PlusOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Deals() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Управление Сделками</Title>
      <Paragraph>
        Модуль для отслеживания и управления сделками экспертного бюро. Включает этапы сделок, бюджеты, сроки и аналитику конверсии.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Активные сделки" value={87} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Общий бюджет" value={4500000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Конверсия" value={68} suffix="%" prefix={<RiseOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Средний чек" value={52000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Этапы сделок" bordered={false}>
            <List
              dataSource={[
                'Входящие запросы',
                'Первичная консультация',
                'Подготовка предложения',
                'Согласование условий',
                'Подписание договора',
                'Исполнение услуг',
                'Закрытие сделки'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Аналитика сделок" bordered={false}>
            <Paragraph>Распределение по статусам:</Paragraph>
            <Progress percent={25} status="active" format={() => 'В работе 25%'} />
            <Progress percent={45} status="active" format={() => 'Согласование 45%'} />
            <Progress percent={20} status="active" format={() => 'Исполнение 20%'} />
            <Progress percent={10} status="active" format={() => 'Завершено 10%'} />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Управление сделками" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Создать сделку
              </Button>
              <Button icon={<EyeOutlined />}>
                Просмотр сделок
              </Button>
              <Button icon={<EditOutlined />}>
                Редактировать
              </Button>
              <Button>
                Аналитика
              </Button>
              <Button>
                Экспорт отчетов
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Deals;