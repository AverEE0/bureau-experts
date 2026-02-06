import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Timeline, Button, Space } from 'antd';
import { HistoryOutlined, ClockCircleOutlined, FileTextOutlined, UserOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function ArchiveHistory() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>История Архива</Title>
      <Paragraph>
        Аудит и история всех операций с архивными документами. Отслеживание изменений, доступов и модификаций.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Операций" value={23400} prefix={<HistoryOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="За месяц" value={1200} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Пользователей" value={45} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Изменений" value={5600} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы операций" bordered={false}>
            <List
              dataSource={[
                'Загрузка новых документов',
                'Просмотр и скачивание',
                'Редактирование и обновление',
                'Удаление и архивирование',
                'Изменение прав доступа',
                'Создание резервных копий'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Пример истории документа" bordered={false}>
            <Timeline>
              <Timeline.Item>01.01.2026 - Создан отчет об экспертизе</Timeline.Item>
              <Timeline.Item>05.01.2026 - Просмотрен экспертом Ивановым</Timeline.Item>
              <Timeline.Item>10.01.2026 - Обновлена версия документа</Timeline.Item>
              <Timeline.Item>15.01.2026 - Подписан электронной подписью</Timeline.Item>
              <Timeline.Item>20.01.2026 - Отправлен клиенту по email</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Исторические действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<FilterOutlined />}>
                Фильтр истории
              </Button>
              <Button icon={<UserOutlined />}>
                Поиск по пользователю
              </Button>
              <Button icon={<DownloadOutlined />}>
                Экспорт логов
              </Button>
              <Button>
                Аудит доступа
              </Button>
              <Button>
                Статистика
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ArchiveHistory;