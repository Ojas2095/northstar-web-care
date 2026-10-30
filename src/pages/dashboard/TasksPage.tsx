import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CheckSquare,
  Clock,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DEMO_TASKS, DEMO_WEBSITES } from '../../data/demoData';
import { MaintenanceTask } from '../../types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function TasksPage() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(DEMO_TASKS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>('task-1');

  // New task modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [newWebsiteId, setNewWebsiteId] = useState<string>('site-1');
  const [newEstTime, setNewEstTime] = useState(30);

  // Add note modal/state
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MaintenanceTask = {
      id: `task-${Date.now()}`,
      websiteId: newWebsiteId,
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedTime: Number(newEstTime),
      notes: [],
    };
    setTasks([created, ...tasks]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const updateTaskStatus = (
    taskId: string,
    newStatus: 'pending' | 'in-progress' | 'completed'
  ) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
            actualTime:
              newStatus === 'completed' && !t.actualTime ? t.estimatedTime : t.actualTime,
          };
        }
        return t;
      })
    );
  };

  const handleAddNote = (taskId: string) => {
    const noteText = noteInputs[taskId]?.trim();
    if (!noteText) return;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            notes: [...t.notes, noteText],
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
    setNoteInputs((prev) => ({ ...prev, [taskId]: '' }));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Maintenance Task Management — CloudDesk</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Maintenance Backlog & Work Logs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track technical support requests, bug fixes, responsiveness repairs, and hour allocations.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Maintenance Task</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400 mr-1" />
        {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === status
                ? 'bg-navy-800 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const isExpanded = expandedTaskId === task.id;
          const site = DEMO_WEBSITES.find((s) => s.id === task.websiteId);

          return (
            <div
              key={task.id}
              className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">#{task.id}</span>
                    <h3 className="font-semibold text-navy-800 text-base">{task.title}</h3>
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
                    <Badge
                      variant={
                        task.status === 'completed'
                          ? 'success'
                          : task.status === 'in-progress'
                          ? 'info'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{task.description}</p>
                  {site && (
                    <p className="text-[11px] text-gray-400">
                      Property:{' '}
                      <span className="font-medium text-navy-800">{site.name}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <div>
                    <span className="block text-[10px] uppercase text-gray-400">Est. Time</span>
                    <span className="font-semibold text-navy-800">{task.estimatedTime}m</span>
                  </div>
                  {task.actualTime && (
                    <div>
                      <span className="block text-[10px] uppercase text-gray-400">Actual Time</span>
                      <span className="font-semibold text-teal-600">{task.actualTime}m</span>
                    </div>
                  )}

                  {/* Status Toggle Actions */}
                  <div className="flex items-center gap-1.5">
                    {task.status !== 'completed' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className="text-xs px-2.5 py-1"
                      >
                        Complete
                      </Button>
                    )}
                    {task.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
                        className="text-xs px-2.5 py-1"
                      >
                        Start
                      </Button>
                    )}
                    {task.status === 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
                        className="text-xs px-2.5 py-1"
                      >
                        Reopen
                      </Button>
                    )}
                    <button
                      onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-navy-800"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Notes & Work Log */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-gray-100 bg-gray-50/50 space-y-3">
                  <h4 className="text-xs font-semibold text-navy-800 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                    <span>Engineering Work Log & Verification Notes</span>
                  </h4>

                  {task.notes.length > 0 ? (
                    <ul className="space-y-1.5">
                      {task.notes.map((note, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-600 bg-white p-2.5 rounded border border-gray-200"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No notes logged yet.</p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add an engineering note or verification step..."
                      value={noteInputs[task.id] || ''}
                      onChange={(e) =>
                        setNoteInputs({ ...noteInputs, [task.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddNote(task.id);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddNote(task.id)}
                      className="text-xs"
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: New Maintenance Task */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Maintenance Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            required
            placeholder="e.g. Fix mobile viewport collision on navbar"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">
              Associated Property
            </label>
            <select
              value={newWebsiteId}
              onChange={(e) => setNewWebsiteId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              {DEMO_WEBSITES.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-800 mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as 'low' | 'medium' | 'high' | 'critical')
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <Input
              label="Estimated Time (mins)"
              type="number"
              min={5}
              step={5}
              value={newEstTime}
              onChange={(e) => setNewEstTime(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Description</label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Provide steps to reproduce and target fix..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
