import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { Layout, Menu, Typography, Space, Avatar, Drawer, Button } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  FolderOpenOutlined,
  DollarOutlined,
  MessageOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import logoBuro from './assets/logo-buro.png';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Deals from './pages/Deals';
import Contacts from './pages/Contacts';
import CRMHistory from './pages/CRMHistory';
import Documents from './pages/Documents';
import OCR from './pages/OCR';
import Templates from './pages/Templates';
import Signatures from './pages/Signatures';
import Expertise from './pages/Expertise';
import Valuation from './pages/Valuation';
import Legal from './pages/Legal';
import Realty from './pages/Realty';
import ArchiveDocs from './pages/ArchiveDocs';
import Media from './pages/Media';
import ArchiveHistory from './pages/ArchiveHistory';
import Reestr from './pages/Reestr';
import OFD from './pages/OFD';
import EDO from './pages/EDO';
import OneC from './pages/OneC';
import Banks from './pages/Banks';
import Telegram from './pages/Telegram';
import MAX from './pages/MAX';
import BIP from './pages/BIP';
import SMS from './pages/SMS';
import Email from './pages/Email';
import Calls from './pages/Calls';
import FinancialReports from './pages/FinancialReports';
import OperationalReports from './pages/OperationalReports';
import Analytics from './pages/Analytics';
import InternalChat from './pages/InternalChat';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

const { Header, Sider, Footer } = Layout;

// Соответствие пути в URL и ключа страницы (только для начальной загрузки)
const PATH_TO_PAGE = {
  '/': 'dashboard',
  '': 'dashboard',
  '/dashboard': 'dashboard',
  '/crm/clients': 'crm-clients',
  '/crm/deals': 'crm-deals',
  '/crm/contacts': 'crm-contacts',
  '/crm/history': 'crm-history',
  '/documents': 'documents',
  '/documents/ocr': 'documents-ocr',
  '/documents/templates': 'documents-templates',
  '/documents/signatures': 'documents-signatures',
  '/cycles/expertise': 'cycles-expertise',
  '/cycles/valuation': 'cycles-valuation',
  '/cycles/legal': 'cycles-legal',
  '/cycles/realty': 'cycles-realty',
  '/archive/documents': 'archive-documents',
  '/archive/media': 'archive-media',
  '/archive/history': 'archive-history',
  '/archive/reestr': 'archive-reestr',
  '/finance/ofd': 'finance-ofd',
  '/finance/edo': 'finance-edo',
  '/finance/1c': 'finance-1c',
  '/finance/banks': 'finance-banks',
  '/reports/financial': 'reports-financial',
  '/reports/operational': 'reports-operational',
  '/reports/analytics': 'reports-analytics',
  '/settings': 'settings',
  '/internal-chat': 'internal-chat',
};
const { SubMenu } = Menu;
const { Title } = Typography;

