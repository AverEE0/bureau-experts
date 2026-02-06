import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  List,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
} from 'antd';
import {
  FileTextOutlined,
  FormOutlined,
  PlusOutlined,
  EditOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { api } from '../api';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const INITIAL_TEMPLATES = [
  {
    key: 'kvartira',
    name: 'Отчёт об оценке — квартира',
    file: 'шаблон_квартира.docx',
    description: 'Шаблон отчёта об оценке квартиры. Поля для подстановки из CRM/ЕГРН (выделены в шаблоне). Даты — текущая с возможностью ручной замены.',
  },
  {
    key: 'dom',
    name: 'Отчёт об оценке — дом',
    file: 'шаблон_дом.docx',
    description: 'Шаблон отчёта об оценке жилого дома. Аналоги, реквизиты, фото 2–3 в строку на лист А4.',
  },
  {
    key: 'ts',
    name: 'Отчёт об оценке — ТС (транспорт)',
    file: 'шаблон_ТС_AL.docx',
    description: 'Оценка транспортного средства. Полный и краткий (ТС_краткий) варианты.',
  },
  {
    key: 'dogovor',
    name: 'Договор на оценку',
    file: 'Договор_БЭ_№ оценка.docx',
    description: 'Договор Бюро экспертов на проведение оценки. Подстановка данных заказчика и объекта.',
  },
  {
    key: 'akt',
    name: 'Акт приема-передачи',
    file: 'АКТ приема-передачи.docx',
    description: 'Акт приема-передачи документов/материалов по делу.',
  },
  {
    key: 'schet',
    name: 'Счет и Акт выполненных работ',
    description: 'Счёт (№ 101 и др.) и Акт выполненных работ — генерация из данных дела и CRM.',
  },
];

function downloadBlob(content, filename, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Templates() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createTemplateKey, setCreateTemplateKey] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [deals, setDeals] = useState([]);
  const [dealsLoading, setDealsLoading] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const selectedTemplate = createTemplateKey
    ? templates.find((t) => t.key === createTemplateKey)
    : null;

  useEffect(() => {
    if (createModalVisible) {
      setDealsLoading(true);
      api
        .getDeals()
        .then((data) => setDeals(Array.isArray(data) ? data : []))
        .catch(() => setDeals([]))
        .finally(() => setDealsLoading(false));
    }
  }, [createModalVisible]);

  const openCreateModal = (item) => {
    setCreateTemplateKey(item.key);
    setCreateModalVisible(true);
    const today = new Date().toISOString().slice(0, 10);
    createForm.setFieldsValue({
      deal_id: undefined,
      client_name: '',
      object_address: '',
      date: today,
      note: '',
    });
  };

  const handleCreateDocument = () => {
    createForm.validateFields().then((values) => {
      const t = selectedTemplate;
      const deal = values.deal_id ? deals.find((d) => String(d.id) === String(values.deal_id)) : null;
      const clientName = values.client_name || (deal && deal.client_name) || '—';
      const content = [
        `Документ по шаблону: ${t ? t.name : ''}`,
        `Файл шаблона: ${t && t.file ? t.file : '—'}`,
        '',
        '--- Подставленные данные ---',
        `Заказчик: ${clientName}`,
        `Адрес объекта: ${values.object_address || '—'}`,
        `Дата: ${values.date || '—'}`,
        values.note ? `Примечание: ${values.note}` : '',
        '',
        'Сгенерировано в СЭЦ «БЮРО ЭКСПЕРТОВ».',
      ].filter(Boolean).join('\n');

      const safeName = (t && t.file ? t.file.replace(/\.docx?$/i, '') : t ? t.key : 'document') + '_черновик.txt';
      downloadBlob(content, safeName);
      message.success('Черновик документа создан и скачан');
      setCreateModalVisible(false);
      setCreateTemplateKey(null);
      createForm.resetFields();
    }).catch(() => {});
  };

  const openEditModal = (item) => {
    setEditingKey(item.key);
    setEditModalVisible(true);
    editForm.setFieldsValue({
      name: item.name,
      file: item.file || '',
      description: item.description || '',
    });
  };

  const handleEditSave = () => {
    editForm.validateFields().then((values) => {
      setTemplates((prev) =>
        prev.map((t) =>
          t.key === editingKey
            ? {
                ...t,
                name: values.name,
                file: values.file || undefined,
                description: values.description || '',
              }
            : t
        )
      );
      message.success('Изменения сохранены');
      setEditModalVisible(false);
      setEditingKey(null);
      editForm.resetFields();
    }).catch(() => {});
  };

  const handleDownloadTemplate = (item) => {
    const content = [
      `Шаблон: ${item.name}`,
      item.file ? `Имя файла: ${item.file}` : '',
      '',
      item.description || '',
      '',
      '---',
      'Для получения полного шаблона в формате .docx обратитесь к администратору или загрузите файл в раздел «Документы».',
    ].filter(Boolean).join('\n');
    const filename = (item.file || item.key) + (item.file && /\.docx?$/i.test(item.file) ? '' : '.txt');
    downloadBlob(content, filename);
    message.success('Файл шаблона скачан');
  };

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
        <FormOutlined style={{ marginRight: 8 }} />
        Шаблоны документов
      </Title>
      <Paragraph>
        Библиотека шаблонов по переписке и ТЗ: отчёты об оценке (квартира, дом, ТС), выписки, договоры, акты.
        Поля, выделенные в шаблоне (жёлтым/красным), заполняются из CRM или извлекаются из документов; даты — автоматически текущая с возможностью замены.
      </Paragraph>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col xs={24} md={14}>
          <div className="templates-list">
            {templates.map((item) => (
              <div key={item.key} className="templates-list-item">
                <div className="templates-list-item-content">
                  <FileTextOutlined className="templates-list-item-icon" />
                  <div className="templates-list-item-text">
                    <div className="templates-list-item-title">
                      <Text strong>{item.name}</Text>
                      {item.file && <Tag className="templates-list-item-tag">{item.file}</Tag>}
                    </div>
                    <Paragraph type="secondary" className="templates-list-item-desc">
                      {item.description}
                    </Paragraph>
                  </div>
                </div>
                <Space size="small" wrap className="templates-list-item-actions">
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => openCreateModal(item)}
                  >
                    Создать документ
                  </Button>
                  <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(item)}>
                    Редактировать
                  </Button>
                  {item.file && (
                    <Button
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadTemplate(item)}
                    >
                      Скачать шаблон
                    </Button>
                  )}
                </Space>
              </div>
            ))}
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Card title="Поля для подстановки" size="small">
            <Paragraph type="secondary">
              В шаблонах выделены поля для извлечения или ручного ввода:
            </Paragraph>
            <List
              size="small"
              dataSource={[
                'ФИО / наименование заказчика',
                'ИНН, ОГРН, адрес',
                'Адрес и кадастровый номер объекта',
                'Площади, характеристики',
                'Дата (по умолчанию — текущая, можно заменить)',
                'Реквизиты организации-исполнителя',
                'Фото: вставка 2–3 фото в строку на лист А4',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      {/* Модалка: Создать документ */}
      <Modal
        title={
          <Space>
            <PlusOutlined />
            Создать документ по шаблону
            {selectedTemplate && (
              <Tag color="blue">{selectedTemplate.name}</Tag>
            )}
          </Space>
        }
        open={createModalVisible}
        onOk={handleCreateDocument}
        onCancel={() => {
          setCreateModalVisible(false);
          setCreateTemplateKey(null);
          createForm.resetFields();
        }}
        okText="Создать и скачать черновик"
        cancelText="Отмена"
        width={520}
        destroyOnClose
      >
        <Spin spinning={dealsLoading} tip="Загрузка списка сделок...">
          <Form
            form={createForm}
            layout="vertical"
            style={{ marginTop: 16 }}
          >
            <Form.Item
              name="deal_id"
              label="Привязать к сделке"
              help="Если выбрано — заказчик подставится из сделки"
            >
              <Select
                placeholder="Без привязки"
                allowClear
                showSearch
                optionFilterProp="children"
                onChange={(value) => {
                  const deal = value ? deals.find((d) => String(d.id) === String(value)) : null;
                  createForm.setFieldValue('client_name', deal && deal.client_name ? deal.client_name : '');
                }}
              >
                {deals.map((d) => (
                  <Option key={d.id} value={String(d.id)}>
                    {d.client_name || `Сделка #${d.id}`} {d.stage ? ` — ${d.stage}` : ''}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="client_name" label="Заказчик (ФИО / наименование)">
              <Input placeholder="Заполнится из сделки или введите вручную" />
            </Form.Item>
            <Form.Item name="object_address" label="Адрес объекта">
              <Input placeholder="Адрес и/или кадастровый номер" />
            </Form.Item>
            <Form.Item name="date" label="Дата документа" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item name="note" label="Примечание">
              <TextArea rows={2} placeholder="Дополнительные данные для подстановки" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      {/* Модалка: Редактировать шаблон */}
      <Modal
        title="Редактировать шаблон"
        open={editModalVisible}
        onOk={handleEditSave}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingKey(null);
          editForm.resetFields();
        }}
        okText="Сохранить"
        cancelText="Отмена"
        width={520}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="Название шаблона"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder="Например: Отчёт об оценке — квартира" />
          </Form.Item>
          <Form.Item name="file" label="Имя файла (необязательно)">
            <Input placeholder="шаблон_квартира.docx" />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <TextArea rows={4} placeholder="Описание шаблона и полей для подстановки" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Templates;
