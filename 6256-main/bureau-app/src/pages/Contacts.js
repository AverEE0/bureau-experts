import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { PhoneOutlined, MailOutlined, MessageOutlined, GlobalOutlined, PlusOutlined, SearchOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Contacts() {
  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Контакты и Коммуникации</Title>
      <Paragraph>
        Централизованное управление контактами клиентов и коммуникациями. Интеграция с омниканальными инструментами связи.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Контактов" value={3200} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Email" value={2800} prefix={<MailOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Телефоны" value={1950} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Чаты" value={450} prefix={<MessageOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Каналы связи" bordered={false}>
            <List
              dataSource={[
                'Телефонные звонки (входящие/исходящие)',
                'Email рассылки и уведомления',
                'SMS и мессенджеры (Telegram, WhatsApp)',
                'Интеграция с CRM для автоматических контактов',
                'История коммуникаций по клиентам',
                'Шаблоны сообщений и скрипты'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Активность контактов" bordered={false}>
            <Paragraph>Использование каналов:</Paragraph>
            <Progress percent={55} status="active" format={() => 'Email 55%'} />
            <Progress percent={30} status="active" format={() => 'Телефон 30%'} />
            <Progress percent={10} status="active" format={() => 'Чаты 10%'} />
            <Progress percent={5} status="active" format={() => 'Другое 5%'} />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Контактные действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Добавить контакт
              </Button>
              <Button icon={<SearchOutlined />}>
                Поиск контактов
              </Button>
              <Button icon={<SendOutlined />}>
                Отправить сообщение
              </Button>
              <Button>
                Импорт контактов
              </Button>
              <Button>
                История коммуникаций
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Contacts;