import React from 'react';
import { Layout, Card, Row, Col, Button, List, Avatar, Tag, Typography, Space } from 'antd';
import { UserOutlined, TeamOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const CRM = () => {
  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>CRM - Управление клиентской базой</Title>
      <Text>Регистрация клиентов (физических и юридических лиц) с автоматической проверкой по ИНН/ОГРН через ФНС. Единая карточка клиента с историей обращений, договоров, платежей.</Text>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Клиенты" extra={<Button type="primary" icon={<PlusOutlined />}>Добавить клиента</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <List
              dataSource={[
                { name: 'Иванов Иван Иванович', type: 'Физ. лицо', status: 'Активный' },
                { name: 'ООО "Ромашка"', type: 'Юр. лицо', status: 'Новый' },
                { name: 'Петров Петр Петрович', type: 'Физ. лицо', status: 'Завершен' },
              ]}
              renderItem={item => (
                <List.Item actions={[<Button type="link">Редактировать</Button>]}>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.type === 'Физ. лицо' ? <UserOutlined /> : <TeamOutlined />} />}
                    title={<Text strong>{item.name}</Text>}
                    description={<Tag color={item.status === 'Активный' ? 'green' : item.status === 'Новый' ? 'blue' : 'orange'}>{item.status}</Tag>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Лиды" extra={<Button icon={<SearchOutlined />}>Поиск</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Автоматическое определение каналов связи по номеру телефона (мессенджеры, email, SMS).</Text>
              <Text>Ролевая модель: администратор, менеджер, оценщик, эксперт, клиент.</Text>
              <Button type="primary" block>Импорт лидов</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default CRM;