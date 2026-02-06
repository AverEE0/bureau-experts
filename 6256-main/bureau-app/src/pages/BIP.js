import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress } from 'antd';
import { MessageOutlined, PhoneOutlined, GlobalOutlined, RobotOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function BIP() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>BIP Коммуникации</Title>
      <Paragraph>
        Платформа бизнес-коммуникаций BIP. Объединение различных каналов связи в единую систему.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Каналов" value={6} prefix={<MessageOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Интеграций" value={12} prefix={<GlobalOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Автоматизаций" value={25} prefix={<RobotOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Звонков" value={5600} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Каналы BIP" bordered={false}>
            <List
              dataSource={[
                'Звонки (SIP, GSM)',
                'SMS и MMS',
                'Email',
                'Чаты и мессенджеры',
                'Социальные сети',
                'Веб-формы'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Функционал BIP" bordered={false}>
            <List
              dataSource={[
                'Единая панель управления',
                'Автоматическое распределение',
                'Запись и транскрибация',
                'Аналитика коммуникаций',
                'Интеграция с CRM',
                'Персонализация общения'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default BIP;