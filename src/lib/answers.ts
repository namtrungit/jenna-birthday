import type { Question } from "@/data/questions"

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
}

function getAcceptedAnswers(question: Question): string[] {
  if (question.type === "choice") {
    return [question.correctAnswer]
  }

  return [question.correctAnswer, ...(question.acceptedAnswers ?? [])]
}

export function isAnswerCorrect(question: Question, answer: string): boolean {
  if (!answer.trim()) return false

  const normalizedAnswer = normalizeAnswer(answer)

  return getAcceptedAnswers(question).some(
    (accepted) => normalizeAnswer(accepted) === normalizedAnswer
  )
}

export function countCorrectAnswers(
  answers: Record<string, string>,
  questions: Question[]
): number {
  return questions.reduce((count, question) => {
    const answer = answers[question.id]
    if (!answer) return count
    return isAnswerCorrect(question, answer) ? count + 1 : count
  }, 0)
}
