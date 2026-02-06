import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Typography,
  Checkbox,
  Space,
  Input,
  Row,
  Col,
} from 'antd';
import { DatabaseOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ALL_COLUMNS = [
  { key: 'number', title: '№ дела', dataIndex: 'number' },
  { key: 'client', title: 'ФИО / Заказчик', dataIndex: 'client' },
  { key: 'address', title: 'Адрес объекта', dataIndex: 'address' },
  { key: 'cadastral', title: 'Кадастровый номер', dataIndex: 'cadastral' },
  { key: 'type', title: 'Тип (оценка/экспертиза)', dataIndex: 'type' },
  { key: 'date', title: 'Дата', dataIndex: 'date' },
  { key: 'status', title: 'Статус', dataIndex: 'status' },
  { key: 'manager', title: 'Ответственный', dataIndex: 'manager' },
];

const MOCK_DATA = [
  { number: '2336/ОД08', client: 'Иванов И.И.', address: 'г. Москва, ул. Примерная, 1', cadastral: '77:01:0001001:101', type: 'Оценка', date: '15.01.2026', status: 'Завершено', manager: 'Петрова Н.В.' },
  { number: '2337/ОД09', client: 'ООО "Ромашка"', address: 'МО, участок 64300 кв.м', cadastral: '50:22:0050601:89', type: 'Оценка', date: '20.01.2026', status: 'В работе', manager: 'Иванов С.А.' },
  { number: '2338/СЭ01', client: 'Арбитражный суд', address: '—', cadastral: '—', type: 'Экспертиза', date: '22.01.2026', status: 'Новый', manager: 'Сидорова Л.М.' },
];

function Reestr() {
  const [visibleColumns, setVisibleColumns] = useState(ALL_COLUMNS.map((c) => c.key));
  const [search, setSearch] = useState('');

  const columns = useMemo(
    () =>
      ALL_COLUMNS.filter((col) => visibleColumns.includes(col.key)).map((col) => ({
        ...col,
        ellipsis: true,
      })),
    [visibleColumns],
  );

  const dataSource = useMemo(
    () =>
      !search
        ? MOCK_DATA
        : MOCK_DATA.filter(
            (row) =>
              Object.values(row).some((v) =>
                String(v).toLowerCase().includes(search.toLowerCase()),
              ),
          ),
    [search],
  );

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <div
      style={{
        padding: 24,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Title level={2}>
        <DatabaseOutlined style={{ marginRight: 8 }} />
        Реестр дел и документов
      </Title>
      <Text type="secondary">
        Поиск по ФИО, адресу, кадастровому номеру, номеру дела. Включение и отключение столбцов по необходимости (как в реестре СЭЦ).
      </Text>

      <Card size="small" style={{ marginTop: 24, marginBottom: 16 }}>
        <Space wrap>
          <Input.Search
            placeholder="Поиск по реестру..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Space>
            <SettingOutlined />
            <Text type="secondary">Столбцы:</Text>
            {ALL_COLUMNS.map((col) => (
              <Checkbox
                key={col.key}
                checked={visibleColumns.includes(col.key)}
                onChange={() => toggleColumn(col.key)}
              >
                {col.title}
              </Checkbox>
            ))}
          </Space>
        </Space>
      </Card>

      <Table
        rowKey="number"
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        size="small"
      />
    </div>
  );
}

export default Reestr;
