import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QUESTIONS } from "@/data/questions"
import { isAuthenticated } from "@/lib/auth"
import { countCorrectAnswers, isAnswerCorrect } from "@/lib/answers"
import {
  getQuizAnswers,
  isQuizCompleted,
  saveQuizAnswers,
  setQuizCompleted,
} from "@/lib/quiz"
import { cn } from "@/lib/utils"

function QuestionsPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    getQuizAnswers()
  )
  const [isFinished, setIsFinished] = useState(false)
  const [textError, setTextError] = useState("")

  const totalQuestions = QUESTIONS.length
  const currentQuestion = QUESTIONS[currentIndex]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? "" : ""
  const isTextQuestion = currentQuestion?.type === "text"
  const isCurrentAnswerCorrect = currentQuestion
    ? isAnswerCorrect(currentQuestion, currentAnswer)
    : false
  const progress = isFinished
    ? 100
    : ((currentIndex + 1) / totalQuestions) * 100

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true })
      return
    }

    if (isQuizCompleted()) {
      navigate("/memories", { replace: true })
    }
  }, [navigate])

  function handleSelectOption(option: string) {
    if (!currentQuestion) return

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }))
  }

  function handleTextChange(value: string) {
    if (!currentQuestion) return

    setTextError("")
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  function handleNext() {
    if (!currentQuestion || !currentAnswer.trim()) return

    if (isTextQuestion && !isCurrentAnswerCorrect) {
      setTextError(
        currentQuestion.hint
          ? `Chưa đúng rồi. Gợi ý: ${currentQuestion.hint}`
          : "Chưa đúng rồi, thử lại nhé 💗"
      )
      return
    }

    setTextError("")

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
      return
    }

    saveQuizAnswers(answers)
    setQuizCompleted()
    setIsFinished(true)
  }

  function handleBack() {
    if (currentIndex > 0) {
      setTextError("")
      setCurrentIndex((prev) => prev - 1)
    }
  }

  function handleGoToMemories() {
    navigate("/memories")
  }

  const correctCount = countCorrectAnswers(answers, QUESTIONS)
  const completionMessage =
    correctCount >= Math.ceil(totalQuestions * 0.7)
      ? "Em nhớ rất rõ về mình — cảm ơn em nhiều lắm 💕"
      : "Dù đúng hay sai, mỗi kỷ niệm với em đều đặc biệt 💗"

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-[#FFF5F7] px-6 py-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-[#E91E8C]">
            <span>{isFinished ? "Hoàn thành" : "Câu hỏi về đôi mình"}</span>
            <span>
              {isFinished
                ? `${totalQuestions}/${totalQuestions}`
                : `${currentIndex + 1}/${totalQuestions}`}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#F8BBD9]/40">
            <div
              className="h-full rounded-full bg-[#E91E8C] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {isFinished ? (
          <Card className="border-[#F8BBD9]/60 bg-white shadow-[0_8px_30px_rgba(233,30,140,0.08)]">
            <CardHeader className="text-center">
              <p className="text-sm text-[#E91E8C]">🎂 Happy Birthday, Jenna</p>
              <CardTitle className="text-xl text-[#4A4A4A]">
                Cảm ơn em đã trả lời
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-sm text-[#4A4A4A]/80">{completionMessage}</p>
              {totalQuestions > 0 && (
                <p className="text-sm text-[#E91E8C]">
                  Em trả lời đúng {correctCount}/{totalQuestions} câu
                </p>
              )}
              <Button
                onClick={handleGoToMemories}
                className="h-10 w-full bg-[#E91E8C] text-white hover:bg-[#FF69B4]"
              >
                Xem kỷ niệm của mình →
              </Button>
            </CardContent>
          </Card>
        ) : (
          currentQuestion && (
            <Card className="border-[#F8BBD9]/60 bg-white shadow-[0_8px_30px_rgba(233,30,140,0.08)]">
              <CardHeader>
                <CardTitle className="text-lg leading-snug text-[#4A4A4A]">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion.type === "choice" ? (
                  <div className="flex flex-col gap-2">
                    {currentQuestion.options?.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption(option)}
                        className={cn(
                          "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                          currentAnswer === option
                            ? "border-[#E91E8C] bg-[#FFF5F7] text-[#4A4A4A]"
                            : "border-[#F8BBD9] bg-white text-[#4A4A4A] hover:border-[#E91E8C]/60 hover:bg-[#FFF5F7]/50"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder="Nhập câu trả lời của em..."
                      rows={3}
                      aria-invalid={Boolean(textError)}
                      className={cn(
                        "w-full resize-none rounded-lg border bg-[#FFF5F7]/50 px-3 py-2 text-sm text-[#4A4A4A] outline-none placeholder:text-[#E91E8C]/50 focus-visible:ring-3",
                        textError
                          ? "border-[#E91E8C] focus-visible:border-[#E91E8C] focus-visible:ring-[#E91E8C]/20"
                          : isCurrentAnswerCorrect
                            ? "border-[#E91E8C]/80 focus-visible:border-[#E91E8C] focus-visible:ring-[#E91E8C]/20"
                            : "border-[#F8BBD9] focus-visible:border-[#E91E8C] focus-visible:ring-[#E91E8C]/20"
                      )}
                    />
                    {textError && (
                      <p className="text-sm text-[#E91E8C]">{textError}</p>
                    )}
                    {isCurrentAnswerCorrect && !textError && (
                      <p className="text-sm text-[#E91E8C]/80">Đúng rồi! 💕</p>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  {currentIndex > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 border-[#F8BBD9] text-[#4A4A4A] hover:bg-[#FFF5F7]"
                    >
                      Quay lại
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!currentAnswer.trim()}
                    className="h-10 flex-1 bg-[#E91E8C] text-white hover:bg-[#FF69B4] disabled:opacity-50"
                  >
                    {currentIndex === totalQuestions - 1 ? "Hoàn thành" : "Tiếp theo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </main>
  )
}

export default QuestionsPage
