import React, { useState } from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { MailOutlined, SendOutlined, InboxOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function Email() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Отправка Email:', values);
      message.success('Email отправлено!');
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Email Коммуникации</Title>
      <Paragraph>
        Корпоративная email система. Автоматизированные рассылки, шаблоны, аналитика эффективности.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Отправлено" value={23400} prefix={<SendOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Получено" value={18900} prefix={<InboxOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Шаблонов" value={45} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Открытий" value={68} suffix="%" prefix={<MailOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Email Функции" bordered={false}>
            <List
              dataSource={[
                'Автоматические уведомления',
                'Маркетинговые рассылки',
                'Транзакционные письма',
                'Персонализированные шаблоны',
                'Отчеты и заключения',
                'Интеграция с CRM'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Аналитика Email" bordered={false}>
            <List
              dataSource={[
                'Статистика доставки',
                'Показатели открытий',
                'Клики по ссылкам',
                'Отписки и жалобы',
                'A/B тестирование',
                'Сегментация аудитории'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Email Действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Создать рассылку
              </Button>
              <Button type="primary" icon={<SendOutlined />} onClick={showModal}>
                Отправить email
              </Button>
              <Button icon={<InboxOutlined />}>
                Входящие
              </Button>
              <Button icon={<FileTextOutlined />}>
                Шаблоны
              </Button>
              <Button>
                Аналитика
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Отправить Email"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Отправить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="to"
            label="Кому"
            rules={[{ required: true, message: 'Пожалуйста, введите адрес получателя!' }, { type: 'email', message: 'Неверный формат email!' }]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Тема"
            rules={[{ required: true, message: 'Пожалуйста, введите тему!' }]}
          >
            <Input placeholder="Тема письма" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Сообщение"
            rules={[{ required: true, message: 'Пожалуйста, введите сообщение!' }]}
          >
            <TextArea rows={4} placeholder="Введите текст письма" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Email;