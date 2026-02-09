import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Statistic, Button, List, Tag, Typography, Space, Select } from 'antd';
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { api } from '../api';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Dashboard = ({ onNavigate }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.getClients().then((data) => setClients(Array.isArray(data) ? data.slice(0, 10) : [])).catch(() => setClients([]));
  }, []);

  const completedByActivity = [
    { activity: 'Судебная экспертиза', count: 124, active: 18 },
    { activity: 'Оценка недвижимости', count: 89, active: 12 },
    { activity: 'Юридическое сопровождение', count: 56, active: 8 },
    { activity: 'Риэлторская деятельность', count: 34, active: 5 },
  ];
  const income = 2847500;
  const expenses = 1120000;
  const years = [year, year - 1, year - 2];

  const quickLinks = [
    { key: 'crm-clients', label: 'Клиенты и реестр', icon: <TeamOutlined /> },
    { key: 'documents', label: 'Документы', icon: <FileTextOutlined /> },
    { key: 'cycles-expertise', label: 'Экспертиза', icon: <FileTextOutlined /> },
    { key: 'cycles-valuation', label: 'Оценка', icon: <FileTextOutlined /> },
    { key: 'documents-templates', label: 'Шаблоны', icon: <FileTextOutlined /> },
  ];

  return (
    <Content className="dashboard-content-full">
      {onNavigate && (
        <Card size="small" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ marginRight: 8 }}>Быстрые переходы:</Text>
          <Space wrap>
            {quickLinks.map(({ key, label, icon }) => (
              <Button key={key} size="small" icon={icon} onClick={() => onNavigate(key)}>{label}</Button>
            ))}
          </Space>
        </Card>
      )}

      <Row gutter={24}>
        <Col span={6}>
          <Card>
            <Statistic title="Активные дела" value={43} prefix={<FileTextOutlined />} valueStyle={{ color: '#a48752' }} />
            <Button type="link" size="small" onClick={() => onNavigate && onNavigate('crm-deals')}>Перейти к делам</Button>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Клиенты" value={clients.length > 0 ? clients.length : 5832} prefix={<TeamOutlined />} valueStyle={{ color: '#a48752' }} />
            <Button type="link" size="small" onClick={() => onNavigate && onNavigate('crm-clients')}>Перейти</Button>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Доходы" value={income} prefix={<RiseOutlined />} suffix="₽" valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Расходы" value={expenses} prefix={<FallOutlined />} suffix="₽" valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card
            title="Выполнено дел по деятельности"
            extra={<Button type="link" onClick={() => onNavigate && onNavigate('crm-deals')}>К делам</Button>}
          >
            {completedByActivity.map(({ activity, count, active }) => (
              <div key={activity} style={{ marginBottom: 12 }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>{activity}</Text>
                  <Space>
                    <Tag color="green">Выполнено: {count}</Tag>
                    <Tag color="blue">Активных: {active}</Tag>
                  </Space>
                </Space>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Динамика доходов и дел с начала года">
            <Space style={{ marginBottom: 12 }}>
              <Text>Год:</Text>
              <Select value={year} onChange={setYear} style={{ width: 100 }}>
                {years.map((y) => (
                  <Option key={y} value={y}>{y}</Option>
                ))}
              </Select>
            </Space>
            <div style={{ textAlign: 'center', padding: 16 }}>
              <Text>Доходы за {year}: рост к прошлому году</Text>
              <br />
              <Text>Дела за {year}: динамика по активностям</Text>
            </div>
            <Button type="link" onClick={() => onNavigate && onNavigate('reports-analytics')}>Подробная аналитика</Button>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card
            title="Карточка предприятия"
            extra={<Button type="link" onClick={() => onNavigate && onNavigate('settings')}>Настройки</Button>}
          >
            <Space direction="vertical">
              <Text strong>СЭЦ «БЮРО ЭКСПЕРТОВ»</Text>
              <Text type="secondary">Судебная экспертиза, оценка, юридические услуги</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Последние 10 клиентов"
            extra={<Button type="link" onClick={() => onNavigate && onNavigate('crm-clients')}>Все</Button>}
          >
            <List
              size="small"
              dataSource={clients.length > 0 ? clients : [
                { id: 1, name: 'Иванов Иван Иванович', phone: '+7 (900) 111-22-33', status: 'Активный' },
                { id: 2, name: 'ООО "Ромашка"', email: 'info@romashka.ru', status: 'Новый' },
                { id: 3, name: 'Петров Петр Петрович', phone: '+7 (900) 333-44-55', status: 'В работе' },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<UserOutlined style={{ color: '#a48752' }} />}
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <Space direction="vertical" size={0}>
                        {(item.phone || item.email) && (
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {item.phone || item.email}
                          </Text>
                        )}
                        <Space size={4}>
                          <Tag color={item.status === 'Активный' ? '#a48752' : '#333'}>{item.status}</Tag>
                          <Text type="secondary" style={{ fontSize: 11 }}>Каналы: Telegram, Email</Text>
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Архив и Финансы" extra={<Button type="link" onClick={() => onNavigate && onNavigate('finance-ofd')}>Интеграции</Button>}>
            <Space direction="vertical" size="small">
              <div>
                <Text strong>Архив:</Text>
                <br />
                <Text>Зашифрованное хранение, сроки 3–75 лет</Text>
              </div>
              <div>
                <Text strong>Финансы:</Text>
                <br />
                <Text>ОФД, ЭДО, 1С, Банки</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
