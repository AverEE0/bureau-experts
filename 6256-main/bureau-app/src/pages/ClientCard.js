import React, { useState, useEffect } from 'react';
import { Card, Tabs, Descriptions, Table, List, Button, Tag, Form, Input, Select, message, Spin } from 'antd';
import { ArrowLeftOutlined, MessageOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Option } = Select;

export default function ClientCard({ clientId, onClose }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commForm] = Form.useForm();

  useEffect(() => {
    if (!clientId) return;
    setLoading(true);
    api.getClientCard(clientId)
      .then(setCard)
      .catch(() => message.error('Не удалось загрузить карточку'))
      .finally(() => setLoading(false));
  }, [clientId]);

  const addCommunication = () => {
    commForm.validateFields().then((values) => {
      api.createCommunication({ client_id: clientId, ...values })
        .then(() => {
          message.success('Запись добавлена');
          commForm.resetFields();
          api.getClientCard(clientId).then(setCard);
        })
        .catch(() => message.error('Ошибка'));
    }).catch(() => {});
  };

  if (loading || !card) {
    return (
      <div style={{ padding: 24 }}>
        <Spin size="large" />
      </div>
    );
  }

  const dealColumns = [
    { title: 'Этап', dataIndex: 'stage', key: 'stage', render: (s) => <Tag color="#333">{s}</Tag> },
    { title: 'Сумма', dataIndex: 'sum_rub', key: 'sum_rub', render: (v) => v != null ? `${Number(v).toLocaleString('ru-RU')} ₽` : '—' },
    { title: 'Дата', dataIndex: 'date', key: 'date' },
  ];
  const docColumns = [
    { title: 'Файл', dataIndex: 'name', key: 'name' },
    { title: 'Тип', dataIndex: 'doc_type', key: 'doc_type' },
    { title: 'Загружен', dataIndex: 'created_at', key: 'created_at', render: (v) => v ? new Date(v).toLocaleDateString('ru-RU') : '—' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={onClose} style={{ marginBottom: 16 }}>
        Назад к списку
      </Button>
      <Card title={card.name} extra={<Tag>{card.type}</Tag>}>
        <Tabs
          defaultActiveKey="profile"
          items={[
            {
              key: 'profile',
              label: 'Профиль',
              children: (
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="ИНН">{card.inn || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Телефон">{card.phone || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Email">{card.email || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Статус">{card.status}</Descriptions.Item>
                  <Descriptions.Item label="Сегмент">{card.segment || '—'}</Descriptions.Item>
                  <Descriptions.Item label="Менеджер">{card.manager || '—'}</Descriptions.Item>
                </Descriptions>
              ),
            },
            {
              key: 'deals',
              label: <span><TeamOutlined /> Сделки</span>,
              children: <Table dataSource={card.deals || []} rowKey="id" columns={dealColumns} pagination={false} size="small" />,
            },
            {
              key: 'documents',
              label: <span><FileTextOutlined /> Документы</span>,
              children: <Table dataSource={card.documents || []} rowKey="id" columns={docColumns} pagination={false} size="small" />,
            },
            {
              key: 'communications',
              label: <span><MessageOutlined /> Коммуникации</span>,
              children: (
                <>
                  <Form form={commForm} layout="vertical" style={{ marginBottom: 16 }}>
                    <Form.Item name="channel" label="Канал" rules={[{ required: true }]}>
                      <Select placeholder="Выберите канал">
                        <Option value="Telegram">Telegram</Option>
                        <Option value="Email">Email</Option>
                        <Option value="Телефон">Телефон</Option>
                        <Option value="WhatsApp">WhatsApp</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="direction" label="Направление" initialValue="out">
                      <Select><Option value="in">Входящее</Option><Option value="out">Исходящее</Option></Select>
                    </Form.Item>
                    <Form.Item name="subject" label="Тема"><Input /></Form.Item>
                    <Form.Item name="body" label="Текст"><Input.TextArea rows={2} /></Form.Item>
                    <Button type="primary" onClick={addCommunication}>Добавить запись</Button>
                  </Form>
                  <List
                    size="small"
                    dataSource={card.communications || []}
                    renderItem={(item) => (
                      <List.Item>
                        <Tag>{item.channel}</Tag> {item.direction === 'in' ? '←' : '→'} {item.subject || item.body || '—'} — {item.created_at ? new Date(item.created_at).toLocaleString('ru-RU') : ''}
                      </List.Item>
                    )}
                  />
                </>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
