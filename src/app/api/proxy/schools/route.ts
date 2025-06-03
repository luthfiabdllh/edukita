const EXTERNAL_API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://intero-rest-api.vercel.app/api/sekolah"

// GET all schools
export async function GET() {
  try {
    const response = await fetch(EXTERNAL_API)
    
    if (!response.ok) {
      return Response.json({ error: `API error: ${response.status}` }, { status: response.status })
    }
    
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to fetch schools' }, { status: 500 })
  }
}

// POST new school
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const response = await fetch(EXTERNAL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to add school' }, { status: 500 })
  }
}