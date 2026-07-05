import React, { useState, useEffect, useCallback } from 'react';
import { Panel, Button, Table } from './AdminStyles';
import { getJson } from '../../api/client';

interface Subscriber {
     _id: string;
     email: string;
     createdAt: string;
}

interface SubscribersPanelProps {
     token: string;
     setError: (error: string | null) => void;
}

export function SubscribersPanel({ token, setError }: SubscribersPanelProps) {
     const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
     const [loading, setLoading] = useState(false);

     const loadSubscribers = useCallback(async () => {
          if (!token) return;
          setLoading(true);
          try {
               const response = await getJson<{ data?: Subscriber[] }>('/subscribe', { token });
               setSubscribers(Array.isArray(response.data) ? response.data : []);
          } catch (e: any) {
               console.error('Load subscribers error:', e);
               setError(e?.message || 'Failed to load subscribers');
          } finally {
               setLoading(false);
          }
     }, [token, setError]);

     useEffect(() => {
          loadSubscribers();
     }, [loadSubscribers]);

     function handleExportCsv() {
          const rows = [
               ['Email', 'Subscribed on'],
               ...subscribers.map(s => [s.email, new Date(s.createdAt).toISOString().slice(0, 10)])
          ];
          const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
          URL.revokeObjectURL(url);
     }

     return (
          <Panel>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Newsletter Subscribers {loading && <small>Loading…</small>}</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                         <Button onClick={loadSubscribers}>Refresh</Button>
                         <Button onClick={handleExportCsv} disabled={subscribers.length === 0}>
                              Export CSV ({subscribers.length})
                         </Button>
                    </div>
               </div>

               {!loading && subscribers.length === 0 && (
                    <p>No subscribers yet. The signup form is on the homepage.</p>
               )}

               {subscribers.length > 0 && (
                    <Table>
                         <thead>
                              <tr>
                                   <th>Email</th>
                                   <th>Subscribed on</th>
                              </tr>
                         </thead>
                         <tbody>
                              {subscribers.map((s) => (
                                   <tr key={s._id}>
                                        <td>{s.email}</td>
                                        <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </Table>
               )}
          </Panel>
     );
}
