import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space, message } from 'antd';
import { FileProtectOutlined, KeyOutlined, CheckCircleOutlined, LockOutlined, PlusOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Signatures() {
  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Title level={2}>Электронные Подписи</Title>
      <Paragraph>
        Электронное подписание документов: КЭП/УКЭП (квалифицированная и усиленная квалифицированная ЭП). Интеграция с КриптоПро, УЦ ФНС и коммерческими УЦ. Юридическая значимость в соответствии с 63-ФЗ.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Подписей" value={5670} prefix={<FileProtectOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Сертификатов" value={89} prefix={<KeyOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Валидных" value={82} suffix="%" prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Защищенных" value={99.9} suffix="%" prefix={<LockOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы подписей" bordered={false}>
            <List
              dataSource={[
                'Простая электронная подпись',
                'Усиленная неквалифицированная ЭП',
                'Усиленная квалифицированная ЭП',
                'Совместное подписание',
                'Многоуровневое согласование'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Функционал ЭП" bordered={false}>
            <List
              dataSource={[
                'Интеграция с УЦ ФНС и коммерческими УЦ',
                'Проверка валидности сертификатов',
                'Отзыв и блокировка подписей',
                'Аудит и логи подписаний',
                'Мобильное подписание',
                'Интеграция с ЭДО системами'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Управление подписями" bordered={false}>
            <Space wrap>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => message.info('Мастер создания сертификата (настраивается через УЦ)')}>Создать сертификат</Button>
              <Button icon={<UploadOutlined />} onClick={() => message.info('Выберите документ для загрузки в разделе «Документы»')}>Загрузить документ</Button>
              <Button icon={<FileProtectOutlined />} onClick={() => message.info('Выберите документ и нажмите «Подписать» в карточке документа')}>Подписать</Button>
              <Button icon={<EyeOutlined />} onClick={() => message.success('Проверка подписи: модуль доступен в карточке документа')}>Проверить подпись</Button>
              <Button onClick={() => message.info('История подписей отображается в отчётах')}>История подписей</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Signatures;