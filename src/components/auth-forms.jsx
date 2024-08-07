'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { IconLoader2 } from "@tabler/icons-react"
import Image from "next/image"
import { checkPasswordError } from "@/utils/client/ui.utils"


export function LoginForm({ borderless, icon }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const passwordError = checkPasswordError(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    resetForm();
  }

  return (
    <Card className={`mx-auto ${borderless && "border-none shadow-none"} max-w-sm max-md:shadow-none max-md:border-none max-md:bg-background`}>
      {icon && (
        <div className="flex justify-center items-center mt-5">
          <Link href={"/"}>
            <Image src={"/mira.svg"} height={0} alt="mira.ai" width={0} className="w-auto dark:hidden" />
            <Image src={"/mira-dark.svg"} height={0} alt="mira.ai" width={0} className="w-auto dark:block hidden" />
          </Link>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-xs mb-6 text-destructive text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              strongPassword={true}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button disabled={loading} size="lg" type="submit" className="w-full">
            {loading ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>Login Now</>
            )}
          </Button>

          <span className="flex items-center">
            <span className="h-px flex-1 bg-border"></span>
            <span className="shrink-0 text-sm text-muted-foreground px-6">Or</span>
            <span className="h-px flex-1 bg-border"></span>
          </span>

          <Button disabled={loading} variant="outline" type="button" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


export function SignUpForm({ borderless, icon }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPassword2('');
    setError('');
    setLoading(false);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== password2){
      setError("The passwords do not match");
      return;
    }

    const passwordError = checkPasswordError(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }


    resetForm();
  };

  return (
    <Card className={`mx-auto ${borderless && "border-none shadow-none"} max-w-sm max-md:shadow-none max-md:border-none max-md:bg-background`}>
      {icon && (
        <div className="flex justify-center items-center mt-5">
          <Link href={"/"}>
            <Image src={"/mira.svg"} height={0} alt="mira.ai" width={0} className="w-auto dark:hidden" />
            <Image src={"/mira-dark.svg"} height={0} alt="mira.ai" width={0} className="w-auto dark:block hidden" />
          </Link>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-xs mb-6 text-destructive text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <Button disabled={loading} size="lg" type="submit" className="w-full">
            {loading ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>Create an account</>
            )}
          </Button>

          <span className="flex items-center">
            <span className="h-px flex-1 bg-border"></span>
            <span className="shrink-0 text-xs text-muted-foreground px-6">Or</span>
            <span className="h-px flex-1 bg-border"></span>
          </span>

          <Button disabled={loading} variant="outline" type="button" className="w-full">
            Sign up with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
