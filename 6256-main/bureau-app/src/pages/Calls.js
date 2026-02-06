import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { PhoneOutlined, ClockCircleOutlined, UserOutlined, SoundOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Calls() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Голосовые Звонки</Title>
      <Paragraph>
        IP-телефония и традиционная телефония. Запись разговоров, аналитика, автоматическое распределение вызовов.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Звонков" value={15600} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Длительность" value={45} suffix="мин" prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Операторов" value={8} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Записей" value={14200} prefix={<SoundOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы звонков" bordered={false}>
            <List
              dataSource={[
                'Входящие звонки клиентов',
                'Исходящие консультации',
                'Переадресация на экспертов',
                'Автоматические обзвоны',
                'Конференц-связь',
                'Международные звонки'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Телефонные сервисы" bordered={false}>
            <List
              dataSource={[
                'Виртуальная АТС',
                'Голосовое меню (IVR)',
                'Запись и хранение разговоров',
                'Аналитика качества обслуживания',
                'Мониторинг операторов',
                'Интеграция с CRM'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Телефонные действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PhoneOutlined />}>
                Совершить звонок
              </Button>
              <Button icon={<PlayCircleOutlined />}>
                Прослушать запись
              </Button>
              <Button icon={<UserOutlined />}>
                Управление операторами
              </Button>
              <Button>
                Статистика звонков
              </Button>
              <Button>
                Настройки АТС
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Calls;