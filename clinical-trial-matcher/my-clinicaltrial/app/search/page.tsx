'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Select, SelectItem, Card, CardHeader, CardBody, CardFooter, Divider, Link as NextUILink } from '@nextui-org/react';

interface Trial {
  id: string;
  title: string;
  location: string;
  phase: string;
  description: string;
  url: string;
  relevanceScore?: number;
  relevanceExplanation?: string;
}

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [phase, setPhase] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [results, setResults] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile');
        // Handle the case where the profile cannot be fetched
      }
    };

    fetchProfile();
  }, []);

  const handleBasicSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setEnhanced(false);

    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (phase) params.append('phase', phase);
      if (status) params.append('status', status);
      if (location) params.append('location', location);
      if (distance) params.append('distance', distance);

      const response = await fetch(`/api/trials/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }
      const data = await response.json();
      const transformedData = data.map((item: any) => {
        const fields = item.protocolSection;
        return {
          id: fields.identificationModule.nctId,
          title: fields.identificationModule.officialTitle,
          location:
            fields.contactsLocationsModule.locations?.[0]?.city +
            ', ' +
            fields.contactsLocationsModule.locations?.[0]?.state,
          phase: fields.designModule?.phaseList?.phase?.[0] || 'Unknown',
          description: fields.descriptionModule.briefSummary,
          url: `https://clinicaltrials.gov/study/${fields.identificationModule.nctId}`,
        };
      });
      if (profile) {
        const rankResponse = await fetch('/api/ai/rank-trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ profile, trials: transformedData })
        });

        if (rankResponse.ok) {
          const rankedTrials = await rankResponse.json();
          setResults(rankedTrials);
        } else {
          console.error("Failed to rank the trials")
          setResults(transformedData)
        }
      } else {
        setResults(transformedData);
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhancedSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setEnhanced(true);
    let enhancedQuery = keyword;

    try {
      const enhanceResponse = await fetch('/api/ai/enhance-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: keyword }),
      });

      if (enhanceResponse.ok) {
        const { enhancedQuery: aiEnhancedQuery } = await enhanceResponse.json();
        enhancedQuery = aiEnhancedQuery || keyword;
      } else {
        console.error('Failed to enhance query');
      }
    } catch (enhanceError) {
      console.error('Error enhancing query:', enhanceError);
    }


    try {
      const params = new URLSearchParams();
      if (enhancedQuery) params.append('keyword', enhancedQuery);
      if (phase) params.append('phase', phase);
      if (status) params.append('status', status);
      if (location) params.append('location', location);
      if (distance) params.append('distance', distance);

      const response = await fetch(`/api/trials/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const transformedData = data.map((item: any) => {
        const fields = item.protocolSection;
        return {
          id: fields.identificationModule.nctId,
          title: fields.identificationModule.officialTitle,
          location:
            fields.contactsLocationsModule.locations?.[0]?.city +
            ', ' +
            fields.contactsLocationsModule.locations?.[0]?.state,
          phase: fields.designModule?.phaseList?.phase?.[0] || 'Unknown',
          description: fields.descriptionModule.briefSummary,
          url: `https://clinicaltrials.gov/study/${fields.identificationModule.nctId}`,
        };
      });
      if (profile) {
        const rankResponse = await fetch('/api/ai/rank-trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ profile, trials: transformedData })
        });

        if (rankResponse.ok) {
          const rankedTrials = await rankResponse.json();
          setResults(rankedTrials);
        } else {
          console.error("Failed to rank the trials")
          setResults(transformedData)
        }
      } else {
        setResults(transformedData)
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const phases = [
    { key: 'Phase 1', label: 'Phase 1' },
    { key: 'Phase 2', label: 'Phase 2' },
    { key: 'Phase 3', label: 'Phase 3' },
    { key: 'Phase 4', label: 'Phase 4' },
  ];

  const statuses = [
    { key: 'ACTIVE_NOT_RECRUITING', label: 'Active, not recruiting' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'ENROLLING_BY_INVITATION', label: 'Enrolling by invitation' },
    { key: 'NOT_YET_RECRUITING', label: 'Not yet recruiting' },
    { key: 'RECRUITING', label: 'Recruiting' },
    { key: 'SUSPENDED', label: 'Suspended' },
    { key: 'TERMINATED', label: 'Terminated' },
    { key: 'WITHDRAWN', label: 'Withdrawn' },
    { key: 'AVAILABLE', label: 'Available' },
    { key: 'NO_LONGER_AVAILABLE', label: 'No longer available' },
    { key: 'TEMPORARILY_NOT_AVAILABLE', label: 'Temporarily not available' },
    { key: 'APPROVED_FOR_MARKETING', label: 'Approved for marketing' },
    { key: 'WITHHELD', label: 'Withheld' },
    { key: 'UNKNOWN', label: 'Unknown' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Clinical Trial Search
        </h1>
        <div className="space-y-4">
          <Input
            type="text"
            label="Keywords"
            placeholder="Enter keywords (condition, medication, etc.)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-wrap gap-4">
            <Select
              label="Phase"
              placeholder="Select a phase"
              className="w-full sm:w-1/3"
              onChange={(e) => setPhase(e.target.value)}
            >
              {phases.map((phase) => (
                <SelectItem key={phase.key} value={phase.key}>
                  {phase.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Status"
              placeholder="Select a status"
              className="w-full sm:w-1/3"
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <SelectItem key={status.key} value={status.key}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Location"
              placeholder="Enter location (city, state, or zip)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full sm:w-1/2"
            />
            <Input
              type="text"
              label="Distance"
              placeholder="Enter distance (e.g., 50mi)"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full sm:w-1/2"
            />
          </div>

          <Button color="primary" onClick={() => handleBasicSearch()} className="w-full">
            Search
          </Button>
          <Button color="secondary" onClick={() => handleEnhancedSearch()} className="w-full">
            Enhance Search with AI
          </Button>

          {/* Search Results */}
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold text-center">Search Results</h2>
              {results.map((trial) => (
                <Card key={trial.id} className="mb-4">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md font-semibold">{trial.title}</p>
                      <p className="text-small text-default-500">{trial.location}</p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p><span className="font-semibold">Phase:</span> {trial.phase}</p>
                    <p>{trial.description}</p>
                    {trial.relevanceScore && (
                      <p>Relevance Score: {trial.relevanceScore}/10</p>
                    )}
                    {trial.relevanceExplanation && (
                      <p>Explanation: {trial.relevanceExplanation}</p>
                    )}
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <NextUILink href={trial.url} target="_blank" rel="noopener noreferrer" color="primary">
                      View on ClinicalTrials.gov
                    </NextUILink>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// TODO: Implement AI-powered ranking (relevance score) after profile saving is implemented.