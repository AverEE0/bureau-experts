import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import { Layout, Menu, Space, Drawer, Button, Badge, Alert } from 'antd';
import { getServerConnection, isOfflineFallback } from './api';
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
  LogoutOutlined,
  IdcardOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import logoBuro from './assets/logo-buro.png';
import Dashboard from './pages/Dashboard';
import PersonalCabinet from './pages/PersonalCabinet.js';
import Admin from './pages/Admin';
import Clients from './pages/Clients';
import ClientCard from './pages/ClientCard';
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

// Базовый путь для GitHub Pages (например /bureau-experts)
const getBasePath = () => {
  try {
    const url = process.env.PUBLIC_URL || '';
    if (!url) return '';
    const path = url.startsWith('http') ? new URL(url).pathname : url;
    return path.replace(/\/$/, '') || '';
  } catch {
    return '';
  }
};
const BASE_PATH = getBasePath();

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
  '/cabinet': 'cabinet',
  '/admin': 'admin',
};
const { SubMenu } = Menu;

const ORG_NAME = 'СЭЦ «БЮРО ЭКСПЕРТОВ»';

function App({ user = null, onLogout = () => {} }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentClientId, setCurrentClientId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [serverOffline, setServerOffline] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const syncPageFromUrl = () => {
    let path = window.location.pathname;
    if (BASE_PATH && path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length);
    path = path.replace(/\/$/, '') || '/';
    const clientMatch = path.match(/^\/crm\/clients\/(\d+)$/);
    if (clientMatch) {
      setCurrentPage('client-card');
      setCurrentClientId(Number(clientMatch[1]));
      return;
    }
    const page = PATH_TO_PAGE[path];
    setCurrentPage(page || 'notfound');
    setCurrentClientId(null);
  };

  useEffect(() => {
    syncPageFromUrl();
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', syncPageFromUrl);
    return () => window.removeEventListener('popstate', syncPageFromUrl);
  }, []);

  const PAGE_TO_PATH = {
    dashboard: '/',
    'crm-clients': '/crm/clients',
    'crm-deals': '/crm/deals',
    'crm-contacts': '/crm/contacts',
    'crm-history': '/crm/history',
    documents: '/documents',
    'documents-ocr': '/documents/ocr',
    'documents-templates': '/documents/templates',
    'documents-signatures': '/documents/signatures',
    'cycles-expertise': '/cycles/expertise',
    'cycles-valuation': '/cycles/valuation',
    'cycles-legal': '/cycles/legal',
    'cycles-realty': '/cycles/realty',
    'archive-documents': '/archive/documents',
    'archive-media': '/archive/media',
    'archive-history': '/archive/history',
    'archive-reestr': '/archive/reestr',
    'finance-ofd': '/finance/ofd',
    'finance-edo': '/finance/edo',
    'finance-1c': '/finance/1c',
    'finance-banks': '/finance/banks',
    'omnichannel-telegram': '/omnichannel/telegram',
    'omnichannel-max': '/omnichannel/max',
    'omnichannel-bip': '/omnichannel/bip',
    'omnichannel-sms': '/omnichannel/sms',
    'omnichannel-email': '/omnichannel/email',
    'omnichannel-calls': '/omnichannel/calls',
    'reports-financial': '/reports/financial',
    'reports-operational': '/reports/operational',
    'reports-analytics': '/reports/analytics',
    settings: '/settings',
    'internal-chat': '/internal-chat',
    cabinet: '/cabinet',
    admin: '/admin',
  };

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const r = await (await import('./api')).default.getUnreadCount();
        setUnreadCount(r.count || 0);
      } catch (_) {}
    };
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, [user]);

  // Проверка доступности сервера при режиме «общая база»
  useEffect(() => {
    const check = async () => {
      const { useServer, serverUrl } = getServerConnection();
      if (!useServer || !(serverUrl || '').trim()) {
        setServerOffline(false);
        return;
      }
      const url = serverUrl.trim().replace(/\/+$/, '');
      try {
        const res = await fetch(`${url}/api/auth/me`, { method: 'GET' });
        setServerOffline(!(res.ok || res.status === 401));
      } catch (_) {
        setServerOffline(true);
      }
    };
    check();
    const t = setInterval(check, 30000);
    return () => clearInterval(t);
  }, []);

  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
    if (isMobile) setDrawerVisible(false);
    const path = PAGE_TO_PATH[e.key];
    if (path !== undefined && window.history.pushState) {
      const fullPath = BASE_PATH + (path === '/' ? '' : path) || BASE_PATH || '/';
      window.history.pushState({}, '', fullPath);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} onOpenCard={(id) => { setCurrentClientId(id); setCurrentPage('client-card'); const path = BASE_PATH + `/crm/clients/${id}`; if (window.history.pushState) window.history.pushState({}, '', path); }} />;
      case 'client-card':
        return (
          <ClientCard
            clientId={currentClientId}
            onClose={() => {
              setCurrentPage('crm-clients');
              setCurrentClientId(null);
              const path = (BASE_PATH || '') + '/crm/clients';
              if (window.history.pushState) window.history.pushState({}, '', path);
            }}
          />
        );
      case 'crm-clients':
        return (
          <Clients
            onOpenCard={(id) => {
              setCurrentClientId(id);
              setCurrentPage('client-card');
              const path = BASE_PATH + `/crm/clients/${id}`;
              if (window.history.pushState) window.history.pushState({}, '', path);
            }}
            onNavigate={setCurrentPage}
          />
        );
      case 'crm-deals':
        return <Deals user={user} />;
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
        return <Clients defaultTab="reestr" onOpenCard={(id) => { setCurrentClientId(id); setCurrentPage('client-card'); }} onNavigate={setCurrentPage} />;
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
        return <InternalChat user={user} />;
      case 'cabinet':
        return <PersonalCabinet user={user} />;
      case 'admin':
        return <Admin user={user} />;
      case 'notfound':
        return <NotFound onGoHome={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden', background: '#e9e9e9' }}>
      {!isMobile && (
        <Sider
          className="app-sider-fixed"
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
              background: '#ffffff',
              borderBottom: '1px solid #e8e8e8',
              padding: siderCollapsed ? '0 8px' : '0 12px',
              boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
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
              <Menu.Item key="cabinet" icon={<IdcardOutlined />}>
                Личный кабинет
              </Menu.Item>
              <SubMenu key="crm-submenu" icon={<UserOutlined />} title="CRM">
                <Menu.Item key="crm-clients">Клиенты и реестр</Menu.Item>
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
                <Menu.Item key="archive-reestr">Реестр дел</Menu.Item>
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
              {user?.role === 'admin' && (
                <Menu.Item key="admin" icon={<TeamOutlined />}>
                  Администрирование
                </Menu.Item>
              )}
              <Menu.Item key="internal-chat" icon={<CommentOutlined />}>
                Внутренняя переписка
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
                Выйти
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
        title="Меню"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        bodyStyle={{ padding: 0, background: '#404040' }}
        styles={{ body: { background: '#404040' } }}
      >
        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          onClick={handleMenuClick}
          style={{ borderRight: 0, background: '#404040' }}
          theme="dark"
          defaultOpenKeys={isMobile ? ['crm-submenu', 'documents-submenu', 'cycles-submenu', 'archive-submenu', 'finance-submenu', 'communication-submenu', 'reports-submenu'] : undefined}
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Дашборд
          </Menu.Item>
          <Menu.Item key="cabinet" icon={<IdcardOutlined />}>
            Личный кабинет
          </Menu.Item>
          <SubMenu key="crm-submenu" icon={<UserOutlined />} title="CRM">
            <Menu.Item key="crm-clients">Клиенты и реестр</Menu.Item>
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
            <Menu.Item key="archive-reestr">Реестр дел</Menu.Item>
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
          {user?.role === 'admin' && (
            <Menu.Item key="admin" icon={<TeamOutlined />}>
              Администрирование
            </Menu.Item>
          )}
          <Menu.Item key="internal-chat" icon={<CommentOutlined />}>
            Внутренняя переписка
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
            Выйти
          </Menu.Item>
        </Menu>
      </Drawer>
      <Layout className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="app-header-wrap" style={{ flex: '0 0 auto' }}>
          <Header
            className="app-header"
            style={{
              position: 'relative',
              background: '#ffffff',
              padding: '0 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ width: 120, display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <Button
                  type="text"
                  icon={<MenuUnfoldOutlined />}
                  onClick={() => setDrawerVisible(true)}
                  className="header-icon-dark"
                />
              )}
            </div>
            <div className="header-title-center">
              <img src={`${process.env.PUBLIC_URL || ''}/emblem.png`} alt="" className="header-emblem-img" />
              <span className="header-org-full">СУДЕБНО-ЭКСПЕРТНЫЙ ЦЕНТР «БЮРО ЭКСПЕРТОВ»</span>
              <img src={`${process.env.PUBLIC_URL || ''}/emblem.png`} alt="" className="header-emblem-img" />
            </div>
            <Space size="small" className="header-right-block" style={{ flexShrink: 0, gap: 4 }}>
              <Badge count={unreadCount} size="small">
                <BellOutlined className="header-icon-dark" style={{ fontSize: 20 }} />
              </Badge>
              <span className="header-user-name" style={{ fontSize: 13, color: '#333' }}>{user?.full_name || user?.email}</span>
              <Button type="primary" size="small" className="header-logout-btn" icon={<LogoutOutlined />} onClick={onLogout}>Выйти</Button>
            </Space>
          </Header>
        </div>
        <div className="app-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div className="app-content" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            {(serverOffline || isOfflineFallback()) && (
              <Alert
                type="warning"
                showIcon
                message="Работа в локальном режиме"
                description="Связь с сервером недоступна. Данные сохраняются локально и будут синхронизированы при появлении связи."
                style={{ margin: 8, marginBottom: 0 }}
              />
            )}
            {renderContent()}
          </div>
        </div>
      </Layout>
      <Footer className="app-footer">
        <div className="footer-tricolor" aria-hidden="true">
          <span style={{ background: '#fff' }} />
          <span style={{ background: '#0039a6' }} />
          <span style={{ background: '#d52b1e' }} />
        </div>
        <div className="app-footer-text">
          <strong>{ORG_NAME}</strong> — © 2026. Все права защищены. Соответствует ФЗ-152, ФЗ-73, ФЗ-135.
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
