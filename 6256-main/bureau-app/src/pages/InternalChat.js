import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Button, Avatar, Typography, message } from 'antd';
import { SendOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

export default function InternalChat({ user }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    api.getChatRooms()
      .then((list) => {
        setRooms(Array.isArray(list) ? list : []);
        if (list?.length && !selectedRoom) setSelectedRoom(list[0].id);
      })
      .catch(() => message.error('Не удалось загрузить список чатов'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!selectedRoom) {
      setMessages([]);
      return;
    }
    setLoading(true);
    api.getChatMessages(selectedRoom)
      .then((list) => {
        setMessages(Array.isArray(list) ? list : []);
        setTimeout(scrollToBottom, 100);
      })
      .catch(() => message.error('Не удалось загрузить сообщения'))
      .finally(() => setLoading(false));
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const text = (newMessage || '').trim();
    if (!text || !selectedRoom) return;
    setSending(true);
    try {
      const msg = await api.sendChatMessage(selectedRoom, text);
      setMessages((prev) => [...prev, msg]);
      setNewMessage('');
      scrollToBottom();
    } catch (e) {
      message.error(e.message || 'Ошибка отправки');
    } finally {
      setSending(false);
    }
  };

  const selectedRoomInfo = rooms.find((r) => r.id === selectedRoom);

  return (
    <Content className="internal-chat-content" style={{ padding: 0, background: '#fff', height: '100%', display: 'flex' }}>
      <div className="internal-chat-sidebar" style={{ width: 260, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0' }}>
          <Title level={5} style={{ margin: 0 }}>Чаты</Title>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: selectedRoom === room.id ? '#e6f7ff' : 'transparent',
                borderBottom: '1px solid #f5f5f5',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Avatar
                size="small"
                icon={room.type === 'general' ? <TeamOutlined /> : <UserOutlined />}
                style={{ background: room.type === 'general' ? '#1890ff' : '#87d068' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <Text strong={selectedRoom === room.id}>{room.name}</Text>
                {room.type === 'dm' && (
                  <div><Text type="secondary" style={{ fontSize: 12 }}>Личный чат</Text></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {selectedRoomInfo && (
          <>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
              <Text strong>{selectedRoomInfo.name}</Text>
              {selectedRoomInfo.type === 'general' && (
                <Text type="secondary" style={{ marginLeft: 8 }}>— все сотрудники</Text>
              )}
            </div>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {loading ? (
                <div style={{ textAlign: 'center', padding: 24 }}>Загрузка...</div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignSelf: m.sender_id === user?.id ? 'flex-end' : 'flex-start',
                      flexDirection: m.sender_id === user?.id ? 'row-reverse' : 'row',
                      maxWidth: '80%',
                    }}
                  >
                    <Avatar size="small" icon={<UserOutlined />} style={{ flexShrink: 0 }} />
                    <div
                      style={{
                        background: m.sender_id === user?.id ? '#1890ff' : '#f0f0f0',
                        color: m.sender_id === user?.id ? '#fff' : '#000',
                        padding: '8px 12px',
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: m.sender_id === user?.id ? 'rgba(255,255,255,0.85)' : '#666' }}>
                        {m.sender_name}
                      </Text>
                      <div style={{ marginTop: 4 }}>{m.body}</div>
                      <Text style={{ fontSize: 11, opacity: 0.8 }}>
                        {m.created_at ? new Date(m.created_at).toLocaleString('ru-RU') : ''}
                      </Text>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <TextArea
                  rows={2}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  style={{ flex: 1 }}
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSend} loading={sending}>
                  Отправить
                </Button>
              </div>
            </div>
          </>
        )}
        {!selectedRoom && rooms.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: '#999' }}>
            Загрузка списка чатов...
          </div>
        )}
        {!selectedRoom && rooms.length > 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: '#999' }}>
            Выберите чат слева
          </div>
        )}
      </div>
    </Content>
  );
}
