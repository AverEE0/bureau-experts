import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { HomeOutlined, ApartmentOutlined, ShopOutlined, BuildOutlined, PlusOutlined, EyeOutlined, CalculatorOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Realty() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Недвижимость</Title>
      <Paragraph>
        Экспертиза и оценка объектов недвижимости. Техническое обследование, оценка стоимости, юридическая проверка.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Объектов" value={560} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Жилые" value={320} prefix={<ApartmentOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Коммерческие" value={180} prefix={<ShopOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Земельные" value={60} prefix={<BuildOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Виды недвижимости" bordered={false}>
            <List
              dataSource={[
                'Квартиры и жилые дома',
                'Коммерческая недвижимость',
                'Земельные участки',
                'Производственные помещения',
                'Объекты незавершенного строительства',
                'Ипотечное жилье'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Услуги по недвижимости" bordered={false}>
            <List
              dataSource={[
                'Техническая экспертиза состояния',
                'Оценка рыночной стоимости',
                'Проверка юридической чистоты',
                'Инспекция перед покупкой',
                'Оценка для ипотеки',
                'Консультации по сделкам'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Недвижимые действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Добавить объект
              </Button>
              <Button icon={<EyeOutlined />}>
                Просмотр объектов
              </Button>
              <Button icon={<CalculatorOutlined />}>
                Оценка стоимости
              </Button>
              <Button>
                Экспертиза состояния
              </Button>
              <Button>
                Документы
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Realty;