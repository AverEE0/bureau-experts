import React, { useState } from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { MessageOutlined, RobotOutlined, UserOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function Telegram() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      // Здесь можно добавить логику отправки сообщения
      console.log('Отправка сообщения:', values);
      message.success('Сообщение отправлено!');
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Telegram Интеграция</Title>
      <Paragraph>
        Автоматизированная коммуникация через Telegram. Чат-боты, уведомления, сбор заявок от клиентов.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Сообщений" value={12500} prefix={<MessageOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Чат-ботов" value={3} prefix={<RobotOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Клиентов" value={890} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Отправлено" value={4500} prefix={<SendOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Функции Telegram" bordered={false}>
            <List
              dataSource={[
                'Автоматические уведомления клиентам',
                'Прием заявок через бота',
                'Отправка отчетов и документов',
                'Чат-поддержка с операторами',
                'Рассылки новостей и акций',
                'Интеграция с CRM системой'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Преимущества" bordered={false}>
            <List
              dataSource={[
                'Высокая скорость доставки',
                'Интерактивное общение',
                'Мультимедийный контент',
                'Бесплатные сообщения',
                'Мобильная доступность',
                'Автоматизация рутинных задач'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Telegram Действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<RobotOutlined />}>
                Настроить бота
              </Button>
              <Button type="primary" icon={<SendOutlined />} onClick={showModal}>
                Отправить сообщение
              </Button>
              <Button icon={<UserOutlined />}>
                Управление подписками
              </Button>
              <Button icon={<SettingOutlined />}>
                Настройки канала
              </Button>
              <Button>
                Статистика
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Отправить сообщение в Telegram"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Отправить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="recipient"
            label="Получатель"
            rules={[{ required: true, message: 'Пожалуйста, выберите получателя!' }]}
          >
            <Select placeholder="Выберите получателя">
              <Option value="client1">Клиент 1</Option>
              <Option value="client2">Клиент 2</Option>
              <Option value="group">Группа</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            label="Сообщение"
            rules={[{ required: true, message: 'Пожалуйста, введите сообщение!' }]}
          >
            <TextArea rows={4} placeholder="Введите текст сообщения" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Telegram;