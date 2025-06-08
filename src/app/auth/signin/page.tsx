'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { MessageCircleWarning } from 'lucide-react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const { theme, resolvedTheme } = useTheme();
    const [logoSrc, setLogoSrc] = useState('/logo.svg');
  
  useEffect(() => {
    const isDark = theme === 'dark' || resolvedTheme === 'dark';
    setLogoSrc(isDark ? '/logo_light.svg' : '/logo.svg');
  }, [theme, resolvedTheme]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
        console.log("Attempting login with:", { email, password: "***" });
        
        const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        });
        
        console.log('SignIn result:', result);
        
        if (result?.error) {
        console.error('Login error:', result.error);
        setError('Email atau password salah');
        } else if (result?.ok) {
        console.log('Login successful, redirecting...');
        router.push('/dashboard');
        router.refresh();
        return;
        } else {
        console.log('Unexpected result:', result);
        setError('Terjadi kesalahan saat login');
        }
    } catch (error) {
        console.error('Login error:', error);
        setError('Terjadi kesalahan pada server');
    } finally {
        setIsLoading(false);
    }
    };

  useEffect(() => {
    if (status === 'authenticated' && session) {
      console.log('User already authenticated, redirecting to dashboard');
      router.push('/dashboard');
      return;
    }
  }, [session, status, router]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            src={logoSrc}
            alt="EduKita Logo"
            width={128}
            height={128}
            className="mx-auto h-24 w-24"
            priority
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Login ke EduKita
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan email dan password untuk akses sistem
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Login Admin</CardTitle>
            <CardDescription>
              Masukkan kredensial anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <MessageCircleWarning className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col mt-4">
              <Button 
                type="submit"
                className={cn("w-full", isLoading && "opacity-70")}
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Login"}
              </Button>
              
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link 
                  href="/"
                  className="text-blue-500 hover:underline"
                >
                  Kembali ke beranda
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground">
          Sistem Manajemen Data Pendidikan
        </p>
      </div>
    </div>
  );
}