const ORG_NAME = 'СЭЦ «БЮРО ЭКСПЕРТОВ»';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // При первой загрузке показывать «Страница не найдена» для неизвестного пути в URL
  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const page = PATH_TO_PAGE[path];
    setCurrentPage(page || 'notfound');
  }, []);

  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
    if (isMobile) setDrawerVisible(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'crm-clients':
        return <Clients />;
      case 'crm-deals':
        return <Deals />;
      case 'crm-contacts':
        return <Contacts />;
      case 'crm-history':
        return <CRMHistory />;
      case 'documents':
        return <Documents />;
      case 'documents-ocr':
        return <OCR />;
      case 'documents-templates':
        return <Templates />;
      case 'documents-signatures':
        return <Signatures />;
      case 'cycles-expertise':
        return <Expertise />;
      case 'cycles-valuation':
        return <Valuation />;
      case 'cycles-legal':
        return <Legal />;
      case 'cycles-realty':
        return <Realty />;
      case 'archive-documents':
        return <ArchiveDocs />;
      case 'archive-media':
        return <Media />;
      case 'archive-history':
        return <ArchiveHistory />;
      case 'archive-reestr':
        return <Reestr />;
      case 'finance-ofd':
        return <OFD />;
      case 'finance-edo':
        return <EDO />;
      case 'finance-1c':
        return <OneC />;
      case 'finance-banks':
        return <Banks />;
      case 'omnichannel-telegram':
        return <Telegram />;
      case 'omnichannel-max':
        return <MAX />;
      case 'omnichannel-bip':
        return <BIP />;
      case 'omnichannel-sms':
        return <SMS />;
      case 'omnichannel-email':
        return <Email />;
      case 'omnichannel-calls':
        return <Calls />;
      case 'reports-financial':
        return <FinancialReports />;
      case 'reports-operational':
        return <OperationalReports />;
      case 'reports-analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'internal-chat':
        return <InternalChat />;
      case 'notfound':
        return <NotFound onGoHome={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#e9e9e9' }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={siderCollapsed}
          onCollapse={setSiderCollapsed}
          width={280}
          collapsedWidth={64}
          style={{ background: '#404040', boxShadow: '2px 0 8px rgba(0,0,0,0.15)' }}
          trigger={null}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#333',
              borderBottom: '1px solid #555',
              padding: siderCollapsed ? '0 8px' : '0 12px',
            }}
          >
            <img
              src={logoBuro}
              alt="БЮРО ЭКСПЕРТОВ"
              style={{
                maxHeight: siderCollapsed ? 36 : 48,
                maxWidth: siderCollapsed ? 48 : '80%',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Menu
              mode="inline"
              selectedKeys={[currentPage]}
              onClick={handleMenuClick}
              style={{ borderRight: 0, background: 'transparent' }}
              theme="dark"
              inlineCollapsed={siderCollapsed}
            >
              <Menu.Item key="dashboard" icon={<HomeOutlined />}>
                Дашборд
              </Menu.Item>
              <SubMenu key="crm-submenu" icon={<UserOutlined />} title="CRM">
                <Menu.Item key="crm-clients">Клиенты</Menu.Item>
                <Menu.Item key="crm-deals">Сделки</Menu.Item>
                <Menu.Item key="crm-contacts">Контакты</Menu.Item>
                <Menu.Item key="crm-history">История</Menu.Item>
              </SubMenu>
              <SubMenu key="documents-submenu" icon={<FileTextOutlined />} title="Документооборот">
                <Menu.Item key="documents">Документы</Menu.Item>
                <Menu.Item key="documents-ocr">OCR</Menu.Item>
                <Menu.Item key="documents-templates">Шаблоны</Menu.Item>
                <Menu.Item key="documents-signatures">Подписи</Menu.Item>
              </SubMenu>
              <SubMenu key="cycles-submenu" icon={<FolderOpenOutlined />} title="Бизнес-циклы">
                <Menu.Item key="cycles-expertise">Экспертиза</Menu.Item>
                <Menu.Item key="cycles-valuation">Оценка</Menu.Item>
                <Menu.Item key="cycles-legal">Юридические услуги</Menu.Item>
                <Menu.Item key="cycles-realty">Недвижимость</Menu.Item>
              </SubMenu>
              <SubMenu key="archive-submenu" icon={<FolderOpenOutlined />} title="Архив">
                <Menu.Item key="archive-documents">Документы</Menu.Item>
                <Menu.Item key="archive-media">Медиа</Menu.Item>
                <Menu.Item key="archive-history">История</Menu.Item>
                <Menu.Item key="archive-reestr">Реестр</Menu.Item>
              </SubMenu>
              <SubMenu key="finance-submenu" icon={<DollarOutlined />} title="Финансы">
                <Menu.Item key="finance-ofd">ОФД</Menu.Item>
                <Menu.Item key="finance-edo">ЭДО</Menu.Item>
                <Menu.Item key="finance-1c">1C</Menu.Item>
                <Menu.Item key="finance-banks">Банки</Menu.Item>
              </SubMenu>
              <SubMenu key="communication-submenu" icon={<MessageOutlined />} title="Omnichannel Связь">
                <Menu.Item key="omnichannel-telegram">Telegram</Menu.Item>
                <Menu.Item key="omnichannel-max">MAX</Menu.Item>
                <Menu.Item key="omnichannel-bip">BIP</Menu.Item>
                <Menu.Item key="omnichannel-sms">SMS</Menu.Item>
                <Menu.Item key="omnichannel-email">Email</Menu.Item>
                <Menu.Item key="omnichannel-calls">Звонки</Menu.Item>
              </SubMenu>
              <SubMenu key="reports-submenu" icon={<BarChartOutlined />} title="Отчеты">
                <Menu.Item key="reports-financial">Финансовые</Menu.Item>
                <Menu.Item key="reports-operational">Операционные</Menu.Item>
                <Menu.Item key="reports-analytics">Аналитика</Menu.Item>
              </SubMenu>
              <Menu.Item key="settings" icon={<SettingOutlined />}>
                Настройки
              </Menu.Item>
              <Menu.Item key="internal-chat" icon={<CommentOutlined />}>
                Внутренняя переписка
              </Menu.Item>
            </Menu>
          </div>
          <div
            style={{
              borderTop: '1px solid #555',
              padding: '8px 0',
              textAlign: 'center',
            }}
          >
            <Button
              type="text"
              icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setSiderCollapsed(!siderCollapsed)}
              style={{ color: 'rgba(255,255,255,0.85)' }}
            />
          </div>
        </Sider>
      )}
      <Drawer
        title="Экспертная Платформа"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" selectedKeys={[currentPage]} onClick={handleMenuClick} style={{ borderRight: 0, background: 'transparent' }}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Дашборд
          </Menu.Item>
          <SubMenu key="crm-submenu" icon={<UserOutlined />} title="CRM">
            <Menu.Item key="crm-clients">Клиенты</Menu.Item>
            <Menu.Item key="crm-deals">Сделки</Menu.Item>
            <Menu.Item key="crm-contacts">Контакты</Menu.Item>
            <Menu.Item key="crm-history">История</Menu.Item>
          </SubMenu>
          <SubMenu key="documents-submenu" icon={<FileTextOutlined />} title="Документооборот">
            <Menu.Item key="documents">Документы</Menu.Item>
            <Menu.Item key="documents-ocr">OCR</Menu.Item>
            <Menu.Item key="documents-templates">Шаблоны</Menu.Item>
            <Menu.Item key="documents-signatures">Подписи</Menu.Item>
          </SubMenu>
          <SubMenu key="cycles-submenu" icon={<FolderOpenOutlined />} title="Бизнес-циклы">
            <Menu.Item key="cycles-expertise">Экспертиза</Menu.Item>
            <Menu.Item key="cycles-valuation">Оценка</Menu.Item>
            <Menu.Item key="cycles-legal">Юридические услуги</Menu.Item>
            <Menu.Item key="cycles-realty">Недвижимость</Menu.Item>
          </SubMenu>
          <SubMenu key="archive-submenu" icon={<FolderOpenOutlined />} title="Архив">
            <Menu.Item key="archive-documents">Документы</Menu.Item>
            <Menu.Item key="archive-media">Медиа</Menu.Item>
            <Menu.Item key="archive-history">История</Menu.Item>
            <Menu.Item key="archive-reestr">Реестр</Menu.Item>
          </SubMenu>
          <SubMenu key="finance-submenu" icon={<DollarOutlined />} title="Финансы">
            <Menu.Item key="finance-ofd">ОФД</Menu.Item>
            <Menu.Item key="finance-edo">ЭДО</Menu.Item>
            <Menu.Item key="finance-1c">1C</Menu.Item>
            <Menu.Item key="finance-banks">Банки</Menu.Item>
          </SubMenu>
          <SubMenu key="communication-submenu" icon={<MessageOutlined />} title="Omnichannel Связь">
            <Menu.Item key="omnichannel-telegram">Telegram</Menu.Item>
            <Menu.Item key="omnichannel-max">MAX</Menu.Item>
            <Menu.Item key="omnichannel-bip">BIP</Menu.Item>
            <Menu.Item key="omnichannel-sms">SMS</Menu.Item>
            <Menu.Item key="omnichannel-email">Email</Menu.Item>
            <Menu.Item key="omnichannel-calls">Звонки</Menu.Item>
          </SubMenu>
          <SubMenu key="reports-submenu" icon={<BarChartOutlined />} title="Отчеты">
            <Menu.Item key="reports-financial">Финансовые</Menu.Item>
            <Menu.Item key="reports-operational">Операционные</Menu.Item>
            <Menu.Item key="reports-analytics">Аналитика</Menu.Item>
          </SubMenu>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Настройки
          </Menu.Item>
          <Menu.Item key="internal-chat" icon={<CommentOutlined />}>
            Внутренняя переписка
          </Menu.Item>
        </Menu>
      </Drawer>
      <Layout className="app-shell">
        <div>
          <Header
            className="app-header"
            style={{
              background: '#333333',
              padding: '0 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: 'none',
            }}
          >
            <Space size="middle">
              {isMobile && (
                <Button
                  type="text"
                  icon={<MenuUnfoldOutlined />}
                  onClick={() => setDrawerVisible(true)}
                  style={{ color: '#fff' }}
                />
              )}
              <Space size="middle">
                <span className="header-emblem" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                  </svg>
                </span>
                <span className="org-name">{ORG_NAME}</span>
                <Title level={5} className="header-page-title" style={{ margin: 0, color: '#ffffff', fontWeight: 400 }}>Главная панель управления</Title>
              </Space>
            </Space>
            <Space>
              <BellOutlined style={{ fontSize: 20, color: '#ffffff' }} />
              <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#111' }} />
            </Space>
          </Header>
          <div className="header-tricolor" aria-hidden="true">
            <span style={{ background: '#fff', width: '33.33%' }} />
            <span style={{ background: '#0039a6' }} />
            <span style={{ background: '#d52b1e' }} />
          </div>
        </div>
        <div className="app-main">
          {renderContent()}
          <Footer className="app-footer">
            <div className="footer-tricolor" aria-hidden="true">
              <span style={{ background: '#fff' }} />
              <span style={{ background: '#0039a6' }} />
              <span style={{ background: '#d52b1e' }} />
            </div>
            <div style={{ padding: '12px 0' }}>
              <strong>{ORG_NAME}</strong> — © 2026. Все права защищены. Соответствует ФЗ-152, ФЗ-73, ФЗ-135.
            </div>
          </Footer>
        </div>
      </Layout>
      <Drawer
        title="Меню"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" selectedKeys={[currentPage]} onClick={handleMenuClick} style={{ borderRight: 0, background: 'transparent' }} theme="dark">
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Дашборд
          </Menu.Item>
          <SubMenu key="crm-submenu" icon={<UserOutlined />} title="CRM">
            <Menu.Item key="crm-clients">Клиенты</Menu.Item>
            <Menu.Item key="crm-deals">Сделки</Menu.Item>
            <Menu.Item key="crm-contacts">Контакты</Menu.Item>
            <Menu.Item key="crm-history">История</Menu.Item>
          </SubMenu>
          <SubMenu key="documents-submenu" icon={<FileTextOutlined />} title="Документооборот">
            <Menu.Item key="documents">Документы</Menu.Item>
            <Menu.Item key="documents-ocr">OCR</Menu.Item>
            <Menu.Item key="documents-templates">Шаблоны</Menu.Item>
            <Menu.Item key="documents-signatures">Подписи</Menu.Item>
          </SubMenu>
          <SubMenu key="cycles-submenu" icon={<FolderOpenOutlined />} title="Бизнес-циклы">
            <Menu.Item key="cycles-expertise">Экспертиза</Menu.Item>
            <Menu.Item key="cycles-valuation">Оценка</Menu.Item>
            <Menu.Item key="cycles-legal">Юридические услуги</Menu.Item>
            <Menu.Item key="cycles-realty">Недвижимость</Menu.Item>
          </SubMenu>
          <SubMenu key="archive-submenu" icon={<FolderOpenOutlined />} title="Архив">
            <Menu.Item key="archive-documents">Документы</Menu.Item>
            <Menu.Item key="archive-media">Медиа</Menu.Item>
            <Menu.Item key="archive-history">История</Menu.Item>
            <Menu.Item key="archive-reestr">Реестр</Menu.Item>
          </SubMenu>
          <SubMenu key="finance-submenu" icon={<DollarOutlined />} title="Финансы">
            <Menu.Item key="finance-ofd">ОФД</Menu.Item>
            <Menu.Item key="finance-edo">ЭДО</Menu.Item>
            <Menu.Item key="finance-1c">1C</Menu.Item>
            <Menu.Item key="finance-banks">Банки</Menu.Item>
          </SubMenu>
          <SubMenu key="communication-submenu" icon={<MessageOutlined />} title="Omnichannel Связь">
            <Menu.Item key="omnichannel-telegram">Telegram</Menu.Item>
            <Menu.Item key="omnichannel-max">MAX</Menu.Item>
            <Menu.Item key="omnichannel-bip">BIP</Menu.Item>
            <Menu.Item key="omnichannel-sms">SMS</Menu.Item>
            <Menu.Item key="omnichannel-email">Email</Menu.Item>
            <Menu.Item key="omnichannel-calls">Звонки</Menu.Item>
          </SubMenu>
          <SubMenu key="reports-submenu" icon={<BarChartOutlined />} title="Отчеты">
            <Menu.Item key="reports-financial">Финансовые</Menu.Item>
            <Menu.Item key="reports-operational">Операционные</Menu.Item>
            <Menu.Item key="reports-analytics">Аналитика</Menu.Item>
          </SubMenu>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Настройки
          </Menu.Item>
          <Menu.Item key="internal-chat" icon={<CommentOutlined />}>
            Внутренняя переписка
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
}

export default App;
