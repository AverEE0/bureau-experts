import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Card, Typography } from 'antd';
import { StopOutlined, PlayCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Title } = Typography;

const ROLES = [
  { value: 'admin', label: 'Администратор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'expert', label: 'Эксперт' },
  { value: 'appraiser', label: 'Оценщик' },
  { value: 'user', label: 'Пользователь' },
];

export default function Admin({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const load = async () => {
    try {
      const list = await api.getAdminUsers();
      setUsers(list);
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') load();
  }, [user?.role]);

  const handleBlock = async (id) => {
    try {
      await api.blockUser(id);
      message.success('Пользователь заблокирован');
      load();
    } catch (e) {
      message.error(e.message);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await api.unblockUser(id);
      message.success('Пользователь разблокирован');
      load();
    } catch (e) {
      message.error(e.message);
    }
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await api.createUser(values);
      message.success('Пользователь создан');
      setModalOpen(false);
      form.resetFields();
      load();
    } catch (e) {
      if (e.errorFields) return;
      message.error(e.message);
    }
  };

  const openEdit = (record) => {
    setEditingUser(record);
    editForm.setFieldsValue({ role: record.role, full_name: record.full_name || '' });
    setEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const values = await editForm.validateFields();
      await api.updateUser(editingUser.id, values);
      message.success('Роль и данные обновлены');
      setEditModalOpen(false);
      setEditingUser(null);
      load();
    } catch (e) {
      if (e.errorFields) return;
      message.error(e.message);
    }
  };

  if (user?.role !== 'admin') {
    return <div style={{ padding: 24 }}>Доступ только для администратора.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Управление пользователями и назначение ролей</Title>
      <Card size="small" style={{ marginBottom: 16 }}>
        Добавляйте пользователей, назначайте роли (Администратор, Менеджер, Эксперт, Оценщик) и при необходимости блокируйте учётные записи.
      </Card>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)} style={{ marginBottom: 16 }}>
        Добавить пользователя
      </Button>
      <Table
        dataSource={users}
        rowKey="id"
        loading={loading}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 56 },
          { title: 'Логин', dataIndex: 'email' },
          { title: 'Ф.И.О.', dataIndex: 'full_name' },
          {
            title: 'Роль',
            dataIndex: 'role',
            render: (role) => ROLES.find((r) => r.value === role)?.label || role,
          },
          {
            title: 'Статус',
            dataIndex: 'is_active',
            width: 100,
            render: (v) => (v === 1 ? 'Активен' : 'Заблокирован'),
          },
          {
            title: 'Действия',
            key: 'actions',
            width: 220,
            render: (_, r) => (
              <>
                <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(r)}>
                  Роль
                </Button>
                {r.id !== user.id && (
                  r.is_active === 1 ? (
                    <Button type="link" size="small" danger icon={<StopOutlined />} onClick={() => handleBlock(r.id)}>
                      Блок
                    </Button>
                  ) : (
                    <Button type="link" size="small" icon={<PlayCircleOutlined />} onClick={() => handleUnblock(r.id)}>
                      Разблок
                    </Button>
                  )
                )}
              </>
            ),
          },
        ]}
      />
      <Modal title="Новый пользователь" open={modalOpen} onOk={handleCreate} onCancel={() => setModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="email" label="Логин (для входа)" rules={[{ required: true, message: 'Обязательно' }]}>
            <Input placeholder="admin, expert, ivanov..." />
          </Form.Item>
          <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Обязательно' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="full_name" label="Ф.И.О.">
            <Input placeholder="Иванов Иван Иванович" />
          </Form.Item>
          <Form.Item name="role" label="Роль" initialValue="manager">
            <Select options={ROLES} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Назначение роли: ${editingUser?.email || ''}`}
        open={editModalOpen}
        onOk={handleUpdateUser}
        onCancel={() => { setEditModalOpen(false); setEditingUser(null); }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="role" label="Роль" rules={[{ required: true }]}>
            <Select options={ROLES} />
          </Form.Item>
          <Form.Item name="full_name" label="Ф.И.О.">
            <Input placeholder="Иванов Иван Иванович" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
