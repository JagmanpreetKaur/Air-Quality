import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, AlertTriangle, CheckCircle, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const companyData = {
  air: [
    {
      id: 'tata-steel-jamshedpur',
      name: 'Tata Steel Jamshedpur',
      industry: 'Steel Manufacturing',
      location: 'Sakchi, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 89 µg/m³', 'NO₂: 52 ppb', 'SO₂: 34 ppb'],
      compliance: '74%',
      lastUpdate: '2 min ago',
      logo: '🏭'
    },
    {
      id: 'jusco-power',
      name: 'JUSCO Power Plant',
      industry: 'Power Generation',
      location: 'Adityapur, Jamshedpur, Jharkhand',
      status: 'dangerous',
      pollutants: ['PM10: 156 µg/m³', 'CO: 15 ppm', 'O₃: 78 ppb'],
      compliance: '42%',
      lastUpdate: '3 min ago',
      logo: '⚡'
    },
    {
      id: 'tinplate-company',
      name: 'Tinplate Company of India',
      industry: 'Metal Processing',
      location: 'Golmuri, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 67 µg/m³', 'NO₂: 41 ppb', 'SO₂: 28 ppb'],
      compliance: '68%',
      lastUpdate: '1 min ago',
      logo: '🔩'
    },
    {
      id: 'usha-martin',
      name: 'Usha Martin Limited',
      industry: 'Wire & Cable Manufacturing',
      location: 'Randhir Verma Chowk, Jamshedpur, Jharkhand',
      status: 'safe',
      pollutants: ['PM2.5: 45 µg/m³', 'NO₂: 32 ppb', 'SO₂: 18 ppb'],
      compliance: '87%',
      lastUpdate: '4 min ago',
      logo: '🔌'
    },
    {
      id: 'tata-motors-jamshedpur',
      name: 'Tata Motors Jamshedpur',
      industry: 'Automotive Manufacturing',
      location: 'Telco Colony, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 72 µg/m³', 'NO₂: 46 ppb', 'CO: 12 ppm'],
      compliance: '71%',
      lastUpdate: '2 min ago',
      logo: '🚗'
    },
    {
      id: 'hindalco-industries',
      name: 'Hindalco Industries Limited',
      industry: 'Aluminum Manufacturing',
      location: 'Mango, Jamshedpur, Jharkhand',
      status: 'dangerous',
      pollutants: ['PM10: 142 µg/m³', 'SO₂: 58 ppb', 'NO₂: 63 ppb'],
      compliance: '38%',
      lastUpdate: '1 min ago',
      logo: '🏭'
    },
    {
      id: 'tata-chemicals',
      name: 'Tata Chemicals Limited',
      industry: 'Chemical Manufacturing',
      location: 'Jojobera, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 81 µg/m³', 'SO₂: 42 ppb', 'NH₃: 25 ppb'],
      compliance: '66%',
      lastUpdate: '3 min ago',
      logo: '🧪'
    },
    {
      id: 'tata-pigments',
      name: 'Tata Pigments Limited',
      industry: 'Paint & Pigment Manufacturing',
      location: 'Jamshedpur Industrial Area, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 75 µg/m³', 'VOCs: 18 ppm', 'NO₂: 44 ppb'],
      compliance: '69%',
      lastUpdate: '5 min ago',
      logo: '🎨'
    },
    {
      id: 'tata-refractories',
      name: 'Tata Refractories Limited',
      industry: 'Refractory Manufacturing',
      location: 'Joda Road, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM10: 98 µg/m³', 'SO₂: 36 ppb', 'PM2.5: 58 µg/m³'],
      compliance: '72%',
      lastUpdate: '2 min ago',
      logo: '🧱'
    },
    {
      id: 'indian-tube-company',
      name: 'Indian Tube Company',
      industry: 'Steel Tube Manufacturing',
      location: 'Jamshedpur, Jharkhand',
      status: 'safe',
      pollutants: ['PM2.5: 48 µg/m³', 'NO₂: 35 ppb', 'SO₂: 22 ppb'],
      compliance: '84%',
      lastUpdate: '3 min ago',
      logo: '🔩'
    },
    {
      id: 'tata-bluescope-steel',
      name: 'Tata BlueScope Steel',
      industry: 'Coated Steel Manufacturing',
      location: 'Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 69 µg/m³', 'NO₂: 43 ppb', 'SO₂: 31 ppb'],
      compliance: '70%',
      lastUpdate: '4 min ago',
      logo: '🏗️'
    },
    {
      id: 'jamshedpur-textile-mills',
      name: 'Jamshedpur Textile Mills',
      industry: 'Textile Manufacturing',
      location: 'Bistupur, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 78 µg/m³', 'VOCs: 15 ppm', 'NO₂: 38 ppb'],
      compliance: '58%',
      lastUpdate: '6 min ago',
      logo: '🧵'
    },
    {
      id: 'adityapur-industrial-area',
      name: 'Adityapur Industrial Complex',
      industry: 'Mixed Manufacturing Units',
      location: 'Adityapur Industrial Area, Jharkhand',
      status: 'dangerous',
      pollutants: ['PM2.5: 145 µg/m³', 'Mixed: Various', 'VOCs: 35 ppm'],
      compliance: '18%',
      lastUpdate: '1 min ago',
      logo: '🏭'
    },
    {
      id: 'tata-cummins',
      name: 'Tata Cummins Limited',
      industry: 'Engine Manufacturing',
      location: 'Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 71 µg/m³', 'NO₂: 42 ppb', 'CO: 11 ppm'],
      compliance: '67%',
      lastUpdate: '3 min ago',
      logo: '⚙️'
    }
  ]
};

const toxinTitles = {
  air: 'Air Pollution Companies'
};

const statusConfig = {
  safe: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    bgColor: 'bg-green-50'
  },
  moderate: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    bgColor: 'bg-yellow-50'
  },
  dangerous: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertTriangle,
    bgColor: 'bg-red-50'
  }
};

// Add the actual React component here
const CompanyList = () => {
  const { toxinType } = useParams();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const safeToxinType = toxinType ?? 'air';
  const companies = companyData[safeToxinType] || [];
  const title = toxinTitles[safeToxinType] || 'Companies';

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{filteredCompanies.length} companies found</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies, industries, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="safe">Safe</option>
                <option value="moderate">Moderate</option>
                <option value="dangerous">Dangerous</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => {
            const StatusIcon = statusConfig[company.status].icon;
            return (
              <Link key={company.id} to={/air/company/${company.id}}>
                <div className={`bg-white rounded-lg shadow-sm border-2 hover:shadow-md transition-shadow cursor-pointer ${statusConfig[company.status].bgColor}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{company.logo}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{company.name}</h3>
                          <p className="text-sm text-gray-600">{company.industry}</p>
                        </div>
                      </div>
                      <Badge className={`${statusConfig[company.status].color} border`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {company.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {company.location}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-gray-700">Main Pollutants:</h4>
                        <div className="flex flex-wrap gap-1">
                          {company.pollutants.slice(0, 3).map((pollutant, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {pollutant}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-sm">
                          <span className="text-gray-600">Compliance: </span>
                          <span className={`font-medium ${
                            parseInt(company.compliance) >= 80 ? 'text-green-600' :
                            parseInt(company.compliance) >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {company.compliance}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Updated {company.lastUpdate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Add the default export
export default CompanyList;
