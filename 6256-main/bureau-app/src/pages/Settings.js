import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Button,
  Space,
  Divider,
  Select,
  Tabs,
} from 'antd';
import {
  BankOutlined,
  SafetyOutlined,
  BellOutlined,
  ApiOutlined,
  FileTextOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

function Settings() {
  const [form] = Form.useForm();
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyBrowser, setNotifyBrowser] = useState(true);
  const [gasEnabled, setGasEnabled] = useState(false);
  const [arbitrEnabled, setArbitrEnabled] = useState(false);
  const [ofdEnabled, setOfdEnabled] = useState(false);
  const [edoEnabled, setEdoEnabled] = useState(false);

  return (
    <div
      style={{
        padding: 24,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Title level={2}>Настройки</Title>
      <Paragraph type="secondary">
        Данные организации, безопасность, уведомления, интеграции и параметры по умолчанию.
      </Paragraph>

      <Tabs
        defaultActiveKey="org"
        style={{ marginTop: 24 }}
        items={[
          {
            key: 'org',
            label: (
              <span>
                <BankOutlined /> Данные организации
              </span>
            ),
            children: (
              <Card size="small">
                <Form form={form} layout="vertical" style={{ maxWidth: 560 }}>
                  <Form.Item name="orgName" label="Название организации">
                    <Input placeholder="СЭЦ «БЮРО ЭКСПЕРТОВ»" />
                  </Form.Item>
                  <Form.Item name="inn" label="ИНН">
                    <Input placeholder="7700123456" />
                  </Form.Item>
                  <Form.Item name="address" label="Юридический адрес">
                    <Input.TextArea rows={2} placeholder="г. Москва, ул. Примерная, д. 1" />
                  </Form.Item>
                  <Form.Item name="phone" label="Телефон">
                    <Input placeholder="+7 (495) 123-45-67" />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input placeholder="info@бюроэкспертов.рф" />
                  </Form.Item>
                  <Button type="primary">Сохранить</Button>
                </Form>
              </Card>
            ),
          },
          {
            key: 'security',
            label: (
              <span>
                <SafetyOutlined /> Безопасность
              </span>
            ),
            children: (
              <Card size="small">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Text strong>Смена пароля</Text>
                    <Paragraph type="secondary" style={{ margin: '4px 0 8px' }}>
                      Рекомендуется менять пароль не реже раза в квартал.
                    </Paragraph>
                    <Button>Сменить пароль</Button>
                  </div>
                  <Divider />
                  <div>
                    <Text strong>Двухфакторная аутентификация (2FA)</Text>
                    <Paragraph type="secondary" style={{ margin: '4px 0 8px' }}>
                      Подтверждение входа по коду из приложения или SMS.
                    </Paragraph>
                    <Switch checkedChildren="Вкл" unCheckedChildren="Выкл" />
                  </div>
                  <Divider />
                  <div>
                    <Text strong>Сессии</Text>
                    <Paragraph type="secondary" style={{ margin: '4px 0 8px' }}>
                      Время жизни сессии и выход со всех устройств.
                    </Paragraph>
                    <Button size="small">Завершить все сессии кроме текущей</Button>
                  </div>
                </Space>
              </Card>
            ),
          },
          {
            key: 'notify',
            label: (
              <span>
                <BellOutlined /> Уведомления
              </span>
            ),
            children: (
              <Card size="small">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 400 }}>
                    <span>Уведомления по email</span>
                    <Switch checked={notifyEmail} onChange={setNotifyEmail} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 400 }}>
                    <span>Уведомления в браузере (push)</span>
                    <Switch checked={notifyBrowser} onChange={setNotifyBrowser} />
                  </div>
                  <Paragraph type="secondary">
                    События: новые поручения, истекающие сроки, поступление документов из суда.
                  </Paragraph>
                  <Button type="primary">Сохранить</Button>
                </Space>
              </Card>
            ),
          },
          {
            key: 'integrations',
            label: (
              <span>
                <ApiOutlined /> Интеграции
              </span>
            ),
            children: (
              <Card size="small">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span><strong>ГАС «Правосудие»</strong> — синхронизация дел с судами</span>
                    <Switch checked={gasEnabled} onChange={setGasEnabled} />
                  </div>
                  {gasEnabled && (
                    <Input placeholder="Логин / токен (настройка при внедрении)" style={{ maxWidth: 400 }} />
                  )}
                  <Divider />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span><strong>Мой Арбитр / Картотека арбитражных дел</strong></span>
                    <Switch checked={arbitrEnabled} onChange={setArbitrEnabled} />
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span><strong>ОФД</strong> — онлайн-фискализация</span>
                    <Switch checked={ofdEnabled} onChange={setOfdEnabled} />
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span><strong>ЭДО</strong> — электронный документооборот</span>
                    <Switch checked={edoEnabled} onChange={setEdoEnabled} />
                  </div>
                  <Paragraph type="secondary">
                    1С, банки, мессенджеры настраиваются в соответствующих разделах (Финансы, Omnichannel).
                  </Paragraph>
                  <Button type="primary">Сохранить</Button>
                </Space>
              </Card>
            ),
          },
          {
            key: 'documents',
            label: (
              <span>
                <FileTextOutlined /> Документы
              </span>
            ),
            children: (
              <Card size="small">
                <Form layout="vertical" style={{ maxWidth: 560 }}>
                  <Form.Item name="docNumberPrefix" label="Префикс нумерации документов">
                    <Input placeholder="Например: БЭ-2025-" />
                  </Form.Item>
                  <Form.Item name="defaultTemplateFolder" label="Папка шаблонов по умолчанию">
                    <Input placeholder="Путь или URL" />
                  </Form.Item>
                  <Form.Item name="signatureProvider" label="Провайдер ЭП для подписей">
                    <Select placeholder="Выберите провайдера" allowClear>
                      <Option value="gosuslugi">Госуслуги (КЭП)</Option>
                      <Option value="other">Другой</Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary">Сохранить</Button>
                </Form>
              </Card>
            ),
          },
          {
            key: 'appearance',
            label: (
              <span>
                <GlobalOutlined /> Внешний вид
              </span>
            ),
            children: (
              <Card size="small">
                <Form layout="vertical" style={{ maxWidth: 560 }}>
                  <Form.Item name="language" label="Язык интерфейса">
                    <Select defaultValue="ru" style={{ width: 200 }}>
                      <Option value="ru">Русский</Option>
                      <Option value="en">English</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="theme" label="Тема">
                    <Select defaultValue="light" style={{ width: 200 }}>
                      <Option value="light">Светлая</Option>
                      <Option value="dark">Тёмная</Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary">Сохранить</Button>
                </Form>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Settings;
