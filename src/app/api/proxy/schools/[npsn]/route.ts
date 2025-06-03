const EXTERNAL_API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://intero-rest-api.vercel.app/api/sekolah"

// GET a specific school
export async function GET(req: Request, { params }: { params: { npsn: string } }) {
  try {
    const { npsn } = params
    const response = await fetch(`${EXTERNAL_API}/${npsn}`)
    
    if (!response.ok) {
      return Response.json({ error: `API error: ${response.status}` }, { status: response.status })
    }
    
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to fetch school data' }, { status: 500 })
  }
}

// PUT (update) a school
export async function PUT(req: Request, { params }: { params: { npsn: string } }) {
  try {
    const { npsn } = params
    const body = await req.json()
    
    const response = await fetch(`${EXTERNAL_API}/${npsn}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to update school' }, { status: 500 })
  }
}

// DELETE a school
export async function DELETE(req: Request, { params }: { params: { npsn: string } }) {
  try {
    const { npsn } = params
    const response = await fetch(`${EXTERNAL_API}/${npsn}`, {
      method: 'DELETE',
    })
    
    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to delete school' }, { status: 500 })
  }
}