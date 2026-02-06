import React from 'react';
import { Layout, Card, Row, Col, Button, Typography, Space, Table } from 'antd';
import { BarChartOutlined, DownloadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const Reports = () => {
  const columns = [
    { title: 'Тип отчета', dataIndex: 'type', key: 'type' },
    { title: 'Период', dataIndex: 'period', key: 'period' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Действия', key: 'actions', render: () => <Button icon={<DownloadOutlined />} type="link">Скачать</Button> },
  ];

  const data = [
    { key: '1', type: 'Финансовый отчет', period: 'Январь 2026', status: 'Готов' },
    { key: '2', type: 'Отчет по делам', period: 'Февраль 2026', status: 'В обработке' },
    { key: '3', type: 'Аналитика клиентов', period: 'Март 2026', status: 'Готов' },
  ];

  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Отчеты</Title>
      <Text>Генерация отчетов по бизнес-процессам, клиентам, финансам и архиву.</Text>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Доступные отчеты" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>- Финансовые отчеты</Text>
              <Text>- Аналитика по делам</Text>
              <Text>- Статистика клиентов</Text>
              <Text>- Архивные сводки</Text>
              <Button type="primary" block icon={<BarChartOutlined />}>Создать отчет</Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Недавние отчеты" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Reports;