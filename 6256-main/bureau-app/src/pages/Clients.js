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
  InputNumber,
  Select,
  Tabs,
  List,
  message,
  Spin,
  Popconfirm,
} from 'antd';
import { PlusOutlined, SearchOutlined, ExportOutlined, UserOutlined, FileTextOutlined, DollarOutlined, MessageOutlined, ProfileOutlined, UnorderedListOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const STAGES_DEAL = [
  'Новый', 'В ожидании', 'В работе', 'Счет', 'Оплачен', 'Не оплачен',
  'Осмотр', 'Направлен в суд', 'Направлен нотариусу', 'Акт', 'Завершен',
];

const SERVICE_NAMES = [
  'Оценка',
  'Экспертиза',
  'Перевод',
  'Кадастровые работы',
  'Геодезия',
  'Юридические услуги',
];

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
  const [dealCreateVisible, setDealCreateVisible] = useState(false);
  const [dealEditVisible, setDealEditVisible] = useState(false);
  const [dealEditRecord, setDealEditRecord] = useState(null);
  const [reestrStageFilter, setReestrStageFilter] = useState();
  const [reestrSearch, setReestrSearch] = useState('');
  const [dealCreateForm] = Form.useForm();
  const [dealEditForm] = Form.useForm();

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

  const filteredDealsReestr = useMemo(() => {
    return deals.filter((d) => {
      const matchStage = !reestrStageFilter || d.stage === reestrStageFilter;
      const matchSearch = !reestrSearch || (d.client_name && d.client_name.toLowerCase().includes(reestrSearch.toLowerCase()));
      return matchStage && matchSearch;
    });
  }, [deals, reestrStageFilter, reestrSearch]);

  const handleCreateDeal = () => {
    dealCreateForm.validateFields().then((values) => {
      const payload = {
        client_name: values.client_name,
        stage: values.stage,
        sum_rub: values.sum_rub ?? null,
        date: values.date || null,
        client_id: values.client_id ?? null,
        number: values.number || null,
        contacts: values.contacts || null,
        service_name: values.service_name || null,
        object_address: values.object_address || null,
        inspection: values.inspection || null,
        court_assigned: values.court_assigned || null,
        petition: values.petition || null,
      };
      api.createDeal(payload)
        .then((newDeal) => {
          setDeals((prev) => [newDeal, ...prev]);
          setDealCreateVisible(false);
          dealCreateForm.resetFields();
          message.success('Дело добавлено в реестр');
        })
        .catch(() => {
          setDeals((prev) => [{ id: Date.now(), ...payload }, ...prev]);
          setDealCreateVisible(false);
          dealCreateForm.resetFields();
          message.success('Дело добавлено (локально)');
        });
    }).catch(() => {});
  };

  const openEditDeal = (record) => {
    setDealEditRecord(record);
    dealEditForm.setFieldsValue({
      client_name: record.client_name,
      stage: record.stage,
      sum_rub: record.sum_rub,
      date: record.date,
      client_id: record.client_id ?? undefined,
      number: record.number ?? undefined,
      contacts: record.contacts ?? undefined,
      service_name: record.service_name ?? undefined,
      object_address: record.object_address ?? undefined,
      inspection: record.inspection ?? undefined,
      court_assigned: record.court_assigned ?? undefined,
      petition: record.petition ?? undefined,
    });
    setDealEditVisible(true);
  };

  const handleSaveEditDeal = () => {
    if (!dealEditRecord) return;
    dealEditForm.validateFields().then((values) => {
      api.updateDeal(dealEditRecord.id, values)
        .then((updated) => {
          setDeals((prev) => prev.map((d) => (d.id === dealEditRecord.id ? updated : d)));
          setDealEditVisible(false);
          setDealEditRecord(null);
          dealEditForm.resetFields();
          message.success('Изменения сохранены');
        })
        .catch(() => {
          setDeals((prev) => prev.map((d) => (d.id === dealEditRecord.id ? { ...d, ...values } : d)));
          setDealEditVisible(false);
          setDealEditRecord(null);
          dealEditForm.resetFields();
          message.success('Изменения сохранены локально');
        });
    }).catch(() => {});
  };

  const handleDeleteDeal = (record) => {
    api.deleteDeal(record.id)
      .then(() => {
        setDeals((prev) => prev.filter((d) => d.id !== record.id));
        message.success('Дело удалено из реестра');
      })
      .catch(() => message.error('Не удалось удалить'));
  };

  const exportDealsCsv = () => {
    const headers = ['№', 'Наименование (Ф.И.О)', 'Дата поступления', 'Контакты', 'Наименование услуги', 'Адрес объекта', 'Осмотр', 'Назначенное судом', 'Ходатайство', 'Этап', 'Сумма (₽)'];
    const rows = filteredDealsReestr.map((d) =>
      [d.number, d.client_name, d.date, d.contacts, d.service_name, d.object_address, d.inspection, d.court_assigned, d.petition, d.stage, d.sum_rub != null ? d.sum_rub : '']
        .map((v) => `"${String(v != null ? v : '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `реестр_дел_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Экспорт выполнен');
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
    { title: '№', dataIndex: 'number', key: 'number', width: 90, ellipsis: true },
    { title: 'Наименование (Ф.И.О)', dataIndex: 'client_name', key: 'client_name', ellipsis: true },
    { title: 'Дата поступления', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Контакты', dataIndex: 'contacts', key: 'contacts', width: 140, ellipsis: true, render: (v) => v || '—' },
    { title: 'Наименование услуги', dataIndex: 'service_name', key: 'service_name', width: 140, render: (v) => v || '—' },
    { title: 'Адрес объекта', dataIndex: 'object_address', key: 'object_address', width: 160, ellipsis: true, render: (v) => v || '—' },
    { title: 'Осмотр', dataIndex: 'inspection', key: 'inspection', width: 100, render: (v) => v || '—' },
    { title: 'Назначенное судом', dataIndex: 'court_assigned', key: 'court_assigned', width: 140, ellipsis: true, render: (v) => v || '—' },
    { title: 'Ходатайство', dataIndex: 'petition', key: 'petition', width: 120, ellipsis: true, render: (v) => v || '—' },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space wrap>
          {record.client_id && onOpenCard && (
            <Button type="link" size="small" icon={<UserOutlined />} onClick={() => onOpenCard(record.client_id)}>
              Карточка
            </Button>
          )}
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditDeal(record)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить дело из реестра?"
            onConfirm={() => handleDeleteDeal(record)}
            okText="Удалить"
            cancelText="Отмена"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>Удалить</Button>
          </Popconfirm>
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
                  <Space wrap>
                    <Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => setDealCreateVisible(true)}>
                      Добавить дело
                    </Button>
                    <Input
                      placeholder="Поиск по клиенту"
                      value={reestrSearch}
                      onChange={(e) => setReestrSearch(e.target.value)}
                      style={{ width: 180 }}
                      allowClear
                    />
                    <Select
                      placeholder="Этап"
                      allowClear
                      style={{ width: 160 }}
                      value={reestrStageFilter}
                      onChange={setReestrStageFilter}
                    >
                      {STAGES_DEAL.map((s) => (
                        <Option key={s} value={s}>{s}</Option>
                      ))}
                    </Select>
                    <Button size="small" icon={<ReloadOutlined />} onClick={loadDeals}>Обновить</Button>
                    <Button size="small" onClick={exportDealsCsv}>Экспорт CSV</Button>
                  </Space>
                }
              >
                <Spin spinning={dealsLoading}>
                  <Table
                    rowKey="id"
                    columns={reestrColumns}
                    dataSource={filteredDealsReestr}
                    pagination={{ pageSize: 10, showSizeChanger: true }}
                    scroll={{ x: 1300 }}
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

      <Modal
        title="Добавить дело в реестр"
        open={dealCreateVisible}
        onOk={handleCreateDeal}
        onCancel={() => { setDealCreateVisible(false); dealCreateForm.resetFields(); }}
        okText="Добавить"
        cancelText="Отмена"
        width={560}
      >
        <Form layout="vertical" form={dealCreateForm}>
          <Form.Item name="client_id" label="Привязать к клиенту">
            <Select
              allowClear
              placeholder="Выберите клиента (необязательно)"
              onChange={(id) => {
                const c = clients.find((x) => x.id === id);
                if (c) dealCreateForm.setFieldsValue({
                  client_name: c.name,
                  contacts: [c.phone, c.email].filter(Boolean).join(', ') || undefined,
                });
              }}
            >
              {clients.map((c) => (
                <Option key={c.id} value={c.id}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="number" label="№ дела">
            <Input placeholder="Поочерёдная с начала года (необязательно)" />
          </Form.Item>
          <Form.Item name="client_name" label="Наименование (Ф.И.О)" rules={[{ required: true, message: 'Укажите заказчика' }]}>
            <Input placeholder="Наименование или ФИО" />
          </Form.Item>
          <Form.Item name="date" label="Дата поступления">
            <Input placeholder="ГГГГ-ММ-ДД" />
          </Form.Item>
          <Form.Item name="contacts" label="Контакты">
            <Input placeholder="Телефон, email" />
          </Form.Item>
          <Form.Item name="service_name" label="Наименование услуги">
            <Select allowClear placeholder="Выберите услугу">
              {SERVICE_NAMES.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="object_address" label="Адрес объекта">
            <Input placeholder="Адрес объекта" />
          </Form.Item>
          <Form.Item name="inspection" label="Осмотр">
            <Input placeholder="Дата / да / нет (по умолчанию НЕТ)" />
          </Form.Item>
          <Form.Item name="court_assigned" label="Назначенное судом">
            <Input placeholder="Наименование суда, скан постановления" />
          </Form.Item>
          <Form.Item name="petition" label="Ходатайство">
            <Input placeholder="Дата и прикреплённый документ" />
          </Form.Item>
          <Form.Item name="stage" label="Этап" rules={[{ required: true }]} initialValue="Новый">
            <Select>
              {STAGES_DEAL.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sum_rub" label="Сумма (₽)">
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Необязательно" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Редактировать дело"
        open={dealEditVisible}
        onOk={handleSaveEditDeal}
        onCancel={() => { setDealEditVisible(false); setDealEditRecord(null); dealEditForm.resetFields(); }}
        okText="Сохранить"
        cancelText="Отмена"
        width={560}
      >
        <Form layout="vertical" form={dealEditForm}>
          <Form.Item name="number" label="№ дела">
            <Input placeholder="Поочерёдная с начала года" />
          </Form.Item>
          <Form.Item name="client_name" label="Наименование (Ф.И.О)" rules={[{ required: true, message: 'Укажите заказчика' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Дата поступления">
            <Input placeholder="ГГГГ-ММ-ДД" />
          </Form.Item>
          <Form.Item name="contacts" label="Контакты">
            <Input placeholder="Телефон, email" />
          </Form.Item>
          <Form.Item name="service_name" label="Наименование услуги">
            <Select allowClear placeholder="Выберите услугу">
              {SERVICE_NAMES.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="object_address" label="Адрес объекта">
            <Input />
          </Form.Item>
          <Form.Item name="inspection" label="Осмотр">
            <Input placeholder="Дата / да / нет" />
          </Form.Item>
          <Form.Item name="court_assigned" label="Назначенное судом">
            <Input placeholder="Наименование суда, скан постановления" />
          </Form.Item>
          <Form.Item name="petition" label="Ходатайство">
            <Input placeholder="Дата и документ" />
          </Form.Item>
          <Form.Item name="stage" label="Этап" rules={[{ required: true }]}>
            <Select>
              {STAGES_DEAL.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sum_rub" label="Сумма (₽)">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Clients;