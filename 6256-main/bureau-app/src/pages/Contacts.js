import React, { useState } from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space, Modal, Input, message } from 'antd';
import { PhoneOutlined, MailOutlined, MessageOutlined, PlusOutlined, SearchOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Contacts() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [sendVisible, setSendVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

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
            <Space wrap>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddVisible(true)}>Добавить контакт</Button>
              <Button icon={<SearchOutlined />} onClick={() => setSearchVisible(true)}>Поиск контактов</Button>
              <Button icon={<SendOutlined />} onClick={() => setSendVisible(true)}>Отправить сообщение</Button>
              <Button onClick={() => setImportVisible(true)}>Импорт контактов</Button>
              <Button onClick={() => setHistoryVisible(true)}>История коммуникаций</Button>
            </Space>
          </Card>
          <Modal title="Добавить контакт" open={addVisible} onCancel={() => setAddVisible(false)} onOk={() => { message.success('Контакт добавлен'); setAddVisible(false); }} okText="Сохранить">
            <Input placeholder="ФИО или название" style={{ marginBottom: 8 }} />
            <Input placeholder="Телефон или email" />
          </Modal>
          <Modal title="Поиск контактов" open={searchVisible} onCancel={() => setSearchVisible(false)} onOk={() => { message.success('Поиск выполнен'); setSearchVisible(false); }} okText="Искать">
            <Input placeholder="Введите имя, телефон или email" />
          </Modal>
          <Modal title="Отправить сообщение" open={sendVisible} onCancel={() => setSendVisible(false)} onOk={() => { message.success('Сообщение отправлено'); setSendVisible(false); }} okText="Отправить">
            <Input placeholder="Получатель" style={{ marginBottom: 8 }} />
            <Input.TextArea placeholder="Текст сообщения" rows={3} />
          </Modal>
          <Modal title="Импорт контактов" open={importVisible} onCancel={() => setImportVisible(false)} onOk={() => { message.success('Импорт запущен. Файл обрабатывается.'); setImportVisible(false); }} okText="Загрузить файл">
            <Paragraph type="secondary">Загрузите CSV или Excel с колонками: Имя, Телефон, Email</Paragraph>
          </Modal>
          <Modal title="История коммуникаций" open={historyVisible} onCancel={() => setHistoryVisible(false)} footer={[<Button key="close" onClick={() => setHistoryVisible(false)}>Закрыть</Button>]} width={560}>
            <List size="small" dataSource={[{ date: '04.02.2026', channel: 'Email', text: 'Отправлено уведомление по сделке' }, { date: '03.02.2026', channel: 'Телефон', text: 'Звонок клиенту Иванов И.И.' }]} renderItem={(item) => <List.Item><strong>{item.date}</strong> {item.channel}: {item.text}</List.Item>} />
          </Modal>
        </Col>
      </Row>
    </div>
  );
}

export default Contacts;