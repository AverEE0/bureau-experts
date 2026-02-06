import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { FolderOpenOutlined, FileTextOutlined, DatabaseOutlined, SearchOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function ArchiveDocs() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Архив Документов</Title>
      <Paragraph>
        Централизованное хранение и управление документами. Быстрый поиск, версионирование, безопасность данных.
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

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Архивные действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<UploadOutlined />}>
                Загрузить документ
              </Button>
              <Button icon={<SearchOutlined />}>
                Поиск в архиве
              </Button>
              <Button icon={<DownloadOutlined />}>
                Скачать
              </Button>
              <Button>
                Создать папку
              </Button>
              <Button>
                Версионирование
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ArchiveDocs;