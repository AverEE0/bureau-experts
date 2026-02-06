import React, { useState, useMemo } from 'react';
import { Layout, Card, Row, Col, Button, Typography, Space, Modal, Form, Input, Select, message } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { loadServices, getServiceById } from '../servicesConfig';

const { Content } = Layout;
const { Title, Text } = Typography;

const BusinessCycles = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [customServiceId, setCustomServiceId] = useState(null);
  const [form] = Form.useForm();

  const services = useMemo(() => loadServices(), []);
  const selectedService = serviceId ? getServiceById(services, serviceId) : null;

  const openStartModal = (id) => {
    setServiceId(id);
    setModalOpen(true);
    form.resetFields();
  };

  const handleFinish = (values) => {
    message.success('Заявка создана');
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Бизнес-циклы</Title>
      <Text>
        Клиент пришёл или прислал документ — укажите услугу. Далее у каждой услуги своё заполнение (поля настраиваются в Настройки → Услуги и направления).
      </Text>

      <Card size="small" style={{ marginTop: 24 }}>
        <Space wrap align="center">
          <AppstoreOutlined />
          <Text strong>Укажите услугу:</Text>
          <Select
            placeholder="Выберите направление"
            style={{ width: 280 }}
            value={customServiceId || undefined}
            onChange={setCustomServiceId}
            options={services.map((s) => ({ value: s.id, label: s.name }))}
            allowClear
          />
          <Button type="primary" disabled={!customServiceId} onClick={() => customServiceId && openStartModal(customServiceId)}>
            Заполнить заявку
          </Button>
        </Space>
      </Card>

      <Title level={5} style={{ marginTop: 24, marginBottom: 12 }}>Направления</Title>
      <Row gutter={[12, 12]}>
        {services.map((svc) => (
          <Col key={svc.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              size="small"
              style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              actions={[<Button type="link" key="go" onClick={() => openStartModal(svc.id)}>Начать</Button>]}
            >
              <Card.Meta title={svc.name} description={`${(svc.items || []).length} полей для заполнения`} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedService ? `Заполните данные: ${selectedService.name}` : 'Начать'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={520}
        destroyOnClose
      >
        {selectedService && (
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            {(selectedService.items || []).map((item) => (
              <Form.Item
                key={item.id}
                name={item.id}
                label={item.label}
                rules={[{ required: true, message: `Заполните: ${item.label}` }]}
              >
                <Input placeholder={item.label} />
              </Form.Item>
            ))}
            {selectedService.items?.length === 0 && (
              <Text type="secondary">Для этой услуги пока не заданы поля. Добавьте выноски в Настройках → Услуги и направления.</Text>
            )}
            <Form.Item style={{ marginTop: 16, marginBottom: 0 }}>
              <Space>
                <Button type="primary" htmlType="submit">Создать заявку</Button>
                <Button onClick={() => setModalOpen(false)}>Отмена</Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Content>
  );
};

export default BusinessCycles;