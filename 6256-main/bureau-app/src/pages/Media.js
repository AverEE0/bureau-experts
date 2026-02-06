import React from 'react';
import { Card, Row, Col, Statistic, List, Typography, Progress, Button, Space } from 'antd';
import { PictureOutlined, VideoCameraOutlined, AudioOutlined, CloudUploadOutlined, PlayCircleOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Media() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Медиа Архив</Title>
      <Paragraph>
        Хранение и управление мультимедийными файлами: фото, видео, аудио материалы экспертиз и обследований.
      </Paragraph>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Фото" value={12500} prefix={<PictureOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Видео" value={340} prefix={<VideoCameraOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Аудио" value={890} prefix={<AudioOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Объем" value={450} suffix="GB" prefix={<CloudUploadOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Типы медиа" bordered={false}>
            <List
              dataSource={[
                'Фотографии объектов экспертизы',
                'Видео обследований',
                'Аудиозаписи консультаций',
                'Сканы документов',
                '3D модели объектов',
                'Панорамные снимки'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Управление медиа" bordered={false}>
            <List
              dataSource={[
                'Автоматическая категоризация',
                'Метаданные и теги',
                'Предварительный просмотр',
                'Сжатие и оптимизация',
                'Водяные знаки безопасности',
                'Экспорт и публикация'
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Медиа действия" bordered={false}>
            <Space>
              <Button type="primary" icon={<CloudUploadOutlined />}>
                Загрузить медиа
              </Button>
              <Button icon={<EyeOutlined />}>
                Просмотр галереи
              </Button>
              <Button icon={<PlayCircleOutlined />}>
                Воспроизвести
              </Button>
              <Button>
                Категоризация
              </Button>
              <Button>
                Экспорт
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Media;