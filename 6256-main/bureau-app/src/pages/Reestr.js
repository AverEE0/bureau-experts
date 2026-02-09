import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Typography,
  Space,
  Input,
  Modal,
  Descriptions,
} from 'antd';
import { DatabaseOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Краткий вид таблицы — только эти столбцы по умолчанию
const SHORT_COLUMNS = [
  { key: 'number', title: '№ дела', dataIndex: 'number', width: 110 },
  { key: 'client', title: 'ФИО / Заказчик', dataIndex: 'client', ellipsis: true },
  { key: 'type', title: 'Тип', dataIndex: 'type', width: 100 },
  { key: 'date', title: 'Дата', dataIndex: 'date', width: 100 },
  { key: 'status', title: 'Статус', dataIndex: 'status', width: 100 },
];

const MOCK_DATA = [
  { number: '2336/ОД08', client: 'Иванов И.И.', address: 'г. Москва, ул. Примерная, 1', cadastral: '77:01:0001001:101', type: 'Оценка', date: '15.01.2026', status: 'Завершено', manager: 'Петрова Н.В.', phone: '+7 (495) 123-45-67', email: 'ivanov@example.com' },
  { number: '2337/ОД09', client: 'ООО "Ромашка"', address: 'МО, участок 64300 кв.м', cadastral: '50:22:0050601:89', type: 'Оценка', date: '20.01.2026', status: 'В работе', manager: 'Иванов С.А.', phone: '+7 (495) 987-65-43', email: 'romashka@mail.ru' },
  { number: '2338/СЭ01', client: 'Арбитражный суд', address: '—', cadastral: '—', type: 'Экспертиза', date: '22.01.2026', status: 'Новый', manager: 'Сидорова Л.М.', phone: '—', email: '—' },
];

function Reestr() {
  const [search, setSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dataSource = useMemo(
    () =>
      !search
        ? MOCK_DATA
        : MOCK_DATA.filter((row) =>
            Object.values(row).some((v) =>
              String(v).toLowerCase().includes(search.toLowerCase()),
            ),
          ),
    [search],
  );

  const showFullInfo = (record) => {
    setSelectedRow(record);
    setModalOpen(true);
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
        Поиск по ФИО, адресу, кадастровому номеру, номеру дела. Нажмите на контакт — откроется полная информация.
      </Text>

      <Card size="small" style={{ marginTop: 24, marginBottom: 16 }}>
        <Input.Search
          placeholder="Поиск по реестру..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 280 }}
          allowClear
        />
      </Card>

      <Table
        rowKey="number"
        columns={SHORT_COLUMNS}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        size="small"
        onRow={(record) => ({
          onClick: () => showFullInfo(record),
          style: { cursor: 'pointer' },
        })}
      />

      <Modal
        title={
          <Space>
            <UserOutlined />
            {selectedRow?.client ?? 'Полная информация'}
          </Space>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={560}
      >
        {selectedRow && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="№ дела">{selectedRow.number}</Descriptions.Item>
            <Descriptions.Item label="ФИО / Заказчик">{selectedRow.client}</Descriptions.Item>
            <Descriptions.Item label="Адрес объекта">{selectedRow.address}</Descriptions.Item>
            <Descriptions.Item label="Кадастровый номер">{selectedRow.cadastral}</Descriptions.Item>
            <Descriptions.Item label="Тип">{selectedRow.type}</Descriptions.Item>
            <Descriptions.Item label="Дата">{selectedRow.date}</Descriptions.Item>
            <Descriptions.Item label="Статус">{selectedRow.status}</Descriptions.Item>
            <Descriptions.Item label="Эксперт/специалист">{selectedRow.manager}</Descriptions.Item>
            {selectedRow.phone != null && (
              <Descriptions.Item label="Телефон">{selectedRow.phone}</Descriptions.Item>
            )}
            {selectedRow.email != null && (
              <Descriptions.Item label="Email">{selectedRow.email}</Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

export default Reestr;
