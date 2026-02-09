import React, { useMemo, useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  List,
  message,
  Spin,
} from 'antd';
import { PlusOutlined, SearchOutlined, ExportOutlined, UserOutlined, FileTextOutlined, DollarOutlined, MessageOutlined, ProfileOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const defaultClients = [
  { id: 1, name: 'Иванов Иван Иванович', type: 'Физ. лицо', inn: '770512345678', phone: '+7 (900) 111-22-33', email: 'ivanov@example.ru', status: 'Активный', segment: 'VIP', manager: 'Петрова Н.В.' },
  { id: 2, name: 'ООО "Ромашка"', type: 'Юр. лицо', inn: '7708123456', phone: '+7 (900) 222-33-44', email: 'info@romashka.ru', status: 'Новый', segment: 'Корпоративный', manager: 'Иванов С.А.' },
  { id: 3, name: 'Петров Петр Петрович', type: 'Физ. лицо', inn: '781012345678', phone: '+7 (900) 333-44-55', email: 'petrov@example.ru', status: 'В работе', segment: 'Частный', manager: 'Сидорова Л.М.' },
];

function Clients({ onOpenCard, defaultTab = 'base', onNavigate }) {
  const [clients, setClients] = useState(defaultClients);
  const [deals, setDeals] = useState([]);
  const [dealsLoading, setDealsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    api.getClients(search || undefined, statusFilter)
      .then((data) => setClients(Array.isArray(data) ? data : []))
      .catch(() => {
        message.warning('Бэкенд недоступен. Показаны локальные данные.');
        setClients(defaultClients);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (defaultTab === 'reestr') loadDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTab]);

  const loadDeals = () => {
    setDealsLoading(true);
    api.getDeals()
      .then((data) => setDeals(Array.isArray(data) ? data : []))
      .catch(() => setDeals([]))
      .finally(() => setDealsLoading(false));
  };

  const filteredClients = useMemo(
    () =>
      clients.filter((c) => {
        const matchesSearch =
          !search ||
          (c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
          (c.inn && c.inn.includes(search.replace(/\s/g, ''))) ||
          (c.phone && c.phone.includes(search));
        const matchesStatus = !statusFilter || c.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [clients, search, statusFilter],
  );

  const mockContracts = selectedClient ? [
    { id: 1, num: 'Д-001', date: '15.01.2025', subject: 'Оценка квартиры', sum: '45 000 ₽' },
    { id: 2, num: 'Д-002', date: '20.02.2025', subject: 'Судебная экспертиза', sum: '78 000 ₽' },
  ] : [];
  const mockCommunications = selectedClient ? [
    { date: '04.02.2026', channel: 'Telegram', text: 'Направлен отчёт об оценке' },
    { date: '01.02.2026', channel: 'Email', text: 'Договор подписан' },
    { date: '28.01.2026', channel: 'Телефон', text: 'Согласование даты выезда' },
  ] : [];

  const handleAddClient = () => {
    form
      .validateFields()
      .then((values) => {
        const newClient = {
          id: String(Date.now()),
          ...values,
        };
        setClients((prev) => [newClient, ...prev]);
        setModalVisible(false);
        setEditingClientId(null);
        form.resetFields();
      })
      .catch(() => {});
  };

  const handleUpdateClient = () => {
    if (!editingClientId) return;
    form
      .validateFields()
      .then((values) => {
        api.updateClient(editingClientId, values)
          .then((updated) => {
            setClients((prev) => prev.map((c) => (c.id === editingClientId ? { ...c, ...updated } : c)));
            setModalVisible(false);
            setEditingClientId(null);
            form.resetFields();
            setSelectedClient((prev) => (prev && prev.id === editingClientId ? { ...prev, ...updated } : prev));
            message.success('Данные клиента сохранены');
          })
          .catch(() => message.error('Не удалось сохранить изменения'));
      })
      .catch(() => {});
  };

  const openEditClient = () => {
    if (!selectedClient) return;
    form.setFieldsValue(selectedClient);
    setEditingClientId(selectedClient.id);
    setCardVisible(false);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{value}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.type}
          </Text>
        </Space>
      ),
    },
    {
      title: 'ИНН / ОГРН',
      dataIndex: 'inn',
      key: 'inn',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'Активный'
            ? '#a48752'
            : status === 'Новый'
            ? '#333333'
            : '#777777';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Сегмент',
      dataIndex: 'segment',
      key: 'segment',
    },
    {
      title: 'Эксперт/специалист',
      dataIndex: 'manager',
      key: 'manager',
    },
    ...(onOpenCard ? [{
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" size="small" icon={<ProfileOutlined />} onClick={() => onOpenCard(record.id)}>
          Карточка
        </Button>
      ),
    }] : []),
  ];

  const reestrColumns = [
    { title: 'Клиент', dataIndex: 'client_name', key: 'client_name' },
    { title: 'Этап', dataIndex: 'stage', key: 'stage', render: (s) => <Tag color="#333">{s}</Tag> },
    { title: 'Сумма', dataIndex: 'sum_rub', key: 'sum_rub', render: (v) => v != null ? `${Number(v).toLocaleString('ru-RU')} ₽` : '—' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.client_id && onOpenCard && (
            <Button type="link" size="small" icon={<UserOutlined />} onClick={() => onOpenCard(record.client_id)}>
              Карточка клиента
            </Button>
          )}
          {onNavigate && (
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => onNavigate('crm-deals')}>
              Изменить
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 24,
        background: '#ffffff',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 4 }}>
            Клиенты и реестр
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            Клиентская база и реестр дел. Регистрация клиентов, поиск, учёт ответственного эксперта/специалиста. Возможность исправления данных.
          </Paragraph>
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Добавить клиента
            </Button>
            <Button icon={<ExportOutlined />} onClick={() => {
              const headers = ['Клиент', 'Тип', 'ИНН', 'Телефон', 'Email', 'Статус', 'Сегмент', 'Эксперт/специалист'];
              const rows = filteredClients.map((c) => [c.name, c.type, c.inn, c.phone, c.email, c.status, c.segment, c.manager].map((v) => `"${String(v || '').replace(/"/g, '""')}"`).join(','));
              const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `клиенты_${new Date().toISOString().slice(0, 10)}.csv`;
              a.click();
              URL.revokeObjectURL(url);
              message.success('Экспорт выполнен');
            }}>
              Экспорт
            </Button>
          </Space>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey={defaultTab === 'reestr' ? 'reestr' : 'base'}
        onChange={(key) => { if (key === 'reestr') loadDeals(); }}
        items={[
          {
            key: 'base',
            label: <span><UserOutlined /> Клиентская база</span>,
            children: (
              <Card
                title="Клиентская база"
                extra={
                  <Space>
                    <Input
                      allowClear
                      prefix={<SearchOutlined />}
                      placeholder="Поиск по имени, ИНН или телефону"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: 260 }}
                    />
                    <Select
                      allowClear
                      placeholder="Статус"
                      style={{ width: 140 }}
                      value={statusFilter}
                      onChange={(value) => setStatusFilter(value)}
                    >
                      <Option value="Новый">Новый</Option>
                      <Option value="Активный">Активный</Option>
                      <Option value="В работе">В работе</Option>
                    </Select>
                  </Space>
                }
              >
                <Spin spinning={loading}>
                  <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredClients}
                    pagination={{ pageSize: 8, showSizeChanger: false }}
                    onRow={(record) => ({
                      onClick: () => { setSelectedClient(record); setCardVisible(true); },
                      style: { cursor: 'pointer' },
                    })}
                  />
                </Spin>
              </Card>
            ),
          },
          {
            key: 'reestr',
            label: <span><UnorderedListOutlined /> Реестр дел</span>,
            children: (
              <Card
                title="Реестр дел"
                extra={
                  onNavigate && (
                    <Button type="primary" size="small" onClick={() => onNavigate('crm-deals')}>
                      Управление сделками
                    </Button>
                  )
                }
              >
                <Spin spinning={dealsLoading}>
                  <Table
                    rowKey="id"
                    columns={reestrColumns}
                    dataSource={deals}
                    pagination={{ pageSize: 10, showSizeChanger: true }}
                  />
                </Spin>
              </Card>
            ),
          },
        ]}
      />

      <Modal
        title={editingClientId ? 'Редактирование клиента' : 'Новый клиент'}
        open={modalVisible}
        onOk={editingClientId ? handleUpdateClient : handleAddClient}
        onCancel={() => { setModalVisible(false); setEditingClientId(null); form.resetFields(); }}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Наименование / ФИО"
            name="name"
            rules={[{ required: true, message: 'Укажите наименование клиента' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Тип клиента"
            name="type"
            initialValue="Физ. лицо"
            rules={[{ required: true, message: 'Выберите тип клиента' }]}
          >
            <Select>
              <Option value="Физ. лицо">Физ. лицо</Option>
              <Option value="Юр. лицо">Юр. лицо</Option>
            </Select>
          </Form.Item>
          <Form.Item label="ИНН / ОГРН" name="inn">
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="10, 12 (ИНН) или 13, 15 (ОГРН) цифр" />
              <Button
                type="default"
                onClick={() => {
                  const inn = form.getFieldValue('inn') || '';
                  if (!inn.trim()) { message.warning('Введите ИНН или ОГРН'); return; }
                  api.fnsCheck(inn.trim(), inn.trim()).then((r) => {
                    if (r.valid) message.success(r.message + (r.name ? `: ${r.name}` : ''));
                    else message.warning(r.message);
                  }).catch(() => message.error('Ошибка проверки'));
                }}
              >
                Проверить
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="Телефон" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item
            label="Статус"
            name="status"
            initialValue="Новый"
            rules={[{ required: true, message: 'Выберите статус' }]}
          >
            <Select>
              <Option value="Новый">Новый</Option>
              <Option value="В работе">В работе</Option>
              <Option value="Активный">Активный</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Сегмент" name="segment">
            <Select allowClear>
              <Option value="VIP">VIP</Option>
              <Option value="Корпоративный">Корпоративный</Option>
              <Option value="Частный">Частный</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Эксперт/специалист" name="manager">
            <Input placeholder="ФИО ответственного эксперта или специалиста" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={selectedClient ? `Карточка клиента: ${selectedClient.name}` : 'Карточка клиента'}
        open={cardVisible}
        onCancel={() => { setCardVisible(false); setSelectedClient(null); }}
        footer={[
          <Button key="edit" type="primary" icon={<EditOutlined />} onClick={openEditClient}>Изменить</Button>,
          <Button key="close" onClick={() => setCardVisible(false)}>Закрыть</Button>,
        ]}
        width={640}
      >
        {selectedClient && (
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><UserOutlined /> Общие данные</span>} key="1">
              <Row gutter={[16, 8]}>
                <Col span={12}><Text type="secondary">Тип:</Text></Col><Col span={12}>{selectedClient.type}</Col>
                <Col span={12}><Text type="secondary">ИНН / ОГРН:</Text></Col><Col span={12}>{selectedClient.inn}</Col>
                <Col span={12}><Text type="secondary">Телефон:</Text></Col><Col span={12}>{selectedClient.phone}</Col>
                <Col span={12}><Text type="secondary">Email:</Text></Col><Col span={12}>{selectedClient.email}</Col>
                <Col span={12}><Text type="secondary">Статус:</Text></Col><Col span={12}><Tag color="#a48752">{selectedClient.status}</Tag></Col>
                <Col span={12}><Text type="secondary">Сегмент:</Text></Col><Col span={12}>{selectedClient.segment}</Col>
                <Col span={12}><Text type="secondary">Эксперт/специалист:</Text></Col><Col span={12}>{selectedClient.manager}</Col>
              </Row>
            </TabPane>
            <TabPane tab={<span><FileTextOutlined /> Договоры</span>} key="2">
              <List
                dataSource={mockContracts}
                renderItem={(item) => (
                  <List.Item>
                    <div><Text strong>{item.num}</Text> от {item.date} — {item.subject}</div>
                    <div><Text type="secondary">{item.sum}</Text></div>
                  </List.Item>
                )}
              />
              <Text type="secondary">История договоров по клиенту (мок)</Text>
            </TabPane>
            <TabPane tab={<span><DollarOutlined /> Платежи</span>} key="3">
              <List
                dataSource={[{ id: 1, date: '20.02.2025', sum: '78 000 ₽', doc: 'Счёт № 102' }]}
                renderItem={(item) => (
                  <List.Item>
                    {item.date} — {item.sum} ({item.doc})
                  </List.Item>
                )}
              />
              <Text type="secondary">Платежи по клиенту (мок)</Text>
            </TabPane>
            <TabPane tab={<span><MessageOutlined /> Коммуникации</span>} key="4">
              <List
                dataSource={mockCommunications}
                renderItem={(item) => (
                  <List.Item>
                    <div><Tag>{item.channel}</Tag> {item.date}</div>
                    <div>{item.text}</div>
                  </List.Item>
                )}
              />
              <Text type="secondary">Лог обращений и сообщений (мок)</Text>
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
}

export default Clients;