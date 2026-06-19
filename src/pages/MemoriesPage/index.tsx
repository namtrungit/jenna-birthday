import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { isAuthenticated } from "@/lib/auth"
import { isQuizCompleted } from "@/lib/quiz"

function MemoriesPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true })
      return
    }

    if (!isQuizCompleted()) {
      navigate("/questions", { replace: true })
    }
  }, [navigate])

  return (
    <main>
      <h1>MemoriesPage</h1>
    </main>
  )
}

export default MemoriesPage
