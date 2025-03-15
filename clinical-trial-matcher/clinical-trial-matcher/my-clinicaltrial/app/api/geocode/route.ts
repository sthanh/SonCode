import { NextResponse } from 'next/server';

const opencageApiKey = process.env.OPENCAGE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 });
  }

  try {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${opencageApiKey}`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return NextResponse.json({ lat, lng });
    } else {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error geocoding location:', error);
    return NextResponse.json(
      { error: 'Failed to geocode location' },
      { status: 500 }
    );
  }
}