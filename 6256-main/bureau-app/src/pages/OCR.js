import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Button, Space, Upload, message } from 'antd';
import { FileTextOutlined, ScanOutlined, CheckCircleOutlined, ExclamationCircleOutlined, UploadOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function OCR() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>OCR Распознавание Документов</Title>
      <Paragraph>
        Автоматическое распознавание текста из отсканированных документов. Интеграция с системами документооборота для ускорения обработки.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Обработано" value={8750} prefix={<ScanOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Точность" value={96.5} suffix="%" prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="За день" value={120} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Ошибки" value={45} prefix={<ExclamationCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Поддерживаемые форматы" bordered={false}>
            <List
              dataSource={[
                'PDF документы',
                'Изображения (JPG, PNG, TIFF)',
                'Сканированные документы',
                'Многостраничные файлы',
                'Разные языки (русский, английский)',
                'Различные шрифты и форматы'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Функционал OCR" bordered={false}>
            <List
              dataSource={[
                'Автоматическое распознавание текста',
                'Извлечение структурированных данных',
                'Коррекция ошибок распознавания',
                'Интеграция с ЭДО системами',
                'Экспорт в редактируемые форматы',
                'Статистика и аналитика обработки'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="OCR Действия" bordered={false}>
            <Space wrap>
              <Upload beforeUpload={() => { message.success('Файл принят в очередь распознавания'); return false; }} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Загрузить документ</Button>
              </Upload>
              <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => message.success('Распознавание запущено')}>Запустить распознавание</Button>
              <Button icon={<CheckCircleOutlined />} onClick={() => message.info('Проверка результата в карточке документа')}>Проверить результат</Button>
              <Button onClick={() => message.info('Коррекция ошибок в редакторе документа')}>Коррекция ошибок</Button>
              <Button onClick={() => message.success('Экспорт в TXT/PDF доступен в карточке документа')}>Экспорт текста</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OCR;