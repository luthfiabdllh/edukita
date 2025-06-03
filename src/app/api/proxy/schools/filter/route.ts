const EXTERNAL_API = process.env.NEXT_PUBLIC_API_BASE_URL

// GET filtered schools
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const searchParams = url.searchParams
    
    const response = await fetch(`${EXTERNAL_API}/filter?${searchParams}`)
    
    if (!response.ok) {
      return Response.json({ error: `API error: ${response.status}` }, { status: response.status })
    }
    
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to fetch filtered schools' }, { status: 500 })
  }
}