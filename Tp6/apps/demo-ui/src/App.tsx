import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Server,
  Mail,
  Layers,
  RefreshCw,
  Send,
  Zap,
} from 'lucide-react';

interface ActivationStepInfo {
  status: 'OK' | 'FAILED';
  at: string;
  details?: any;
}

interface ActivationHistoryItem {
  eventType: string;
  at: string;
  details?: any;
}

interface Activation {
  id: string;
  customerId: string;
  planId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'ACTIVE' | 'FAILED';
  simulateFailure: string;
  steps: {
    billing?: ActivationStepInfo;
    provisioning?: ActivationStepInfo;
  };
  history: ActivationHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

const API_BASE = 'http://localhost:3000';

export default function App() {
  const [activations, setActivations] = useState<Activation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>('C-1234');
  const [planId, setPlanId] = useState<string>('FTTH-300MB-SYMMETRIC');
  const [simulateFailure, setSimulateFailure] = useState<'none' | 'billing' | 'provisioning'>('none');
  const [loading, setLoading] = useState<boolean>(false);
  const [wsConnected, setWsConnected] = useState<boolean>(false);

  // Fetch initial list
  const loadActivations = async () => {
    try {
      const res = await fetch(`${API_BASE}/activations`);
      if (res.ok) {
        const data = await res.json();
        setActivations(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load activations', err);
    }
  };

  useEffect(() => {
    loadActivations();

    // Setup Socket.IO connection
    const socket: Socket = io(API_BASE, {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      setWsConnected(true);
    });

    socket.on('disconnect', () => {
      setWsConnected(false);
    });

    socket.on('activation:created', (newAct: Activation) => {
      setActivations((prev) => [newAct, ...prev.filter((a) => a.id !== newAct.id)]);
      setSelectedId(newAct.id);
    });

    socket.on('activation:update', (updatedAct: Activation) => {
      setActivations((prev) => {
        const index = prev.findIndex((a) => a.id === updatedAct.id);
        if (index >= 0) {
          const next = [...prev];
          next[index] = updatedAct;
          return next;
        }
        return [updatedAct, ...prev];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleContractPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/activations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          planId,
          simulateFailure,
        }),
      });

      if (res.status === 202) {
        const data = await res.json();
        setSelectedId(data.activationId);
        // Randomize customerId for next test convenience
        setCustomerId(`C-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (err) {
      console.error('Error submitting activation:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Activation['status']) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-950/60 text-yellow-400 border border-yellow-800/60">
            <Clock className="w-3.5 h-3.5 animate-spin" /> PENDING
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/60 text-blue-400 border border-blue-800/60">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> IN PROGRESS
          </span>
        );
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/60 text-rose-400 border border-rose-800/60">
            <XCircle className="w-3.5 h-3.5" /> FAILED
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-md shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              Activación de Servicios
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 font-mono border border-indigo-700/50">
                
              </span>
            </h1>
            <p className="text-xs text-slate-400"></p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                wsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-300">
              WebSocket: {wsConnected ? 'En vivo' : 'Desconectado'}
            </span>
          </div>

          <a
            href="http://localhost:8080"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
          >
            <Server className="w-3.5 h-3.5 text-orange-400" />
            Kafka UI
          </a>

          <a
            href="http://localhost:8025"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            Mailhog
          </a>
        </div>
      </header>

      {/* Main Content (Centered & Clean) */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
        {/* Form Card (RF-01) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-200">
              1. Contratar Plan
            </h2>
          </div>

          <form onSubmit={handleContractPlan} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cliente ID
                </label>
                <input
                  type="text"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                  placeholder="ej. C-1234"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Plan</label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="FTTH-300MB-SYMMETRIC">Fibra Hogar 300 Megas Simétricos</option>
                  <option value="CORP-FIBER-1GB">Dedicado Corporativo 1 Gbps (SLA 99.9%)</option>
                  <option value="5G-FWA-HOME">Internet Inalámbrico 5G Hogar (Pack TV)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Simulación de Fallo Forzado
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSimulateFailure('none')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border transition ${
                    simulateFailure === 'none'
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Ninguno (OK)
                </button>
                <button
                  type="button"
                  onClick={() => setSimulateFailure('billing')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border transition ${
                    simulateFailure === 'billing'
                      ? 'bg-rose-950/60 border-rose-600 text-rose-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Fallo Billing
                </button>
                <button
                  type="button"
                  onClick={() => setSimulateFailure('provisioning')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border transition ${
                    simulateFailure === 'provisioning'
                      ? 'bg-rose-950/60 border-rose-600 text-rose-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Fallo Provisioning
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Publicar Activación (POST /activations)
            </button>
          </form>
        </div>

        {/* Activations List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-200">
              Historial de Activaciones ({activations.length})
            </h2>
            <button
              onClick={loadActivations}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Actualizar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
            {activations.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6 col-span-2">
                No hay activaciones aún. Crea una arriba.
              </p>
            ) : (
              activations.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg border bg-slate-950/60 border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {item.id}
                      </span>
                      <span className="text-xs text-slate-400">({item.customerId})</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.planId}</p>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}