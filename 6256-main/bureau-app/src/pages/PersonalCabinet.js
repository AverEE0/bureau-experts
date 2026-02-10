import React, { useState, useEffect } from 'react';
import { Card, Statistic, Select, Table, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { api } from '../api';

const { Title, Text } = Typography;

export default function PersonalCabinet({ user }) {
  const [period, setPeriod] = useState('month');
  const [stats, setStats] = useState(null);
  const [allStats, setAllStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const me = await api.getStatsMe(period);
        if (!cancelled) setStats(me);
        if (user?.role === 'admin') {
          const all = await api.getStatsAll(period);
          if (!cancelled) setAllStats(all);
        }
      } catch (e) {
        if (!cancelled) setStats(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [period, user?.role]);

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Личный кабинет</Title>
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary">Период: </Text>
        <Select value={period} onChange={setPeriod} style={{ width: 160 }}>
          <Select.Option value="month">Текущий месяц</Select.Option>
          <Select.Option value="week">Текущая неделя</Select.Option>
          <Select.Option value="2026-01">Январь 2026</Select.Option>
          <Select.Option value="2026-02">Февраль 2026</Select.Option>
        </Select>
      </div>
      {stats && (
        <Card loading={loading}>
          <Statistic
            title="Выполнено дел (за период)"
            value={stats.deals_completed}
            prefix={<CheckCircleOutlined />}
            suffix={`${stats.period_start} — ${stats.period_end}`}
          />
          <div style={{ marginTop: 8 }}>
            <Text type="secondary">{stats.full_name || stats.email}</Text>
          </div>
        </Card>
      )}
      {user?.role === 'admin' && allStats.length > 0 && (
        <>
          <Title level={5} style={{ marginTop: 24 }}>По всем сотрудникам</Title>
          <Table
            dataSource={allStats}
            rowKey="user_id"
            columns={[
              { title: 'Сотрудник', dataIndex: 'full_name', render: (v, r) => v || r.email },
              { title: 'Email', dataIndex: 'email' },
              { title: 'Выполнено дел', dataIndex: 'deals_completed', width: 120 },
            ]}
            pagination={false}
          />
        </>
      )}
    </div>
  );
}
