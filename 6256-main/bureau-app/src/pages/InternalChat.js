import React, { useState } from 'react';
import { Layout, List, Input, Button, Upload, Avatar, Typography, Space, message } from 'antd';
import { SendOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const InternalChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Иван Иванов',
      text: 'Добрый день! Прикрепляю отчет по экспертизе.',
      timestamp: new Date().toLocaleString(),
      attachments: ['report.pdf']
    },
    {
      id: 2,
      sender: 'Мария Петрова',
      text: 'Спасибо! Посмотрю и дам обратную связь.',
      timestamp: new Date().toLocaleString(),
      attachments: []
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleSend = () => {
    if (newMessage.trim() || fileList.length > 0) {
      const attachments = fileList.map((file) => file.name);
      const newMsg = {
        id: messages.length + 1,
        sender: 'Текущий пользователь',
        text: newMessage,
        timestamp: new Date().toLocaleString(),
        attachments,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setFileList([]);
      message.success('Сообщение отправлено!');
    }
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    beforeUpload: () => false, // Не загружать на сервер, только локально
    multiple: true,
  };

  return (
    <Content style={{ padding: 24, background: '#fff' }}>
      <Title level={3}>Внутренняя переписка</Title>
      <div style={{ height: '60vh', overflowY: 'auto', border: '1px solid #d9d9d9', borderRadius: 4, padding: 16, marginBottom: 16 }}>
        <List
          dataSource={messages}
          renderItem={item => (
            <List.Item style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 0' }}>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<Text strong>{item.sender}</Text>}
                description={
                  <div>
                    <Text>{item.text}</Text>
                    {item.attachments.length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">Прикрепленные файлы:</Text>
                        <ul>
                          {item.attachments.map((file, index) => (
                            <li key={index}><Text code>{file}</Text></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Text type="secondary" style={{ fontSize: 12 }}>{item.timestamp}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Прикрепить документы</Button>
        </Upload>
        <Space.Compact style={{ width: '100%' }}>
          <TextArea
            rows={3}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Введите сообщение..."
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
            Отправить
          </Button>
        </Space.Compact>
      </Space>
    </Content>
  );
};

export default InternalChat;