import React, { useState } from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { MessageOutlined, SendOutlined, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function SMS() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Отправка SMS:', values);
      message.success('SMS отправлено!');
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>SMS Рассылки</Title>
      <Paragraph>
        Массовые и персонализированные SMS рассылки. Уведомления, подтверждения, маркетинговые кампании.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Отправлено" value={45600} prefix={<SendOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Доставлено" value={98.5} suffix="%" prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Рассылок" value={120} prefix={<MessageOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Время" value={30} suffix="сек" prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы SMS" bordered={false}>
            <List
              dataSource={[
                'Уведомления о статусе заказа',
                'Подтверждение платежей',
                'Напоминания о встречах',
                'Маркетинговые предложения',
                'Сервисные сообщения',
                'Транзакционные SMS'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="SMS Сервисы" bordered={false}>
            <List
              dataSource={[
                'Планирование рассылок',
                'Персонализация сообщений',
                'Анализ доставки и откликов',
                'Интеграция с базами данных',
                'Отчеты по кампаниям',
                'Международные отправки'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="SMS Действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Создать рассылку
              </Button>
              <Button type="primary" icon={<SendOutlined />} onClick={showModal}>
                Отправить SMS
              </Button>
              <Button icon={<CheckCircleOutlined />}>
                Проверить доставку
              </Button>
              <Button>
                Шаблоны
              </Button>
              <Button>
                Отчеты
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Отправить SMS"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Отправить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
          >
            <Input placeholder="+7 (999) 123-45-67" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Сообщение"
            rules={[{ required: true, message: 'Пожалуйста, введите сообщение!' }]}
          >
            <TextArea rows={2} placeholder="Введите текст SMS" maxLength={160} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SMS;