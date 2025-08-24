import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Filter, TrendingUp, AlertTriangle, Building, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const industryData = [
  { industry: 'Steel Manufacturing', companies: 1, avgAQI: 156, status: 'moderate' },
  { industry: 'Power Generation', companies: 1, avgAQI: 198, status: 'dangerous' },
  { industry: 'Metal Processing', companies: 1, avgAQI: 134, status: 'moderate' },
  { industry: 'Wire & Cable Manufacturing', companies: 1, avgAQI: 89, status: 'safe' }
];

const topPolluters = [
  { name: 'JUSCO Power Plant', aqi: 198, industry: 'Power Generation', status: 'dangerous' },
  { name: 'Tata Steel Jamshedpur', aqi: 156, industry: 'Steel Manufacturing', status: 'moderate' },
  { name: 'Tinplate Company of India', aqi: 134, industry: 'Metal Processing', status: 'moderate' },
  { name: 'Usha Martin Limited', aqi: 89, industry: 'Wire & Cable Manufacturing', status: 'safe' }
];

const complianceData = [
  { month: 'Jan', steel: 78, power: 45, metal: 68, wire: 85 },
  { month: 'Feb', steel: 82, power: 48, metal: 72, wire: 88 },
  { month: 'Mar', steel: 76, power: 42, metal: 71, wire: 91 },
  { month: 'Apr', steel: 74, power: 44, metal: 68, wire: 87 },
  { month: 'May', steel: 79, power: 47, metal: 70, wire: 89 },
  { month: 'Jun', steel: 81, power: 49, metal: 73, wire: 92 }
];

const pollutantTrends = [
  { pollutant: 'PM2.5', value: 76, change: '+12%', status: 'danger' },
  { pollutant: 'PM10', value: 134, change: '+8%', status: 'danger' },
  { pollutant: 'NO₂', value: 48, change: '-3%', status: 'moderate' },
  { pollutant: 'SO₂', value: 23, change: '-15%', status: 'good' },
  { pollutant: 'CO', value: 12, change: '+5%', status: 'moderate' },
  { pollutant: 'O₃', value: 67, change: '+7%', status: 'moderate' }
];

const pollutantDistribution = [
  { name: 'PM2.5', value: 35, color: '#8884d8' },
  { name: 'PM10', value: 28, color: '#82ca9d' },
  { name: 'NO₂', value: 20, color: '#ffc658' },
  { name: 'SO₂', value: 12, color: '#ff7300' },
  { name: 'CO', value: 5, color: '#00ff00' }
];

const statusColors = {
  safe: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  dangerous: 'bg-red-100 text-red-800 border-red-200'
};

const Analytics = () => {
  const { t } = useLanguage();
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('Back to Dashboard', 'डैशबोर्ड पर वापस')}
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-3xl font-bold text-gray-900">{t('Environmental Analytics', 'पर्यावरणीय विश्लेषण')}</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                {t('Filter', 'फ़िल्टर')}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t('Export', 'निर्यात')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t('Air Pollution Companies', 'वायु प्रदूषण कंपनियां')}</p>
                  <p className="text-2xl font-bold text-gray-900">14</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t('High Risk', 'उच्च जोखिम')}</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t('Avg Compliance', 'औसत अनुपालन')}</p>
                  <p className="text-2xl font-bold text-green-600">67%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t('Air Quality Alerts', 'वायु गुणवत्ता अलर्ट')}</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('Overview', 'अवलोकन')}</TabsTrigger>
            <TabsTrigger value="industries">{t('Industries', 'उद्योग')}</TabsTrigger>
            <TabsTrigger value="pollutants">{t('Pollutants', 'प्रदूषक')}</TabsTrigger>
            <TabsTrigger value="compliance">{t('Compliance', 'अनुपालन')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Polluters */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('Top Polluters', 'शीर्ष प्रदूषक')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPolluters.map((company, index) => (
                      <div key={company.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{company.name}</p>
                            <p className="text-sm text-gray-500">{company.industry}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600">{company.aqi}</p>
                          <Badge className={statusColors[company.status]}>
                            {company.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Toxin Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('Air Pollutant Distribution', 'वायु प्रदूषक वितरण')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pollutantDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pollutantDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="industries" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('Industry Performance', 'उद्योग प्रदर्शन')}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant={selectedTimeRange === '1m' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedTimeRange('1m')}>1M</Button>
                    <Button variant={selectedTimeRange === '3m' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedTimeRange('3m')}>3M</Button>
                    <Button variant={selectedTimeRange === '6m' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedTimeRange('6m')}>6M</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={industryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="industry" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgAQI" fill="#8884d8" name="Average AQI" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pollutants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Pollutant Levels & Trends', 'प्रदूषक स्तर और रुझान')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pollutantTrends.map((pollutant) => (
                    <div key={pollutant.pollutant} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{pollutant.pollutant}</h4>
                        <span className={`text-sm font-medium ${
                          pollutant.change.startsWith('+') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {pollutant.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {pollutant.value}
                      </div>
                      <Badge className={
                        pollutant.status === 'good' ? statusColors.safe :
                        pollutant.status === 'moderate' ? statusColors.moderate :
                        statusColors.dangerous
                      }>
                        {pollutant.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Industry Compliance Trends', 'उद्योग अनुपालन रुझान')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="steel" stroke="#8884d8" strokeWidth={2} name="Steel Manufacturing" />
                    <Line type="monotone" dataKey="power" stroke="#82ca9d" strokeWidth={2} name="Power Generation" />
                    <Line type="monotone" dataKey="metal" stroke="#ffc658" strokeWidth={2} name="Metal Processing" />
                    <Line type="monotone" dataKey="wire" stroke="#ff7300" strokeWidth={2} name="Wire & Cable Manufacturing" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
