import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space, message } from 'antd';
import { HomeOutlined, ApartmentOutlined, ShopOutlined, BuildOutlined, PlusOutlined, EyeOutlined, CalculatorOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Realty() {
  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
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

      <Card title="Парсинг площадок объявлений" style={{ marginTop: 24 }} bordered={false}>
        <Paragraph type="secondary">
          Сбор данных об аналогах и предложениях с площадок: Авито, ЦИАН, Яндекс.Недвижимость, VK (объявления) — для отчётов об оценке и анализа рынка.
        </Paragraph>
        <Space wrap>
          <Button size="small" onClick={() => message.info('Парсинг Авито настраивается в интеграциях')}>Авито</Button>
          <Button size="small" onClick={() => message.info('Парсинг ЦИАН настраивается в интеграциях')}>ЦИАН</Button>
          <Button size="small" onClick={() => message.info('Парсинг Яндекс.Недвижимость в интеграциях')}>Яндекс.Недвижимость</Button>
          <Button size="small" onClick={() => message.info('Парсинг VK в интеграциях')}>VK</Button>
        </Space>
        <Paragraph type="secondary" style={{ marginTop: 12 }}>
          Настройка источников и периодичности выгрузки — в настройках интеграций.
        </Paragraph>
      </Card>

      <Card title="Интеграция с сайтом бюроэкспертов.рф" style={{ marginTop: 16 }} bordered={false}>
        <Paragraph type="secondary">
          Заявки и лиды с сайта бюроэкспертов.рф поступают в CRM; возможность единого реестра заявок на оценку и экспертизу.
        </Paragraph>
        <Button type="primary" size="small" onClick={() => message.success('Приём заявок настраивается в разделе «Настройки» → Интеграции')}>Настроить приём заявок</Button>
      </Card>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Действия" bordered={false}>
            <Space wrap>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => message.success('Объект добавлен. Заполните данные в карточке.')}>Добавить объект</Button>
              <Button icon={<EyeOutlined />} onClick={() => message.info('Список объектов в реестре дел')}>Просмотр объектов</Button>
              <Button icon={<CalculatorOutlined />} onClick={() => message.success('Расчёт в разделе «Оценка»')}>Оценка стоимости</Button>
              <Button onClick={() => message.info('Экспертиза состояния — в разделе «Экспертиза»')}>Экспертиза состояния</Button>
              <Button onClick={() => message.info('Документы по объекту в разделе «Документы»')}>Документы</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Realty;