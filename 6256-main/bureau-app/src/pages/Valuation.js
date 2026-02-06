import React from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  List,
  Divider,
  Statistic,
} from 'antd';
import {
  DollarOutlined,
  CalculatorOutlined,
  HomeOutlined,
  PlusOutlined,
  FileImageOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function Valuation() {
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
        <CalculatorOutlined style={{ marginRight: 8 }} />
        Оценка недвижимости
      </Title>
      <Paragraph>
        Цикл: Запрос → Договор → Счёт → Отчёт об оценке / Выписка / Акт об оценке / Справка → Акт выполненных работ → Архив.
        Данные из CRM, ЕГРН/Росреестра, аналоги из открытых источников, актуальное законодательство на дату отчёта.
      </Paragraph>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Документы по оценке" size="small">
            <List
              dataSource={[
                'Отчёт об оценке',
                'Выписка из отчёта об оценке',
                'Акт об оценке',
                'Справка',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Paragraph type="secondary" style={{ marginTop: 8 }}>
              Вставка фото в отчёт/выписку/заключение: по 2–3 фото в строку на лист А4, компактно на весь лист.
            </Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Три метода расчёта" size="small">
            <List
              dataSource={[
                'Сравнительный (рыночный)',
                'Доходный',
                'Затратный',
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Оценок" value={890} prefix={<CalculatorOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Недвижимость" value={450} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="В работе" value={12} prefix={<BankOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="Действия" style={{ marginTop: 24 }}>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            Новая оценка
          </Button>
          <Button icon={<FileImageOutlined />}>
            Отчёт с фото (2–3 в строку)
          </Button>
          <Button>Выписка из отчёта</Button>
          <Button>Экспорт в PDF</Button>
        </Space>
      </Card>
    </div>
  );
}

export default Valuation;
