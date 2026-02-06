import React from 'react';
import { Layout, Card, Row, Col, Button, List, Typography, Space } from 'antd';
import { FolderOpenOutlined, DownloadOutlined, LockOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const Archive = () => {
  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Архивная система</Title>
      <Text>Единое зашифрованное хранилище для всех документов. Автоматическое назначение сроков хранения. Соответствие ФЗ-125 и Приказу Минкультуры №558.</Text>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Документы в архиве" extra={<Button type="link">Поиск</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <List
              dataSource={[
                { name: 'Договор №123', type: 'Договор', date: '2023-01-15', status: 'Активный' },
                { name: 'Отчет об оценке квартиры', type: 'Отчет', date: '2023-02-20', status: 'Архив' },
                { name: 'Заключение эксперта', type: 'Экспертиза', date: '2023-03-10', status: 'Архив' },
              ]}
              renderItem={item => (
                <List.Item actions={[<Button icon={<DownloadOutlined />} type="link">Скачать</Button>]}>
                  <List.Item.Meta
                    title={<Text strong>{item.name}</Text>}
                    description={<Text>{item.type} | {item.date} | {item.status}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Настройки архива" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <div>
                <Text strong>Сроки хранения:</Text>
                <br />
                <Text>- Судебные экспертизы: 75 лет</Text>
                <br />
                <Text>- Оценка недвижимости: 10 лет</Text>
                <br />
                <Text>- Юридические услуги: 5-10 лет</Text>
                <br />
                <Text>- Риэлторские консультации: 3 года</Text>
              </div>
              <div style={{ marginTop: 16 }}>
                <Text strong>Безопасность:</Text>
                <br />
                <Text><LockOutlined /> Зашифрованное хранение (AES-256)</Text>
              </div>
              <Button type="primary" block style={{ marginTop: 16 }}>Экспорт в PDF/A</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Archive;