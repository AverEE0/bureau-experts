import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress } from 'antd';
import { SettingOutlined, ClockCircleOutlined, CheckCircleOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function OperationalReports() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Операционные Отчеты</Title>
      <Paragraph>
        Анализ операционной деятельности бюро. Эффективность процессов, загрузка специалистов, сроки выполнения.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Проектов" value={340} prefix={<SettingOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Средний срок" value={12.5} suffix="дней" prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Выполнено" value={95} suffix="%" prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Специалистов" value={25} prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Ключевые метрики" bordered={false}>
            <List
              dataSource={[
                'Время выполнения заказов',
                'Загрузка экспертов',
                'Качество выполненных работ',
                'Уровень удовлетворенности клиентов',
                'Эффективность бизнес-процессов',
                'Показатели производительности'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Операционная эффективность" bordered={false}>
            <Paragraph>Распределение по отделам:</Paragraph>
            <Progress percent={40} status="active" format={() => 'Экспертиза 40%'} />
            <Progress percent={35} status="active" format={() => 'Оценка 35%'} />
            <Progress percent={15} status="active" format={() => 'Юридические 15%'} />
            <Progress percent={10} status="active" format={() => 'Администрирование 10%'} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OperationalReports;