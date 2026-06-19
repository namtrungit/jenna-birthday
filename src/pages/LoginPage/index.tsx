import { useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AUTH_CREDENTIALS, AUTH_HINTS } from "@/config/auth"
import { isAuthenticated, setAuthenticated } from "@/lib/auth"

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/questions", { replace: true })
    }
  }, [navigate])

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    const isValid =
      username === AUTH_CREDENTIALS.username &&
      password === AUTH_CREDENTIALS.password

    if (isValid) {
      setAuthenticated()
      navigate("/questions")
      return
    }

    setError("Hmm, that's not quite right. Try again, love 💗")
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-[#FFF5F7] px-6 py-10">
      <form
        onSubmit={handleLogin}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-[#F8BBD9]/60 bg-white p-8 shadow-[0_8px_30px_rgba(233,30,140,0.08)]"
      >
        <div className="space-y-1 text-center">
          <p className="text-sm text-[#E91E8C]">✨ A little surprise for you</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="username" className="text-[#4A4A4A]">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="border-[#F8BBD9] bg-[#FFF5F7]/50 focus-visible:border-[#E91E8C] focus-visible:ring-[#E91E8C]/20"
            required
          />
          <p className="text-xs text-[#E91E8C]/80">{AUTH_HINTS.username}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-[#4A4A4A]">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="border-[#F8BBD9] bg-[#FFF5F7]/50 focus-visible:border-[#E91E8C] focus-visible:ring-[#E91E8C]/20"
            required
          />
          <p className="text-xs text-[#E91E8C]/80">{AUTH_HINTS.password}</p>
        </div>

        {error && (
          <p className="rounded-lg bg-[#FFF5F7] px-3 py-2 text-center text-sm text-[#E91E8C]">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="h-10 w-full bg-[#E91E8C] text-white hover:bg-[#FF69B4]"
        >
          Login
        </Button>
      </form>
    </main>
  )
}

export default LoginPage
