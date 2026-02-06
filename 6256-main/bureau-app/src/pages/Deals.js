import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space, Table, Tag, Select, Modal, Form, Input, InputNumber, message, Spin } from 'antd';
import { DollarOutlined, RiseOutlined, BarChartOutlined, PlusOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const defaultDeals = [
  { id: 1, client_name: 'Иванов Иван Иванович', stage: 'Подписание договора', sum_rub: 45000, date: '2025-02-01' },
  { id: 2, client_name: 'ООО "Ромашка"', stage: 'Исполнение услуг', sum_rub: 120000, date: '2025-01-28' },
];

const stages = ['Входящие запросы', 'Первичная консультация', 'Подготовка предложения', 'Согласование условий', 'Подписание договора', 'Исполнение услуг', 'Закрытие сделки'];

function Deals() {
  const [deals, setDeals] = useState(defaultDeals);
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    api.getDeals(stageFilter || undefined)
      .then((data) => setDeals(Array.isArray(data) ? data : []))
      .catch(() => {
        message.warning('Бэкенд недоступен. Показаны локальные данные.');
        setDeals(defaultDeals);
      })
      .finally(() => setLoading(false));
  }, [stageFilter]);

  const columns = [
    { title: 'Клиент', dataIndex: 'client_name', key: 'client_name' },
    { title: 'Этап', dataIndex: 'stage', key: 'stage', render: (s) => <Tag color="#333">{s}</Tag> },
    { title: 'Сумма', dataIndex: 'sum_rub', key: 'sum_rub', render: (v) => v != null ? `${Number(v).toLocaleString('ru-RU')} ₽` : '—' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
  ];

  const filteredDeals = stageFilter ? deals.filter((d) => d.stage === stageFilter) : deals;

  const handleCreateDeal = () => {
    form.validateFields().then((values) => {
      api.createDeal({
        client_name: values.client_name,
        stage: values.stage,
        sum_rub: values.sum_rub ?? null,
        date: values.date ?? null,
      })
        .then((newDeal) => {
          setDeals((prev) => [newDeal, ...prev]);
          setModalVisible(false);
          form.resetFields();
          message.success('Сделка создана');
        })
        .catch((e) => message.error(e.message || 'Ошибка'));
    }).catch(() => {});
  };

  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Управление сделками</Title>
      <Paragraph>
        Этапы сделок, бюджеты, сроки и аналитика конверсии. Связь с карточкой клиента (CRM).
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Активные сделки" value={87} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Общий бюджет" value={4500000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Конверсия" value={68} suffix="%" prefix={<RiseOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Средний чек" value={52000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
      </Row>

      <Card
        title="Список сделок"
        extra={
          <Select placeholder="Этап" allowClear style={{ width: 200 }} value={stageFilter} onChange={setStageFilter}>
            {stages.map((s) => (
              <Option key={s} value={s}>{s}</Option>
            ))}
          </Select>
        }
        style={{ marginBottom: 24 }}
      >
        <Spin spinning={loading}>
          <Table rowKey="id" columns={columns} dataSource={filteredDeals} pagination={{ pageSize: 5 }} />
        </Spin>
      </Card>

      <Modal title="Новая сделка" open={modalVisible} onOk={handleCreateDeal} onCancel={() => setModalVisible(false)} okText="Создать">
        <Form form={form} layout="vertical">
          <Form.Item name="client_name" label="Клиент" rules={[{ required: true }]}>
            <Input placeholder="ФИО или название организации" />
          </Form.Item>
          <Form.Item name="stage" label="Этап" rules={[{ required: true }]}>
            <Select placeholder="Выберите этап">{stages.map((s) => <Option key={s} value={s}>{s}</Option>)}</Select>
          </Form.Item>
          <Form.Item name="sum_rub" label="Сумма (₽)">
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Не указана" />
          </Form.Item>
          <Form.Item name="date" label="Дата">
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Этапы сделок" size="small">
            <List dataSource={stages} renderItem={(item) => <List.Item>{item}</List.Item>} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Аналитика по статусам" size="small">
            <Progress percent={25} status="active" format={() => 'В работе 25%'} />
            <Progress percent={45} format={() => 'Согласование 45%'} />
            <Progress percent={20} format={() => 'Исполнение 20%'} />
            <Progress percent={10} format={() => 'Завершено 10%'} />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>Создать сделку</Button>
          <Button icon={<EyeOutlined />}>Просмотр</Button>
          <Button icon={<EditOutlined />}>Редактировать</Button>
          <Button>Экспорт отчётов</Button>
        </Space>
      </div>
    </div>
  );
}

export default Deals;