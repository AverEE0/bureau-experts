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
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

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
      const payload = { client_name: values.client_name, stage: values.stage, sum_rub: values.sum_rub ?? null, date: values.date ?? null };
      api.createDeal(payload)
        .then((newDeal) => {
          setDeals((prev) => [newDeal, ...prev]);
          setModalVisible(false);
          form.resetFields();
          message.success('Сделка создана');
        })
        .catch(() => {
          setDeals((prev) => [{ id: Date.now(), ...payload }, ...prev]);
          setModalVisible(false);
          form.resetFields();
          message.success('Сделка добавлена (локально)');
        });
    }).catch(() => {});
  };

  const openView = () => {
    const deal = selectedRowKeys.length === 1 ? deals.find((d) => String(d.id) === String(selectedRowKeys[0])) : selectedRowKeys.length > 1 ? deals.find((d) => selectedRowKeys.includes(d.id)) : null;
    if (deal) { setSelectedDeal(deal); setViewModalVisible(true); } else message.info('Выберите одну сделку в таблице');
  };
  const openEdit = () => {
    const deal = selectedRowKeys.length === 1 ? deals.find((d) => String(d.id) === String(selectedRowKeys[0])) : null;
    if (deal) {
      setSelectedDeal(deal);
      editForm.setFieldsValue({ client_name: deal.client_name, stage: deal.stage, sum_rub: deal.sum_rub, date: deal.date });
      setEditModalVisible(true);
    } else message.info('Выберите одну сделку для редактирования');
  };
  const handleEditSave = () => {
    if (!selectedDeal) return;
    editForm.validateFields().then((values) => {
      api.updateDeal(selectedDeal.id, values).then((updated) => {
        setDeals((prev) => prev.map((d) => (d.id === selectedDeal.id ? updated : d)));
        setEditModalVisible(false);
        setSelectedDeal(null);
        editForm.resetFields();
        message.success('Сделка обновлена');
      }).catch(() => {
        setDeals((prev) => prev.map((d) => (d.id === selectedDeal.id ? { ...d, ...values } : d)));
        setEditModalVisible(false);
        setSelectedDeal(null);
        editForm.resetFields();
        message.success('Изменения сохранены локально');
      });
    }).catch(() => {});
  };
  const handleExportDeals = () => {
    const headers = ['Клиент', 'Этап', 'Сумма (₽)', 'Дата'];
    const rows = filteredDeals.map((d) => [d.client_name, d.stage, d.sum_rub != null ? d.sum_rub : '', d.date].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `сделки_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Экспорт выполнен');
  };

  const rowSelection = { selectedRowKeys, onChange: (keys) => setSelectedRowKeys(keys) };

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
          <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={filteredDeals} pagination={{ pageSize: 5 }} />
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
          <Button icon={<EyeOutlined />} onClick={openView}>Просмотр</Button>
          <Button icon={<EditOutlined />} onClick={openEdit}>Редактировать</Button>
          <Button onClick={handleExportDeals}>Экспорт отчётов</Button>
        </Space>
      </div>

      <Modal title="Просмотр сделки" open={viewModalVisible} onCancel={() => { setViewModalVisible(false); setSelectedDeal(null); }} footer={[<Button key="close" onClick={() => setViewModalVisible(false)}>Закрыть</Button>]} width={480}>
        {selectedDeal && (
          <Row gutter={[8, 8]}>
            <Col span={10}><Paragraph type="secondary">Клиент:</Paragraph></Col><Col span={14}>{selectedDeal.client_name}</Col>
            <Col span={10}><Paragraph type="secondary">Этап:</Paragraph></Col><Col span={14}><Tag>{selectedDeal.stage}</Tag></Col>
            <Col span={10}><Paragraph type="secondary">Сумма:</Paragraph></Col><Col span={14}>{selectedDeal.sum_rub != null ? `${Number(selectedDeal.sum_rub).toLocaleString('ru-RU')} ₽` : '—'}</Col>
            <Col span={10}><Paragraph type="secondary">Дата:</Paragraph></Col><Col span={14}>{selectedDeal.date || '—'}</Col>
          </Row>
        )}
      </Modal>

      <Modal title="Редактировать сделку" open={editModalVisible} onOk={handleEditSave} onCancel={() => { setEditModalVisible(false); setSelectedDeal(null); editForm.resetFields(); }} okText="Сохранить" cancelText="Отмена">
        <Form form={editForm} layout="vertical">
          <Form.Item name="client_name" label="Клиент" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="stage" label="Этап" rules={[{ required: true }]}><Select placeholder="Этап">{stages.map((s) => <Option key={s} value={s}>{s}</Option>)}</Select></Form.Item>
          <Form.Item name="sum_rub" label="Сумма (₽)"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="date" label="Дата"><Input placeholder="YYYY-MM-DD" /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Deals;