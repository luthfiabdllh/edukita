import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const EXTERNAL_API = process.env.NEXT_PUBLIC_API_BASE_URL
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

async function getAccessToken(req: Request) {
  const token = await getToken({
    req: req as unknown as NextRequest,
    secret: NEXTAUTH_SECRET,
  })

  return token?.accessToken ?? null
}

// GET a specific school
export async function GET(req: Request, { params }: { params: Promise<{ npsn: string }> }) {
  try {
    const token = await getAccessToken(req)
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const npsn = (await params).npsn
    const response = await fetch(`${EXTERNAL_API}/${npsn}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

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
export async function PUT(req: Request, { params }: { params: Promise<{ npsn: string }> }) {
  try {
    const token = await getAccessToken(req)
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const npsn = (await params).npsn
    const body = await req.json()

    const response = await fetch(`${EXTERNAL_API}/${npsn}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function DELETE(req: Request, { params }: { params: Promise<{ npsn: string }> }) {
  try {
    const token = await getAccessToken(req)
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const npsn = (await params).npsn
    const response = await fetch(`${EXTERNAL_API}/${npsn}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('API proxy error:', error)
    return Response.json({ error: 'Failed to delete school' }, { status: 500 })
  }
}
