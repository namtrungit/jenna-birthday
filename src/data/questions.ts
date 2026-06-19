export type ChoiceQuestion = {
  id: string;
  text: string;
  type: "choice";
  options: string[];
  correctAnswer: string;
};

export type TextQuestion = {
  id: string;
  text: string;
  type: "text";
  correctAnswer: string;
  acceptedAnswers?: string[];
  hint?: string;
};

export type Question = ChoiceQuestion | TextQuestion;

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Lần đầu hai đứa gặp nhau ở đâu?",
    type: "choice",
    options: ["Quán cà phê", "Trường học", "Qua bạn chung", "Online"],
    correctAnswer: "Quán cà phê",
  },
  {
    id: "q2",
    text: "Buổi hẹn đầu tiên mình đi đâu?",
    type: "choice",
    options: ["Xem phim", "Đi ăn", "Đi dạo", "Đi chơi game"],
    correctAnswer: "Đi ăn",
  },
  {
    id: "q3",
    text: "Món Jenna thích nhất là gì?",
    type: "choice",
    options: ["Pizza", "Sushi", "Trà sữa", "Bánh ngọt"],
    correctAnswer: "Bánh ngọt",
  },
  {
    id: "q4",
    text: "Bài hát 'của đôi mình' là gì?",
    type: "choice",
    options: ["Perfect", "Lover", "A Thousand Years", "Bài khác"],
    correctAnswer: "Perfect",
  },
  {
    id: "q5",
    text: "Kỷ niệm nào khiến em cười nhất?",
    type: "choice",
    options: [
      "Chuyến đi chơi",
      "Lần đầu gặp",
      "Một câu nói hài",
      "Surprise của anh",
    ],
    correctAnswer: "Surprise của anh",
  },
  {
    id: "q6",
    text: "Jenna hay gọi anh bằng cách nào?",
    type: "choice",
    options: ["Babe", "Anh yêu", "Nickname riêng", "Tên thật"],
    correctAnswer: "Nickname riêng",
  },
  {
    id: "q7",
    text: "Nơi mình muốn đi cùng nhau nhất?",
    type: "choice",
    options: ["Biển", "Núi", "Nước ngoài", "Bất cứ đâu có nhau"],
    correctAnswer: "Bất cứ đâu có nhau",
  },
  {
    id: "q8",
    text: "Câu inside joke hay được nhắc lại là gì?",
    type: "text",
    correctAnswer: "love",
    acceptedAnswers: ["yeu", "love"],
    hint: "Một từ tiếng Anh ngắn thôi 💕",
  },
  {
    id: "q9",
    text: "Hôm nay em muốn nói điều gì?",
    type: "text",
    correctAnswer: "happy birthday",
    acceptedAnswers: ["sinh nhật vui vẻ", "chúc mừng sinh nhật"],
    hint: "Liên quan đến ngày hôm nay 🎂",
  },
  {
    id: "q10",
    text: "Một từ mô tả mối quan hệ của mình?",
    type: "text",
    correctAnswer: "forever",
    acceptedAnswers: ["mãi mãi", "love"],
    hint: "Tiếng Anh hoặc tiếng Việt đều được",
  },
];
