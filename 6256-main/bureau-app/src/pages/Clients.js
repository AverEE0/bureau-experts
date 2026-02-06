import React, { useMemo, useState } from 'react';
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
} from 'antd';
import { PlusOutlined, SearchOutlined, ExportOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const initialClients = [
  {
    id: '1',
    name: 'Иванов Иван Иванович',
    type: 'Физ. лицо',
    inn: '770512345678',
    phone: '+7 (900) 111-22-33',
    email: 'ivanov@example.ru',
    status: 'Активный',
    segment: 'VIP',
    manager: 'Петрова Н.В.',
  },
  {
    id: '2',
    name: 'ООО "Ромашка"',
    type: 'Юр. лицо',
    inn: '7708123456',
    phone: '+7 (900) 222-33-44',
    email: 'info@romashka.ru',
    status: 'Новый',
    segment: 'Корпоративный',
    manager: 'Иванов С.А.',
  },
  {
    id: '3',
    name: 'Петров Петр Петрович',
    type: 'Физ. лицо',
    inn: '781012345678',
    phone: '+7 (900) 333-44-55',
    email: 'petrov@example.ru',
    status: 'В работе',
    segment: 'Частный',
    manager: 'Сидорова Л.М.',
  },
];

function Clients() {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const filteredClients = useMemo(
    () =>
      clients.filter((c) => {
        const matchesSearch =
          !search ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          (c.inn && c.inn.includes(search.replace(/\s/g, ''))) ||
          (c.phone && c.phone.includes(search));
        const matchesStatus = !statusFilter || c.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [clients, search, statusFilter],
  );

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
        form.resetFields();
      })
      .catch(() => {});
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
      title: 'Менеджер',
      dataIndex: 'manager',
      key: 'manager',
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
            Управление клиентами
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            Базовая CRM: регистрация клиентов, быстрый поиск и фильтрация, сегментация и учёт ответственных.
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
            <Button icon={<ExportOutlined />}>Экспорт</Button>
          </Space>
        </Col>
      </Row>

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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredClients}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </Card>

      <Modal
        title="Новый клиент"
        open={modalVisible}
        onOk={handleAddClient}
        onCancel={() => setModalVisible(false)}
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
            <Input />
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
          <Form.Item label="Ответственный менеджер" name="manager">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Clients;