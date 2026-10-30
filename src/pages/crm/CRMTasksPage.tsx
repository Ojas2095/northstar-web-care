import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ClipboardList,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Filter,
  Calendar,
  Building,
  Check,
} from 'lucide-react';
import { DEMO_TASKS, DEMO_CLIENTS } from '../../data/demoData';
import { MaintenanceTask } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function CRMTasksPage() {
  const [tasks, setTasks] = useLocalStorage<MaintenanceTask[]>('northstar-crm-tasks', DEMO_TASKS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState(DEMO_CLIENTS[0].id);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [estimatedTime, setEstimatedTime] = useState(30);
  const [description, setDescription] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: MaintenanceTask = {
      id: `task-${Date.now()}`,
      clientId,
      title,
      description,
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedTime: Number(estimatedTime),
      notes: [],
    };
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'in-progress' : 'completed';
          return {
            ...t,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined,
            actualTime: nextStatus === 'completed' && !t.actualTime ? t.estimatedTime : t.actualTime,
          };
        }
        return t;
      })
    );
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const totalEst = tasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0);
  const totalActual = tasks.reduce((sum, t) => sum + (t.actualTime || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Task Backlog & Time Tracking — Northstar Ops</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Client Task Allocation & Backlog
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track development hours, estimate vs actual time expenditures, and deliverables.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Client Task</span>
        </Button>
      </div>

      {/* Time Tracking Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Estimated Workload</span>
          <p className="text-2xl font-bold text-navy-800 mt-1">{Math.round(totalEst / 60 * 10) / 10} hrs</p>
          <span className="text-[11px] text-gray-400">{totalEst} minutes planned</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Actual Logged Time</span>
          <p className="text-2xl font-bold text-teal-600 mt-1">{Math.round(totalActual / 60 * 10) / 10} hrs</p>
          <span className="text-[11px] text-gray-400">{totalActual} minutes delivered</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-400 uppercase font-medium">Completion Rate</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {tasks.length > 0 ? Math.round((tasks.filter((t) => t.status === 'completed').length / tasks.length) * 100) : 0}%
          </p>
          <span className="text-[11px] text-gray-400">
            {tasks.filter((t) => t.status === 'completed').length} of {tasks.length} tasks closed
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-navy-800 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-navy-800"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const client = DEMO_CLIENTS.find((c) => c.id === task.clientId);
          const isDone = task.status === 'completed';

          return (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
                isDone ? 'bg-gray-50/70 border-gray-200 opacity-80' : 'bg-white border-gray-200 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </button>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-sm font-semibold ${isDone ? 'line-through text-gray-500' : 'text-navy-800'}`}>
                      {task.title}
                    </h3>
                    <Badge
                      variant={
                        task.priority === 'critical'
                          ? 'error'
                          : task.priority === 'high'
                          ? 'warning'
                          : 'teal'
                      }
                      size="sm"
                    >
                      {task.priority}
                    </Badge>
                    {client && (
                      <span className="text-[11px] font-medium text-navy-600 bg-navy-50 px-2 py-0.5 rounded">
                        {client.companyName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0 self-end md:self-auto">
                <span className="font-mono">Est: {task.estimatedTime}m</span>
                {task.actualTime && (
                  <span className="font-mono text-teal-600 font-semibold">Actual: {task.actualTime}m</span>
                )}
                <Badge variant={isDone ? 'success' : task.status === 'in-progress' ? 'info' : 'neutral'} size="sm">
                  {task.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Task */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Description"
            required
            placeholder="e.g. Broken Stripe webhook handler patch"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Assign to Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {DEMO_CLIENTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-800 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <Input
              label="Estimated Minutes"
              type="number"
              min={5}
              step={5}
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Details & Scope</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Include steps, files to edit, staging links..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
