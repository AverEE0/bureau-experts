import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Timeline, Button, Space } from 'antd';
import { HistoryOutlined, ClockCircleOutlined, UserOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function CRMHistory() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>История Взаимодействий</Title>
      <Paragraph>
        Полная история всех взаимодействий с клиентами: звонки, встречи, документы, платежи. Аналитика и аудит действий.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Записей" value={15420} prefix={<HistoryOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="За месяц" value={1250} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Встреч" value={340} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Звонков" value={890} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы взаимодействий" bordered={false}>
            <List
              dataSource={[
                'Телефонные звонки и звонки',
                'Личные встречи и консультации',
                'Email переписка',
                'Отправка документов и отчетов',
                'Платежи и финансовые операции',
                'Изменения в профиле клиента',
                'Создание и обновление сделок'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Пример истории клиента" bordered={false}>
            <Timeline>
              <Timeline.Item>15.01.2026 - Регистрация клиента</Timeline.Item>
              <Timeline.Item>20.01.2026 - Первичная консультация</Timeline.Item>
              <Timeline.Item>25.01.2026 - Отправка предложения</Timeline.Item>
              <Timeline.Item>01.02.2026 - Подписание договора</Timeline.Item>
              <Timeline.Item>03.02.2026 - Оплата услуг</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Анализ истории" bordered={false}>
            <Space>
              <Button type="primary" icon={<FilterOutlined />}>
                Фильтр по дате
              </Button>
              <Button icon={<UserOutlined />}>
                Поиск по клиенту
              </Button>
              <Button icon={<DownloadOutlined />}>
                Экспорт истории
              </Button>
              <Button>
                Статистика
              </Button>
              <Button>
                Аудит изменений
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CRMHistory;