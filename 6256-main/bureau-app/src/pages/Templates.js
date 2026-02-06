import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  List,
  Tag,
} from 'antd';
import {
  FileTextOutlined,
  FormOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const TEMPLATES = [
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

function Templates() {
  const [, setSelected] = useState(null);

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
        <Col span={14}>
          <List
            dataSource={TEMPLATES}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => setSelected(item.key)}
                  >
                    Создать документ
                  </Button>,
                  <Button size="small" icon={<EditOutlined />}>
                    Редактировать
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<FileTextOutlined style={{ fontSize: 24, color: '#a48752' }} />}
                  title={
                    <Space>
                      <Text strong>{item.name}</Text>
                      {item.file && <Tag>{item.file}</Tag>}
                    </Space>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={10}>
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
    </div>
  );
}

export default Templates;
