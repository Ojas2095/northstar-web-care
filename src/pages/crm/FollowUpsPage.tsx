import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Bell,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  Send,
  UserCheck,
  FileText,
  Check,
} from 'lucide-react';
import { DEMO_FOLLOW_UPS, DEMO_LEADS } from '../../data/demoData';
import { FollowUp } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useLocalStorage<FollowUp[]>(
    'northstar-crm-followups',
    DEMO_FOLLOW_UPS
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'follow-up' | 'meeting' | 'proposal' | 'renewal' | 'check-in'>('follow-up');
  const [notes, setNotes] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const toggleComplete = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, completed: !f.completed } : f))
    );
  };

  const handleAddFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newFU: FollowUp = {
      id: `fu-${Date.now()}`,
      title,
      dueDate,
      type,
      completed: false,
      notes,
    };
    setFollowUps([newFU, ...followUps]);
    setIsModalOpen(false);
    setTitle('');
    setNotes('');
  };

  // Groupings
  const overdueList = followUps.filter((f) => !f.completed && f.dueDate < todayStr);
  const todayList = followUps.filter((f) => !f.completed && f.dueDate === todayStr);
  const upcomingList = followUps.filter((f) => !f.completed && f.dueDate > todayStr);
  const completedList = followUps.filter((f) => f.completed);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Follow-Up & Pipeline Action Queue — Northstar Ops</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 tracking-tight">
            Follow-Up & Outreach Action Queue
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manual action items, Day-4 follow-ups, proposal reviews, and renewal checkpoints.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Follow-Up Item</span>
        </Button>
      </div>

      {/* Manual Approval Compliance Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            Strict Human-in-the-Loop Outreach Protocol
          </p>
          <p>
            No emails or automated messages are dispatched autonomously. Review each customized draft
            in the Templates tab, perform human quality approval, and send directly from your business
            inbox.
          </p>
        </div>
      </div>

      {/* Action Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overdue Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-red-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <h2 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
                Overdue Actions
              </h2>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              {overdueList.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {overdueList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-xl border border-red-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-navy-800">{item.title}</h3>
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="w-4 h-4 rounded border border-gray-300 hover:border-gray-500 flex items-center justify-center shrink-0"
                  />
                </div>
                <p className="text-[11px] text-gray-500">{item.notes}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-red-600 font-medium">
                  <span>Due: {item.dueDate}</span>
                  <span className="capitalize">{item.type}</span>
                </div>
              </div>
            ))}
            {overdueList.length === 0 && (
              <p className="text-xs text-gray-400 italic p-3 text-center">No overdue follow-ups.</p>
            )}
          </div>
        </div>

        {/* Due Today */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-teal-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <h2 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
                Due Today ({todayStr})
              </h2>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
              {todayList.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {todayList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-xl border border-teal-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-navy-800">{item.title}</h3>
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="w-4 h-4 rounded border border-gray-300 hover:border-teal-500 flex items-center justify-center shrink-0"
                  />
                </div>
                <p className="text-[11px] text-gray-500">{item.notes}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-teal-700 font-medium">
                  <span>Priority Action</span>
                  <span className="capitalize">{item.type}</span>
                </div>
              </div>
            ))}
            {todayList.length === 0 && (
              <p className="text-xs text-gray-400 italic p-3 text-center">No actions scheduled for today.</p>
            )}
          </div>
        </div>

        {/* Upcoming */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-navy-600" />
              <h2 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
                Upcoming (Next 7 Days)
              </h2>
            </div>
            <span className="text-xs font-bold text-navy-700 bg-gray-100 px-2 py-0.5 rounded-full">
              {upcomingList.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {upcomingList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-navy-800">{item.title}</h3>
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="w-4 h-4 rounded border border-gray-300 hover:border-navy-500 flex items-center justify-center shrink-0"
                  />
                </div>
                <p className="text-[11px] text-gray-500">{item.notes}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400">
                  <span>Due: {item.dueDate}</span>
                  <span className="capitalize">{item.type}</span>
                </div>
              </div>
            ))}
            {upcomingList.length === 0 && (
              <p className="text-xs text-gray-400 italic p-3 text-center">No upcoming follow-ups.</p>
            )}
          </div>
        </div>
      </div>

      {/* Completed Section */}
      {completedList.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Recently Completed ({completedList.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {completedList.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs text-gray-400"
              >
                <span className="line-through line-clamp-1">{item.title}</span>
                <button
                  onClick={() => toggleComplete(item.id)}
                  className="w-4 h-4 rounded bg-emerald-500 text-white flex items-center justify-center shrink-0"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: New Follow Up */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Follow-Up Item">
        <form onSubmit={handleAddFollowUp} className="space-y-4">
          <Input
            label="Action Title"
            required
            placeholder="e.g. Day 4 follow-up with Alex regarding proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Due Date"
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <div>
              <label className="block text-xs font-medium text-navy-800 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="follow-up">Follow-Up (Day 4)</option>
                <option value="proposal">Send Proposal</option>
                <option value="meeting">Discovery Call</option>
                <option value="renewal">Contract Renewal</option>
                <option value="check-in">Client Check-in</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-800 mb-1">Notes / Context</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What needs to be reviewed or referenced?"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Action
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
