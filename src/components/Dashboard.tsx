import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Phone, Clock, Target, AlertTriangle } from 'lucide-react';
import { MetricCard } from './dashboard/MetricCard';
import { ChartCard } from './dashboard/ChartCard';
import { ActivityFeed } from './dashboard/ActivityFeed';
import { PerformanceChart } from './dashboard/PerformanceChart';
import { CollectionPipeline } from './dashboard/CollectionPipeline';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Collection Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time overview of collection performance and activities</p>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Recovery Rate"
          value="68.4%"
          change="+5.2%"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Active Accounts"
          value="8,247"
          change="+124"
          trend="up"
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Collections Today"
          value="$124,580"
          change="+$18,240"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Right Party Contact Rate"
          value="42.1%"
          change="-2.1%"
          trend="down"
          icon={Phone}
          color="amber"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Avg Collection Time"
          value="18.5 days"
          change="-1.2 days"
          trend="up"
          icon={Clock}
          color="blue"
          small
        />
        <MetricCard
          title="PTP Fulfillment"
          value="74.8%"
          change="+3.1%"
          trend="up"
          icon={Target}
          color="green"
          small
        />
        <MetricCard
          title="Cost per $"
          value="$0.18"
          change="-$0.02"
          trend="up"
          icon={DollarSign}
          color="green"
          small
        />
        <MetricCard
          title="Compliance Issues"
          value="3"
          change="+1"
          trend="down"
          icon={AlertTriangle}
          color="red"
          small
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Collection Performance Trend">
            <PerformanceChart />
          </ChartCard>
        </div>
        <div className="lg:col-span-1">
          <ChartCard title="Collection Pipeline">
            <CollectionPipeline />
          </ChartCard>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-left">
                Import New Data File
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-left">
                Generate Daily Report
              </button>
              <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-left">
                Create New Strategy
              </button>
              <button className="w-full bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition-colors text-left">
                Review Compliance Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}