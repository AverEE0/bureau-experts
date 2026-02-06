import React from 'react';
import { Layout, Card, Row, Col, Statistic, Button, Avatar, List, Tag, Progress, Typography, Space } from 'antd';
import {
  FileTextOutlined,
  TeamOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined as TeamIcon,
} from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const Dashboard = ({ onNavigate }) => {
  const quickLinks = [
    { key: 'crm-clients', label: 'Клиенты', icon: <TeamOutlined /> },
    { key: 'documents', label: 'Документы', icon: <FileTextOutlined /> },
    { key: 'cycles-expertise', label: 'Экспертиза', icon: <FileTextOutlined /> },
    { key: 'cycles-valuation', label: 'Оценка', icon: <FileTextOutlined /> },
    { key: 'archive-reestr', label: 'Реестр', icon: <FileTextOutlined /> },
    { key: 'documents-templates', label: 'Шаблоны', icon: <FileTextOutlined /> },
  ];

  const [bannerVisible, setBannerVisible] = React.useState(true);
  const publicUrl = process.env.PUBLIC_URL || '';
  return (
    <Content className="dashboard-content-full">
      {bannerVisible && (
        <div className="dashboard-banner-wrap">
          <img
            src={`${publicUrl}/logo-banner.jpg`}
            alt="БЮРО ЭКСПЕРТОВ"
            className="dashboard-banner"
            onError={() => setBannerVisible(false)}
          />
        </div>
      )}
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
            <Statistic title="Активные дела" value={1247} prefix={<FileTextOutlined />} valueStyle={{ color: '#a48752' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Клиенты" value={5832} prefix={<TeamOutlined />} valueStyle={{ color: '#a48752' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Документы" value={15420} prefix={<FileTextOutlined />} valueStyle={{ color: '#a48752' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Доходы" value={2847500} prefix={<DollarOutlined />} suffix="₽" valueStyle={{ color: '#a48752' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Динамика доходов и дел" extra={<Button type="link" onClick={() => onNavigate && onNavigate('reports-analytics')}>Подробнее</Button>}>
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Text>График доходов: Рост на 40% за полгода</Text>
              <br />
              <Text>Количество дел: Увеличение на 83%</Text>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Распределение бизнес-циклов" extra={<Button type="link" onClick={() => onNavigate && onNavigate('reports-operational')}>Управление</Button>}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Судебная экспертиза</span>
                <span>35%</span>
              </div>
              <Progress percent={35} strokeColor="#a48752" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Оценка недвижимости</span>
                <span>30%</span>
              </div>
              <Progress percent={30} strokeColor="#a48752" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Юридическое сопровождение</span>
                <span>20%</span>
              </div>
              <Progress percent={20} strokeColor="#a48752" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Риэлторская оценка</span>
                <span>15%</span>
              </div>
              <Progress percent={15} strokeColor="#a48752" />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="Последние клиенты" extra={<Button type="link">Все</Button>}>
            <List
              dataSource={[
                { name: 'Иванов Иван Иванович', status: 'Активный', avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#000000' }} /> },
                { name: 'ООО "Ромашка"', status: 'Новый', avatar: <Avatar icon={<TeamIcon />} style={{ backgroundColor: '#333333' }} /> },
                { name: 'Петров Петр Петрович', status: 'Завершен', avatar: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#a48752' }} /> },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.avatar}
                    title={<Text strong>{item.name}</Text>}
                    description={<Tag color={item.status === 'Активный' ? '#a48752' : '#333333'}>{item.status}</Tag>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Omnichannel Каналы связи" extra={<Button type="link">Настроить</Button>}>
            <Space direction="vertical" size="small">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Telegram Bot API</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>MAX (российский)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>BIP (турецкий)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>SMS (SMSc.ru)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Email (SMTP)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>WebRTC Звонки</span>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Архив и Финансы" extra={<Button type="link">Интеграции</Button>}>
            <Space direction="vertical" size="small">
              <div>
                <Text strong>Архив:</Text>
                <br />
                <Text>Зашифрованное хранение, сроки 3-75 лет</Text>
              </div>
              <div>
                <Text strong>Финансы:</Text>
                <br />
                <Text>ОФД, ЭДО, 1С, Банки</Text>
              </div>
              <Button type="primary" block>Экспорт / Платежи</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;