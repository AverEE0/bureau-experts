import React from 'react';
import { Result, Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

export default function NotFound({ onGoHome }) {
  return (
    <div style={{ padding: 48, textAlign: 'center', minHeight: 360 }}>
      <Result
        status="404"
        title="Страница не найдена"
        subTitle="Запрашиваемая страница не существует или была перемещена."
        extra={
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => onGoHome && onGoHome()}
            style={{ background: '#111', borderColor: '#111' }}
          >
            На главную
          </Button>
        }
      >
        <Paragraph style={{ color: '#666', maxWidth: 480, margin: '0 auto' }}>
          Если вы искали что-то конкретное, воспользуйтесь меню слева или перейдите на главную панель.
        </Paragraph>
      </Result>
    </div>
  );
}
