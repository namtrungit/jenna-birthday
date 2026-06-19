const QUIZ_COMPLETED_KEY = "jenna-birthday-quiz-completed"
const QUIZ_ANSWERS_KEY = "jenna-birthday-quiz-answers"

export function isQuizCompleted(): boolean {
  return sessionStorage.getItem(QUIZ_COMPLETED_KEY) === "true"
}

export function setQuizCompleted(): void {
  sessionStorage.setItem(QUIZ_COMPLETED_KEY, "true")
}

export function saveQuizAnswers(answers: Record<string, string>): void {
  sessionStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(answers))
}

export function getQuizAnswers(): Record<string, string> {
  const raw = sessionStorage.getItem(QUIZ_ANSWERS_KEY)
  if (!raw) return {}

  try {
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return {}
  }
}
