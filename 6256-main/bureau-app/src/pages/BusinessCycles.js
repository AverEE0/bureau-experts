import React from 'react';
import { Layout, Card, Row, Col, Button, Steps, Typography, Space } from 'antd';
import { FolderOpenOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;

const BusinessCycles = () => {
  return (
    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Бизнес-циклы</Title>
      <Text>Автоматизированные циклы: судебная экспертиза, оценка недвижимости, юридическое сопровождение, риэлторская оценка.</Text>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Судебная экспертиза" extra={<Button type="link">Начать</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Steps direction="vertical" current={1}>
              <Step title="Запрос" description="Получение запроса" />
              <Step title="Договор" description="Заключение договора" />
              <Step title="Счет" description="Выставление счета" />
              <Step title="Экспертиза" description="Составление заключения" />
              <Step title="Акт" description="Акт выполненных работ" />
              <Step title="Архив" description="Передача в архив" />
            </Steps>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Оценка недвижимости" extra={<Button type="link">Начать</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Steps direction="vertical" current={2}>
              <Step title="Запрос" description="Получение запроса" />
              <Step title="Договор" description="Заключение договора" />
              <Step title="Счет" description="Выставление счета" />
              <Step title="Отчет" description="Составление отчета об оценке" />
              <Step title="Акт" description="Акт выполненных работ" />
              <Step title="Архив" description="Передача в архив" />
            </Steps>
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Юридическое сопровождение" extra={<Button type="link">Начать</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Шаблоны процессуальных документов по ГПК/АПК/КоАП РФ.</Text>
              <Text>Календарь сроков с автоматическими напоминаниями.</Text>
              <Button type="primary" icon={<CheckCircleOutlined />}>Создать дело</Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Риэлторская оценка" extra={<Button type="link">Начать</Button>} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Space direction="vertical" size="small">
              <Text>Автоматический сбор объявлений от собственников из Авито, ЦИАН, Яндекс.Недвижимость, VK.</Text>
              <Text>Интеграция с сайтом бюроэкспертов.рф для обработки высокого потока клиентов.</Text>
              <Button type="primary">Быстрая оценка</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default BusinessCycles;