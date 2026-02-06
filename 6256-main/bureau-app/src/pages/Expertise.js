import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  List,
  Form,
  Input,
  Select,
  Switch,
  message,
} from 'antd';
import {
  ExperimentOutlined,
  FileSearchOutlined,
  PlusOutlined,
  FileImageOutlined,
  SafetyOutlined,
  BankOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const EXPERTISE_TYPES = [
  'Товароведческая',
  'Строительно-техническая',
  'Землеустроительная',
  'Судебно-бухгалтерская',
  'Почерковедческая',
  'Строительная',
  'Оценочная (в рамках дела)',
];

function Expertise() {
  const [isCourtCase, setIsCourtCase] = useState(false);
  const [form] = Form.useForm();

  return (
    <div
      style={{
        padding: 24,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Title level={2}>
        <ExperimentOutlined style={{ marginRight: 8 }} />
        Судебная экспертиза
      </Title>
      <Paragraph>
        Цикл: Запрос → Договор → Счёт → Заключение судебного эксперта → Акт выполненных работ → Архив.
        Интеграция с ГАС «Правосудие». Автоматическая подстановка актуального законодательства (ФЗ-73 и др.) на дату составления; версионность норм.
      </Paragraph>

      <Card title="Судебное дело" style={{ marginTop: 24 }} size="small">
        <Form form={form} layout="vertical" style={{ maxWidth: 560 }}>
          <Form.Item label="Дело судебное?" name="courtCase" valuePropName="checked">
            <Switch
              checked={isCourtCase}
              onChange={setIsCourtCase}
              checkedChildren="Да"
              unCheckedChildren="Нет"
            />
          </Form.Item>
          {isCourtCase && (
            <>
              <Form.Item
                name="expertiseType"
                label="Вид экспертизы"
                rules={[{ required: true, message: 'Выберите вид экспертизы' }]}
              >
                <Select placeholder="Выберите вид экспертизы" allowClear>
                  {EXPERTISE_TYPES.map((t) => (
                    <Option key={t} value={t}>{t}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="caseNumber"
                label="Номер судебного дела"
                rules={[{ required: true, message: 'Укажите номер дела' }]}
              >
                <Input placeholder="Например: 2-1234/2025, А40-123456/2025" />
              </Form.Item>
            </>
          )}
        </Form>
      </Card>

      <Card
        title={
          <Space>
            <LinkOutlined />
            Синхронизация с судебными системами
          </Space>
        }
        style={{ marginTop: 16 }}
        size="small"
      >
        <Paragraph type="secondary" style={{ marginBottom: 12 }}>
          Дела синхронизируются с ГАС «Правосудие», судами общей юрисдикции, арбитражными судами (Мой Арбитр, Картотека арбитражных дел) и др. — статусы, реквизиты дела и стороны подтягиваются в карточку экспертизы.
        </Paragraph>
        <Space wrap>
          <Text><BankOutlined /> ГАС «Правосудие»</Text>
          <Text>Мой Арбитр</Text>
          <Text>Картотека арбитражных дел</Text>
          <Text>Суды общей юрисдикции</Text>
        </Space>
        <div style={{ marginTop: 12 }}>
          <Button type="primary" size="small" onClick={() => message.success('Данные обновлены из ГАС «Правосудие»')}>Обновить из ГАС «Правосудие»</Button>
          <Button size="small" style={{ marginLeft: 8 }} onClick={() => message.info('Синхронизация с Мой Арбитр настраивается в интеграциях')}>Синхронизировать с Мой Арбитр</Button>
        </div>
      </Card>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Заключение судебного эксперта" size="small">
            <List
              dataSource={[
                'Вставка фото в заключение: 2–3 фото в строку на лист А4, компактно',
                'Подстановка законодательства РФ по поставленным вопросам',
                'Версионность: фиксация норм на дату составления',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Виды экспертиз (ТЗ)" size="small">
            <List
              dataSource={EXPERTISE_TYPES.slice(0, 4)}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Законодательство и СРО" style={{ marginTop: 16 }} size="small">
        <Space wrap>
          <Text><SafetyOutlined /> ФЗ-73, ФЗ-135</Text>
          <Text>Методические рекомендации</Text>
          <Text>СРО и законодательство РФ — для подстановки в заключения</Text>
        </Space>
      </Card>

      <Card title="Действия" style={{ marginTop: 24 }}>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => message.success('Создание новой экспертизы: заполните вид и номер дела выше')}>Новая экспертиза</Button>
          <Button icon={<FileImageOutlined />} onClick={() => message.info('Шаблон заключения с фото — в разделе «Шаблоны»')}>Заключение с фото (2–3 в строку)</Button>
          <Button icon={<FileSearchOutlined />} onClick={() => message.success('Законодательство подставляется при сохранении заключения')}>Подставить законодательство</Button>
          <Button onClick={() => message.info('Перемещение в архив в карточке дела')}>В архив</Button>
        </Space>
      </Card>
    </div>
  );
}

export default Expertise;
