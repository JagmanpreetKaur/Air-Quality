import React, { useState } from 'react';
import { Search, X, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allCompanies = [
  // Air companies
  { id: 'tata-steel-jamshedpur', name: 'Tata Steel Jamshedpur', industry: 'Steel Manufacturing', toxinType: 'air', status: 'moderate', location: 'Sakchi, Jamshedpur', logo: '🏭' },
  { id: 'jusco-power', name: 'JUSCO Power Plant', industry: 'Power Generation', toxinType: 'air', status: 'dangerous', location: 'Adityapur, Jamshedpur', logo: '⚡' },
  { id: 'tinplate-company', name: 'Tinplate Company of India', industry: 'Metal Processing', toxinType: 'air', status: 'moderate', location: 'Golmuri, Jamshedpur', logo: '🔩' },
  { id: 'usha-martin', name: 'Usha Martin Limited', industry: 'Wire & Cable Manufacturing', toxinType: 'air', status: 'safe', location: 'Randhir Verma Chowk, Jamshedpur', logo: '🔌' },
  
  // Water companies
  { id: 'tata-steel-water', name: 'Tata Steel Water Treatment', industry: 'Steel Manufacturing', toxinType: 'water', status: 'moderate', location: 'Kharkai River, Jamshedpur', logo: '🏭' },
  { id: 'jusco-water', name: 'JUSCO Water Supply', industry: 'Water Treatment', toxinType: 'water', status: 'safe', location: 'Dimna Lake, Jamshedpur', logo: '💧' },
  { id: 'karandih-effluent', name: 'Karandih Industrial Area', industry: 'Industrial Effluent', toxinType: 'water', status: 'dangerous', location: 'Karandih, Jamshedpur', logo: '🏭' },
  
  // Soil companies
  { id: 'adityapur-industrial', name: 'Adityapur Industrial Area', industry: 'Mixed Industries', toxinType: 'soil', status: 'dangerous', location: 'Adityapur, Jamshedpur', logo: '🏭' },
  { id: 'tatanagar-soil', name: 'Tatanagar Railway Area', industry: 'Transportation Hub', toxinType: 'soil', status: 'moderate', location: 'Tatanagar, Jamshedpur', logo: '🚂' },
  
  // Radioactive companies
  { id: 'uranium-corporation', name: 'Uranium Corporation of India', industry: 'Mining & Processing', toxinType: 'radioactive', status: 'moderate', location: 'Jaduguda Mine, Jamshedpur', logo: '☢️' }
];

const statusColors = {
  safe: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  dangerous: 'bg-red-100 text-red-800'
};

const toxinColors = {
  air: 'bg-blue-100 text-blue-800',
  water: 'bg-cyan-100 text-cyan-800',
  soil: 'bg-amber-100 text-amber-800',
  radioactive: 'bg-purple-100 text-purple-800'
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCompanies = allCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Search Companies</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by company name or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-96">
          {searchQuery === '' ? (
            <div className="text-center text-gray-500 py-8">
              Start typing to search for companies in Jamshedpur
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No companies found matching "{searchQuery}"
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCompanies.map((company) => (
                <Link
                  key={company.id}
                  to={`/${company.toxinType}/company/${company.id}`}
                  onClick={onClose}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{company.logo}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Building className="w-4 h-4 mr-1" />
                          {company.industry}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {company.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={toxinColors[company.toxinType]}>
                        {company.toxinType.toUpperCase()}
                      </Badge>
                      <Badge className={statusColors[company.status]}>
                        {company.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
