import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const phase = searchParams.get('phase');
  const status = searchParams.get('status');
  const location = searchParams.get('location');
  const distance = searchParams.get('distance');

  // Construct the ClinicalTrials.gov API URL
  const baseUrl = 'https://clinicaltrials.gov/api/v2/studies?';
  let url = `${baseUrl}format=json`;

  let queryTerms = [];
  if (keyword) {
    queryTerms.push(keyword);
  }
  if (phase) {
    queryTerms.push(phase); // Add phase directly to the query terms
  }

  if (queryTerms.length > 0) {
      url += `&query.term=${queryTerms.join(' AND ')}`;
  }

  if (status) {
    url += `&filter.overallStatus=${status}`;
  }

  if (location && distance) {
    // Geocode the location
    const geocodeUrl = new URL('/api/geocode', origin);
    geocodeUrl.searchParams.append('location', location);
    const geocodeResponse = await fetch(geocodeUrl.toString());

    if (geocodeResponse.ok) {
      const { lat, lng } = await geocodeResponse.json();
      console.log(`Geocoded coordinates for ${location}:`, { lat, lng }); // Log coordinates
      // Use the coordinates for filtering (example: within 50 miles)
      const distanceValue = distance.replace(/[^0-9.]/g, ''); // Extract numeric part
      const distanceUnit = distance.includes('km') ? 'km' : 'mi'; // Default to miles if not specified
      console.log(`Using distance: ${distanceValue}${distanceUnit}`);
      url += `&filter.geo=distance(${lat},${lng},${distanceValue}${distanceUnit})`;
    } else {
      const errorText = await geocodeResponse.text();
      console.error('Geocoding failed:', errorText);
      return new NextResponse(
        JSON.stringify({ error: 'Geocoding failed', details: errorText }),
        {
          status: geocodeResponse.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }
  }

  if (!keyword && !phase && !status && !location && !distance) {
    url += '&sort=LastUpdatePostDate:desc';
  }

  console.log('Constructed URL:', url); // Log the constructed URL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ClinicalTrials.gov API error:', errorText);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch data', details: errorText }),
        {
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }
    const data = await response.json();
    console.log('ClinicalTrials.gov response:', data); // Log the entire response
    if (data.studies && data.studies.length > 0) {
      console.log('First study protocolSection:', data.studies[0].protocolSection);
    }

    //  return the studies
    return new NextResponse(JSON.stringify(data.studies || []), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error fetching data from ClinicalTrials.gov:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}