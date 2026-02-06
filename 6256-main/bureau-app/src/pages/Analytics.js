import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space, message } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, AreaChartOutlined, SettingOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Analytics() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Аналитические Отчеты</Title>
      <Paragraph>
        Глубокий анализ данных бюро экспертов. Тренды, прогнозы, инсайты для принятия управленческих решений.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Дашбордов" value={15} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Метрик" value={120} prefix={<LineChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Прогнозов" value={8} prefix={<AreaChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Инсайтов" value={45} prefix={<PieChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Аналитические инструменты" bordered={false}>
            <List
              dataSource={[
                'Динамика продаж по периодам',
                'Анализ клиентской базы',
                'Эффективность маркетинговых каналов',
                'Прогнозная аналитика',
                'Сравнительный анализ конкурентов',
                'Анализ рисков и возможностей'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Типы аналитики" bordered={false}>
            <List
              dataSource={[
                'Дескриптивная аналитика',
                'Диагностическая аналитика',
                'Прогнозная аналитика',
                'Предписывающая аналитика',
                'Визуализация данных',
                'Машинное обучение'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Аналитические действия" bordered={false}>
            <Space wrap>
              <Button type="primary" icon={<BarChartOutlined />} onClick={() => message.success('Дашборд создан. Настройте виджеты в настройках.')}>Создать дашборд</Button>
              <Button icon={<EyeOutlined />} onClick={() => message.info('Просмотр на главной панели и в отчётах')}>Просмотр аналитики</Button>
              <Button icon={<LineChartOutlined />} onClick={() => message.success('Тренды отображаются в блоке «Динамика доходов»')}>Тренды</Button>
              <Button icon={<SettingOutlined />} onClick={() => message.info('Настройки аналитики в разделе «Настройки»')}>Настройки</Button>
              <Button onClick={() => message.success('Экспорт данных в CSV/Excel доступен в отчётах')}>Экспорт данных</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;