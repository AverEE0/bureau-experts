import React, { useState } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Upload,
  Typography,
  Space,
  Table,
  Tag,
  Select,
} from 'antd';
import { UploadOutlined, FileTextOutlined, ScanOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const initialDocs = [
  {
    id: '1',
    filename: 'Договор №15-ЭО.pdf',
    type: 'Договор',
    client: 'ООО "Ромашка"',
    status: 'Распознан',
    createdAt: '12.01.2026',
  },
  {
    id: '2',
    filename: 'Отчет_оценка_квартира_Иванов.pdf',
    type: 'Отчет об оценке',
    client: 'Иванов Иван Иванович',
    status: 'Классифицирован',
    createdAt: '10.01.2026',
  },
  {
    id: '3',
    filename: 'Заключение_судебного_эксперта_дело_4573.pdf',
    type: 'Заключение судебного эксперта',
    client: 'Арбитражный суд',
    status: 'В обработке',
    createdAt: '08.01.2026',
  },
];

const Documents = () => {
  const [docs, setDocs] = useState(initialDocs);
  const [uploadingType, setUploadingType] = useState('Договор');

  const handleBeforeUpload = (file) => {
    const newDoc = {
      id: String(Date.now()),
      filename: file.name,
      type: uploadingType,
      client: 'Не назначен',
      status: 'Загружен',
      createdAt: new Date().toLocaleDateString('ru-RU'),
    };
    setDocs((prev) => [newDoc, ...prev]);
    return false; // не отправляем файл на сервер
  };

  const handleClassifyAll = () => {
    setDocs((prev) =>
      prev.map((d) =>
        d.status === 'Загружен'
          ? { ...d, status: 'Классифицирован' }
          : d,
      ),
    );
  };

  const handleOcrAll = () => {
    setDocs((prev) =>
      prev.map((d) =>
        d.status === 'Классифицирован'
          ? { ...d, status: 'Распознан' }
          : d,
      ),
    );
  };

  const columns = [
    {
      title: 'Файл',
      dataIndex: 'filename',
      key: 'filename',
      render: (value) => (
        <Space>
          <FileTextOutlined />
          <Text>{value}</Text>
        </Space>
      ),
    },
    {
      title: 'Тип документа',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Клиент / дело',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '#333333';
        if (status === 'Загружен') color = '#777777';
        if (status === 'Классифицирован') color = '#a48752';
        if (status === 'Распознан') color = '#28a745';
        if (status === 'В обработке') color = '#a48752';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Создан',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Title level={2}>Документооборот и распознавание</Title>
      <Text>
        Базовый модуль документооборота: загрузка сканов и PDF, фиксация типа документа и этапа обработки
        (загрузка → классификация → распознавание).
      </Text>

      <Row gutter={24} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col span={8}>
          <Card
            title="Загрузка документа"
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Выбрать файл</Button>
              </Upload>
              <Text type="secondary">Поддержка: PDF, JPG, PNG</Text>
              <div>
                <Text type="secondary">Тип документа по умолчанию:</Text>
                <br />
                <Select
                  value={uploadingType}
                  onChange={setUploadingType}
                  style={{ width: '100%', marginTop: 4 }}
                >
                  <Option value="Договор">Договор</Option>
                  <Option value="Счет">Счет</Option>
                  <Option value="Акт выполненных работ">Акт выполненных работ</Option>
                  <Option value="Отчет об оценке">Отчет об оценке</Option>
                  <Option value="Заключение эксперта">Заключение эксперта</Option>
                  <Option value="Заключение судебного эксперта">
                    Заключение судебного эксперта
                  </Option>
                </Select>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Классификация"
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Space direction="vertical" size="small">
              <Text>Типы документов:</Text>
              <Text>- Договор</Text>
              <Text>- Счет</Text>
              <Text>- Акт выполненных работ</Text>
              <Text>- Отчет об оценке</Text>
              <Text>- Заключение эксперта</Text>
              <Text>- Заключение судебного эксперта</Text>
            </Space>
            <Button
              type="primary"
              block
              style={{ marginTop: 16 }}
              onClick={handleClassifyAll}
            >
              Классифицировать загруженные
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="OCR Распознавание"
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Space direction="vertical" size="small">
              <Text>Извлечение структурированных данных:</Text>
              <Text>- Реквизиты</Text>
              <Text>- Адреса</Text>
              <Text>- Суммы</Text>
              <Text>- Объекты оценки</Text>
            </Space>
            <Button
              icon={<ScanOutlined />}
              block
              style={{ marginTop: 16 }}
              onClick={handleOcrAll}
            >
              Распознать классифицированные
            </Button>
          </Card>
        </Col>
      </Row>

      <Card title="Извлекаемые поля по типам документов" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={8}>
            <Text strong>Паспорт (место жительства)</Text>
            <br />
            <Text type="secondary">Регион, пункт, улица, дом, квартира, дата регистрации — для подстановки в отчёты и договоры.</Text>
          </Col>
          <Col span={8}>
            <Text strong>Выписка ЕГРН</Text>
            <br />
            <Text type="secondary">Кадастровый номер, адрес объекта, площадь (м²), назначение, год постройки — для отчётов об оценке.</Text>
          </Col>
          <Col span={8}>
            <Text strong>Договор / Счёт / Акт</Text>
            <br />
            <Text type="secondary">Номер, дата, стороны, реквизиты, суммы — для карточки дела и архива.</Text>
          </Col>
        </Row>
      </Card>

      <Card title="Журнал документов">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={docs}
          pagination={{ pageSize: 10, showSizeChanger: false }}
        />
      </Card>
    </Content>
  );
};

export default Documents;