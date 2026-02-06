import React from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Button, Avatar, List, Tag, Progress } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  FolderOpenOutlined,
  DollarOutlined,
  TeamOutlined,
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const MainInterface = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="light">
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 'bold' }}>
          Платформа
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
          <Menu.Item key="1" icon={<BarChartOutlined />}>
            Дашборд
          </Menu.Item>
          <SubMenu key="crm" icon={<UserOutlined />} title="CRM">
            <Menu.Item key="clients">Клиенты</Menu.Item>
            <Menu.Item key="leads">Лиды</Menu.Item>
          </SubMenu>
          <SubMenu key="documents" icon={<FileTextOutlined />} title="Документооборот">
            <Menu.Item key="upload">Загрузка</Menu.Item>
            <Menu.Item key="classification">Классификация</Menu.Item>
          </SubMenu>
          <SubMenu key="cycles" icon={<FolderOpenOutlined />} title="Бизнес-циклы">
            <Menu.Item key="expertise">Судебная экспертиза</Menu.Item>
            <Menu.Item key="valuation">Оценка недвижимости</Menu.Item>
            <Menu.Item key="legal">Юридическое сопровождение</Menu.Item>
            <Menu.Item key="realty">Риэлторская оценка</Menu.Item>
          </SubMenu>
          <Menu.Item key="archive" icon={<FolderOpenOutlined />}>
            Архив
          </Menu.Item>
          <Menu.Item key="finance" icon={<DollarOutlined />}>
            Финансы
          </Menu.Item>
          <SubMenu key="communication" icon={<MessageOutlined />} title="Связь">
            <Menu.Item key="telegram">Telegram</Menu.Item>
            <Menu.Item key="max">MAX</Menu.Item>
            <Menu.Item key="bip">BIP</Menu.Item>
            <Menu.Item key="sms">SMS</Menu.Item>
            <Menu.Item key="email">Email</Menu.Item>
            <Menu.Item key="calls">Звонки</Menu.Item>
          </SubMenu>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Настройки
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>Главная панель</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BellOutlined style={{ fontSize: 18, marginRight: 16 }} />
            <Avatar icon={<UserOutlined />} />
          </div>
        </Header>
        <Content style={{ margin: '16px', background: '#fff', padding: 24 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic title="Активные дела" value={1247} prefix={<FileTextOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Клиенты" value={5832} prefix={<TeamOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Документы" value={15420} prefix={<FileTextOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Доходы" value={2847500} prefix={<DollarOutlined />} suffix="₽" />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="Последние клиенты" extra={<Button type="link">Все</Button>}>
                <List
                  dataSource={[
                    { name: 'Иванов Иван Иванович', status: 'Активный', avatar: <Avatar icon={<UserOutlined />} /> },
                    { name: 'ООО "Ромашка"', status: 'Новый', avatar: <Avatar icon={<TeamOutlined />} /> },
                    { name: 'Петров Петр Петрович', status: 'Завершен', avatar: <Avatar icon={<UserOutlined />} /> },
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.avatar}
                        title={item.name}
                        description={<Tag color={item.status === 'Активный' ? 'green' : item.status === 'Новый' ? 'blue' : 'red'}>{item.status}</Tag>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Бизнес-циклы" extra={<Button type="link">Управление</Button>}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Судебная экспертиза</span>
                    <span>75%</span>
                  </div>
                  <Progress percent={75} status="active" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Оценка недвижимости</span>
                    <span>60%</span>
                  </div>
                  <Progress percent={60} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Юридическое сопровождение</span>
                    <span>90%</span>
                  </div>
                  <Progress percent={90} status="success" />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Риэлторская оценка</span>
                    <span>45%</span>
                  </div>
                  <Progress percent={45} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card title="Каналы связи" extra={<Button type="link">Настроить</Button>}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <MessageOutlined style={{ marginRight: 8 }} />
                  <span>Telegram</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  <span>MAX</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <GlobalOutlined style={{ marginRight: 8 }} />
                  <span>BIP</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <MailOutlined style={{ marginRight: 8 }} />
                  <span>SMS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MailOutlined style={{ marginRight: 8 }} />
                  <span>Email</span>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Архив" extra={<Button type="link">Поиск</Button>}>
                <p>Документы хранятся зашифрованно</p>
                <p>Сроки хранения: 3-75 лет</p>
                <Button type="primary" block>Экспорт</Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Финансы" extra={<Button type="link">Интеграции</Button>}>
                <p>ОФД: Автоматическая фискализация</p>
                <p>ЭДО: Обмен документами</p>
                <p>1С: Синхронизация</p>
                <Button type="primary" block>Платежи</Button>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainInterface;