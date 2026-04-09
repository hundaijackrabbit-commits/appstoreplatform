'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type AdminOrder = {
  recordId: string;
  id: string;
  status: string;
  productId: string;
  productName: string;
  totalPrice: number;
  zipUrl: string;
  repoUrl: string;
  deliveryNotes: string;
  selectedAddons: string[];
  currentMessage: string;
  createdAt: string | null;
};

type EditState = {
  status: string;
  zipUrl: string;
  repoUrl: string;
  deliveryNotes: string;
  currentMessage: string;
};

const STATUS_OPTIONS = [
  'pending',
  'reviewing',
  'approved_to_build',
  'building',
  'finalizing',
  'ready_for_delivery',
  'delivered',
];

export default function AdminPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, EditState>>({});
  const [filter, setFilter] = useState('all');

  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const existing = sessionStorage.getItem('admin-authed');
    if (existing === 'true') {
      setIsAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'changeme123';

    if (password === expected) {
      sessionStorage.setItem('admin-authed', 'true');
      setIsAuthed(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-authed');
    setIsAuthed(false);
    setPassword('');
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders/list', { cache: 'no-store' });
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
        const nextEdits: Record<string, EditState> = {};
        for (const order of data.orders || []) {
          nextEdits[order.recordId] = {
            status: order.status || 'pending',
            zipUrl: order.zipUrl || '',
            repoUrl: order.repoUrl || '',
            deliveryNotes: order.deliveryNotes || '',
            currentMessage: order.currentMessage || '',
          };
        }
        setEdits(nextEdits);
      }
    } catch (error) {
      console.error('Failed to load admin orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      loadOrders();
    }
  }, [isAuthed]);

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const updateEdit = (recordId: string, key: keyof EditState, value: string) => {
    setEdits((prev) => ({
      ...prev,
      [recordId]: {
        ...prev[recordId],
        [key]: value,
      },
    }));
  };

  const saveOrder = async (order: AdminOrder) => {
    const edit = edits[order.recordId];
    if (!edit) return;

    setSavingId(order.recordId);

    try {
      const res = await fetch(`/api/orders/${order.id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(edit),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || 'Failed to save order');
        return;
      }

      await loadOrders();
      alert('Order updated');
    } catch (error) {
      console.error(error);
      alert('Failed to save order');
    } finally {
      setSavingId(null);
    }
  };

  const markReady = async (order: AdminOrder) => {
    const edit = edits[order.recordId];
    if (!edit) return;

    const next = {
      ...edit,
      status: 'ready_for_delivery',
      currentMessage:
        edit.currentMessage || 'Your project is complete and ready for delivery.',
    };

    setEdits((prev) => ({
      ...prev,
      [order.recordId]: next,
    }));

    setSavingId(order.recordId);

    try {
      const res = await fetch(`/api/orders/${order.id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(next),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || 'Failed to mark order ready');
        return;
      }

      await loadOrders();
      alert('Order marked ready for delivery');
    } catch (error) {
      console.error(error);
      alert('Failed to mark order ready');
    } finally {
      setSavingId(null);
    }
  };

  const deleteOrder = async (order: AdminOrder) => {
    const confirmed = window.confirm(
      `Delete order "${order.id || order.recordId}"? This removes it from Airtable.`
    );
    if (!confirmed) return;

    setDeletingId(order.recordId);

    try {
      const res = await fetch(`/api/orders/record/${order.recordId}/delete`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || 'Failed to delete order');
        return;
      }

      await loadOrders();
    } catch (error) {
      console.error(error);
      alert('Failed to delete order');
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-black/30 border border-white/10 text-white">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
            {authError ? <p className="text-red-400 text-sm">{authError}</p> : null}
            <Button className="w-full" onClick={handleLogin}>
              Enter Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300 mt-2">
              Manage orders, paste ZIP links, add GitHub repos, and deliver projects.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All orders</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <Button onClick={loadOrders}>Refresh</Button>
            <Button variant="outline" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-white text-lg">Loading admin dashboard...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-gray-300">No orders found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map((order) => {
              const edit = edits[order.recordId] || {
                status: order.status || 'pending',
                zipUrl: '',
                repoUrl: '',
                deliveryNotes: '',
                currentMessage: '',
              };

              return (
                <Card key={order.recordId} className="bg-black/30 border border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span>{order.productName || 'Custom Project'}</span>
                      <span className="text-sm font-normal text-gray-300">
                        {order.id || order.recordId}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Status</div>
                        <div className="mt-1 text-white">{order.status}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Price</div>
                        <div className="mt-1 text-white">${Number(order.totalPrice || 0).toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Created</div>
                        <div className="mt-1 text-white">
                          {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Unknown'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Add-ons</div>
                        <div className="mt-1 text-white">
                          {order.selectedAddons?.length ? order.selectedAddons.join(', ') : 'None'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-300 block mb-2">Status</label>
                        <select
                          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
                          value={edit.status}
                          onChange={(e) => updateEdit(order.recordId, 'status', e.target.value)}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 block mb-2">Current customer message</label>
                        <input
                          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
                          value={edit.currentMessage}
                          onChange={(e) => updateEdit(order.recordId, 'currentMessage', e.target.value)}
                          placeholder="Example: We are currently building your project."
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 block mb-2">ZIP URL</label>
                        <input
                          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
                          value={edit.zipUrl}
                          onChange={(e) => updateEdit(order.recordId, 'zipUrl', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 block mb-2">GitHub Repo URL</label>
                        <input
                          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
                          value={edit.repoUrl}
                          onChange={(e) => updateEdit(order.recordId, 'repoUrl', e.target.value)}
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 block mb-2">Delivery notes</label>
                      <textarea
                        className="w-full min-h-28 bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white"
                        value={edit.deliveryNotes}
                        onChange={(e) => updateEdit(order.recordId, 'deliveryNotes', e.target.value)}
                        placeholder="Explain setup steps, login info, deployment notes, or anything else the customer should know."
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => saveOrder(order)}
                        disabled={savingId === order.recordId}
                      >
                        {savingId === order.recordId ? 'Saving...' : 'Save Changes'}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => markReady(order)}
                        disabled={savingId === order.recordId}
                      >
                        Mark Ready for Delivery
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => deleteOrder(order)}
                        disabled={deletingId === order.recordId}
                      >
                        {deletingId === order.recordId ? 'Deleting...' : 'Delete Test Order'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
