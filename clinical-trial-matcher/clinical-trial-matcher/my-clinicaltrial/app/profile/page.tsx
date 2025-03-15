'use client';

import { useState, useEffect } from 'react';
import { supabase, uploadFile } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Button, Textarea } from '@nextui-org/react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [conditions, setConditions] = useState('');
  const [pastTreatments, setPastTreatments] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [discontinuationReasons, setDiscontinuationReasons] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [parsedData, setParsedData] = useState<any>(null);


  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const profileData = await response.json();
          if (profileData) {
            setConditions(profileData.conditions || '');
            setPastTreatments(profileData.prior_treatments || '');
            setOutcomes(profileData.outcomes || '');
            setSideEffects(profileData.side_effects || '');
            setDiscontinuationReasons(
              profileData.discontinuation_reasons || ''
            );
            setUploadedFiles(profileData.documents || []);
          }
        } else {
          console.error('Failed to fetch profile:', response.statusText);
        }
      }

      setLoading(false);
    };

    fetchUserAndProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conditions,
          prior_treatments: pastTreatments,
          outcomes,
          side_effects: sideEffects,
          discontinuation_reasons: discontinuationReasons,
          documents: uploadedFiles
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Optionally, display a success message or update UI
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const filesToUpload = Array.from(e.target.files);
      setFiles(filesToUpload);

      // Upload files and store their paths
      const uploadedPaths = [];
      for (const file of filesToUpload) {
        const filePath = await uploadFile(file, user.id);
        uploadedPaths.push(filePath);

        //Parse Document
        const publicUrl = supabase.storage.from('documents').getPublicUrl(filePath)
        const parseResponse = await fetch('/api/ai/parse-document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fileUrl: publicUrl.data.publicUrl})
        })

        if(parseResponse.ok){
            const data = await parseResponse.json();
            setParsedData(data)
            console.log("Parsed Data", data)
        } else {
            console.error("Failed to parse")
        }
      }
        setUploadedFiles([...uploadedFiles, ...uploadedPaths]);


    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {user ? `Welcome, ${user.email}` : 'User Profile'}
        </h1>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label
              htmlFor="conditions"
              className="block text-sm font-medium text-gray-700"
            >
              Conditions
            </label>
            <Textarea
              id="conditions"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="pastTreatments"
              className="block text-sm font-medium text-gray-700"
            >
              Past Treatments
            </label>
            <Textarea
              id="pastTreatments"
              value={pastTreatments}
              onChange={(e) => setPastTreatments(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="outcomes"
              className="block text-sm font-medium text-gray-700"
            >
              Outcomes
            </label>
            <Textarea
              id="outcomes"
              value={outcomes}
              onChange={(e) => setOutcomes(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="sideEffects"
              className="block text-sm font-medium text-gray-700"
            >
              Side Effects
            </label>
            <Textarea
              id="sideEffects"
              value={sideEffects}
              onChange={(e) => setSideEffects(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="discontinuationReasons"
              className="block text-sm font-medium text-gray-700"
            >
              Discontinuation Reasons
            </label>
            <Textarea
              id="discontinuationReasons"
              value={discontinuationReasons}
              onChange={(e) => setDiscontinuationReasons(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input type="file" onChange={handleFileChange} multiple />
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
             {uploadedFiles.length > 0 && (
              <div>
                <p>Uploaded Files:</p>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Display parsed data */}
            {parsedData && (
                <div>
                    <h3 className="text-lg font-semibold">Parsed Data:</h3>
                    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                </div>
            )}
          </div>
          <Button type="submit" color="primary">
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}