import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space, message } from 'antd';
import { DollarOutlined, BarChartOutlined, PieChartOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function FinancialReports() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Финансовые Отчеты</Title>
      <Paragraph>
        Комплексная финансовая аналитика бюро экспертов. Доходы, расходы, прибыльность, бюджетирование.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Выручка" value={25000000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Прибыль" value={8500000} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Рентабельность" value={34} suffix="%" prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Отчетов" value={120} prefix={<PieChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Виды отчетов" bordered={false}>
            <List
              dataSource={[
                'Отчет о прибылях и убытках',
                'Балансовый отчет',
                'Отчет о движении денежных средств',
                'Анализ доходов по услугам',
                'Бюджетное планирование',
                'Налоговые отчеты'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Финансовые показатели" bordered={false}>
            <Paragraph>Структура доходов:</Paragraph>
            <Progress percent={45} status="active" format={() => 'Экспертиза 45%'} />
            <Progress percent={30} status="active" format={() => 'Оценка 30%'} />
            <Progress percent={15} status="active" format={() => 'Консультации 15%'} />
            <Progress percent={10} status="active" format={() => 'Другое 10%'} />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Финансовые отчеты" bordered={false}>
            <Space wrap>
              <Button type="primary" icon={<BarChartOutlined />} onClick={() => message.success('Отчёт формируется. Доступен в списке отчётов.')}>Сформировать отчет</Button>
              <Button icon={<EyeOutlined />} onClick={() => message.info('Список отчётов и просмотр — в разделе «Операционные отчёты»')}>Просмотр отчетов</Button>
              <Button icon={<DownloadOutlined />} onClick={() => message.success('Экспорт в Excel/PDF доступен в карточке отчёта')}>Экспорт</Button>
              <Button onClick={() => message.info('Бюджетирование настраивается в разделе «Настройки»')}>Бюджетирование</Button>
              <Button onClick={() => message.success('Аналитика в разделе «Аналитика»')}>Анализ</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FinancialReports;