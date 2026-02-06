import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { FileProtectOutlined, SendOutlined, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function EDO() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Электронный Документооборот</Title>
      <Paragraph>
        Обмен юридически значимыми документами в электронном виде. Интеграция с системами ЭДО для ускорения процессов.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Документов" value={8900} prefix={<FileProtectOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Отправлено" value={4500} prefix={<SendOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Подписано" value={4200} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Время" value={2.5} suffix="ч" prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Системы ЭДО" bordered={false}>
            <List
              dataSource={[
                'СБИС',
                'Диадок',
                '1C-ЭДО',
                'Контур.Диадок',
                'Тензор',
                'ЭДО Лайт'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Возможности ЭДО" bordered={false}>
            <List
              dataSource={[
                'Отправка счетов и актов',
                'Получение и подписание документов',
                'Автоматическое согласование',
                'Интеграция с бухгалтерией',
                'Отслеживание статусов документов',
                'Хранение электронных архивов'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="ЭДО Действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Создать документ
              </Button>
              <Button icon={<SendOutlined />}>
                Отправить
              </Button>
              <Button icon={<EyeOutlined />}>
                Просмотр документов
              </Button>
              <Button icon={<CheckCircleOutlined />}>
                Подписать
              </Button>
              <Button>
                Статус документов
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EDO;