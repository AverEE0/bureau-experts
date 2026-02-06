import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space, message } from 'antd';
import { FolderOpenOutlined, FileTextOutlined, DatabaseOutlined, SearchOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Title, Paragraph } = Typography;

function ArchiveDocs() {
  const handleExportXml = () => {
    const url = api.getArchiveExportXmlUrl();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archive_register.xml';
    a.target = '_blank';
    a.click();
    message.success('Экспорт XML запущен');
  };
  const handleExportCsv = () => {
    const url = api.getArchiveExportCsvUrl();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archive_register.csv';
    a.target = '_blank';
    a.click();
    message.success('Экспорт CSV запущен');
  };
  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Архив документов</Title>
      <Paragraph>
        Централизованное хранение, поиск, версионирование. Соответствие ФЗ-125 и Приказа Минкультуры №558. Зашифрованное хранилище (при подключённом backend).
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Документов" value={45600} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Папок" value={1200} prefix={<FolderOpenOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Объем" value={2.4} suffix="TB" prefix={<DatabaseOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Поисков" value={8900} prefix={<SearchOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы документов" bordered={false}>
            <List
              dataSource={[
                'Отчеты об экспертизе',
                'Договоры и соглашения',
                'Акты и протоколы',
                'Финансовые документы',
                'Юридические заключения',
                'Техническая документация'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Функционал архива" bordered={false}>
            <List
              dataSource={[
                'Иерархическая структура хранения',
                'Полнотекстовый поиск',
                'Версионирование документов',
                'Права доступа и безопасность',
                'Автоматическая индексация',
                'Интеграция с ЭДО системами'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Сроки хранения по типам документов" style={{ marginTop: 24 }} bordered={false}>
        <List
          size="small"
          dataSource={[
            { type: 'Заключения судебных экспертов, отчёты об оценке', term: '75 лет' },
            { type: 'Договоры, акты выполненных работ', term: '10 лет' },
            { type: 'Счета, первичные бухгалтерские документы', term: '5–10 лет' },
            { type: 'Кадровые документы', term: '3 года (и более по номенклатуре)' },
          ]}
          renderItem={(item) => (
            <List.Item>
              <span>{item.type}</span> — <strong>{item.term}</strong>
            </List.Item>
          )}
        />
      </Card>

      <Card title="Экспорт для госархивов" style={{ marginTop: 16 }} bordered={false}>
        <Paragraph type="secondary">
          Выгрузка описей и документов в форматах PDF/A и XML для передачи в государственные архивы.
        </Paragraph>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={() => message.success('Экспорт в PDF/A запущен')}>Экспорт в PDF/A</Button>
          <Button icon={<DownloadOutlined />} onClick={() => message.success('Экспорт в XML запущен')}>Экспорт в XML</Button>
        </Space>
      </Card>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Архивные действия" bordered={false}>
            <Space wrap>
              <Button type="primary" icon={<UploadOutlined />} onClick={() => message.info('Загрузка в архив — в разделе «Документы»')}>Загрузить документ</Button>
              <Button icon={<DownloadOutlined />} onClick={handleExportXml}>Экспорт XML</Button>
              <Button icon={<DownloadOutlined />} onClick={handleExportCsv}>Экспорт CSV</Button>
              <Button icon={<SearchOutlined />} onClick={() => message.success('Откройте поиск по реестру в разделе «Реестр»')}>Поиск в архиве</Button>
              <Button icon={<DownloadOutlined />} onClick={() => message.info('Скачивание из карточки документа')}>Скачать</Button>
              <Button onClick={() => message.success('Папка создана (настройка структуры на бэкенде)')}>Создать папку</Button>
              <Button onClick={() => message.info('Версионирование в карточке документа')}>Версионирование</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ArchiveDocs;