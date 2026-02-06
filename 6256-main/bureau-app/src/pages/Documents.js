import React, { useState, useEffect } from 'react';
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
  Select,
  message,
  Spin,
} from 'antd';
import { UploadOutlined, FileTextOutlined, ScanOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const defaultDocs = [
  { id: 1, name: 'Договор №15-ЭО.pdf', doc_type: 'Договор', created_at: '2026-01-12T10:00:00' },
  { id: 2, name: 'Отчет_оценка_квартира_Иванов.pdf', doc_type: 'Отчет об оценке', created_at: '2026-01-10T10:00:00' },
];

const formatDate = (v) => (v ? new Date(v).toLocaleDateString('ru-RU') : '—');

const Documents = () => {
  const [docs, setDocs] = useState(defaultDocs);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState('Договор');

  useEffect(() => {
    setLoading(true);
    api.getDocuments()
      .then((data) => setDocs(Array.isArray(data) ? data : []))
      .catch(() => {
        message.warning('Бэкенд недоступен. Показаны локальные данные.');
        setDocs(defaultDocs);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const newDoc = await api.uploadDocument(file, uploadingType);
      setDocs((prev) => [newDoc, ...prev]);
      message.success('Документ загружен');
    } catch (e) {
      message.error(e.message || 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
    return false; // prevent default upload
  };

  const [ocrLoadingId, setOcrLoadingId] = React.useState(null);

  const handleClassifyAll = () => message.info('Классификация выполняется на бэкенде (заглушка)');
  const handleOcrAll = () => message.info('Выберите документ и нажмите «Распознать» в строке');

  const handleOcr = (docId) => {
    setOcrLoadingId(docId);
    api.ocrDocument(docId)
      .then((r) => {
        setDocs((prev) => prev.map((d) => (d.id === docId ? { ...d, ocr_text: r.text } : d)));
        message.success(r.text ? `Распознано ${r.text.length} символов` : (r.message || 'Готово'));
      })
      .catch(() => message.error('Ошибка OCR'))
      .finally(() => setOcrLoadingId(null));
  };

  const columns = [
    {
      title: 'Файл',
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Space>
          <FileTextOutlined />
          <Text>{value}</Text>
        </Space>
      ),
    },
    { title: 'Тип документа', dataIndex: 'doc_type', key: 'doc_type' },
    { title: 'Примечание', dataIndex: 'note', key: 'note', render: (v) => v || '—' },
    { title: 'Загружен', dataIndex: 'created_at', key: 'created_at', render: formatDate },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" size="small" loading={ocrLoadingId === record.id} onClick={() => handleOcr(record.id)}>
          Распознать
        </Button>
      ),
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
              <Upload beforeUpload={handleUpload} showUploadList={false} disabled={uploading}>
                <Button icon={<UploadOutlined />} loading={uploading}>Выбрать файл и загрузить</Button>
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
        <Spin spinning={loading}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={docs}
            pagination={{ pageSize: 10, showSizeChanger: false }}
          />
        </Spin>
      </Card>
    </Content>
  );
};

export default Documents;