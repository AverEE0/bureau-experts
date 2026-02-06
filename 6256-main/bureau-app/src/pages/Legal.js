import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { FileTextOutlined, AuditOutlined, ReconciliationOutlined, BookOutlined, PlusOutlined, EyeOutlined, FileProtectOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Legal() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Юридические Услуги</Title>
      <Paragraph>
        Комплексное юридическое сопровождение экспертной деятельности. Консультации, договоры, судебная защита.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Дел" value={340} prefix={<AuditOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Договоров" value={1250} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Консультаций" value={890} prefix={<ReconciliationOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Выиграно" value={78} suffix="%" prefix={<BookOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Виды услуг" bordered={false}>
            <List
              dataSource={[
                'Консультации по экспертной деятельности',
                'Подготовка и проверка договоров',
                'Судебное представительство',
                'Арбитражные споры',
                'Регистрация юридических лиц',
                'Лицензирование деятельности'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Юридическая поддержка" bordered={false}>
            <List
              dataSource={[
                'Анализ правовых рисков',
                'Составление исковых заявлений',
                'Участие в судебных заседаниях',
                'Подготовка апелляций и кассаций',
                'Медиация и досудебное урегулирование',
                'Экспертиза юридических документов'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Юридические действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Новое дело
              </Button>
              <Button icon={<FileTextOutlined />}>
                Создать договор
              </Button>
              <Button icon={<AuditOutlined />}>
                Судебное дело
              </Button>
              <Button icon={<EyeOutlined />}>
                Просмотр дел
              </Button>
              <Button icon={<FileProtectOutlined />}>
                Консультация
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Legal;