import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress } from 'antd';
import { PhoneOutlined, MessageOutlined, GlobalOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function MAX() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>MAX Коммуникации</Title>
      <Paragraph>
        Корпоративная система коммуникаций MAX Telecom. Интеграция голосовой связи, видеоконференций, мессенджеров.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Звонков" value={8900} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Конференций" value={340} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Сообщений" value={15600} prefix={<MessageOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Пользователей" value={120} prefix={<GlobalOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Сервисы MAX" bordered={false}>
            <List
              dataSource={[
                'IP-телефония',
                'Видеоконференции',
                'Корпоративный мессенджер',
                'Виртуальная АТС',
                'Запись разговоров',
                'Интеграция с CRM'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Возможности" bordered={false}>
            <List
              dataSource={[
                'Международная связь',
                'Мобильная интеграция',
                'Аналитика звонков',
                'Автоматическое распределение',
                'Голосовое меню (IVR)',
                'Мониторинг качества'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MAX;