/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import WarningIcon from '@mui/icons-material/Warning'
import { useActions, useUIState } from 'ai/rsc'
import { useState } from 'react'
interface PainOption {
  id: number
  name: string
  description: string
}

const painOptions: PainOption[] = [
  {
    id: 1,
    name: 'Sakit Perut PHQ15',
    description: 'Sakit Perut'
  },
  {
    id: 2,
    name: 'Sakit Punggung',
    description: 'Sakit Punggung'
  },
  {
    id: 3,
    name: 'Sakit pada Lengan, Kaki, dan Sendi',
    description: 'Sakit pada Lengan, Kaki, dan Sendi'
  },
  {
    id: 4,
    name: 'Kram saat Menstruasi atau Masalah terkait Menstruasi',
    description: 'Kram saat Menstruasi'
  },
  {
    id: 5,
    name: 'Sakit Kepala',
    description: 'Sakit Kepala'
  },
  {
    id: 6,
    name: 'Nyeri Dada',
    description: 'Nyeri Dada'
  },
  {
    id: 7,
    name: 'Pusing',
    description: 'Pusing'
  },
  {
    id: 8,
    name: 'Pingsan',
    description: 'Pingsan'
  },
  {
    id: 9,
    name: 'Jantung Berdebar atau Berdegup Kencang',
    description: 'Jantung Berdebar'
  },
  {
    id: 10,
    name: 'Napas Pendek',
    description: 'Napas Pendek'
  },
  {
    id: 11,
    name: 'Kesakitan atau Masalah saat Berhubungan Seksual',
    description: 'Kesakitan saat Berhubungan Seksual'
  },
  {
    id: 12,
    name: 'Sulit Buang Air Besar, Diare, Sulit Menahan Air Besar/Kecil',
    description: 'Sulit Buang Air Besar'
  },
  {
    id: 13,
    name: 'Mual, Perut "Begah", Gangguan Pencernaan Lainnya',
    description: 'Mual, Perut Begah'
  },
  {
    id: 14,
    name: 'Merasa Kelelahan dengan Sedikit Aktivitas',
    description: 'Merasa Kelelahan'
  },
  {
    id: 15,
    name: 'Sulit Tidur',
    description: 'Sulit Tidur'
  }
]

const answerOptions = [
  {
    id: 2,
    name: 'Sangat Terganggu',
    description: 'Sangat Terganggu',
    icon: <ReportProblemIcon />  // Represents high disturbance
  },
  {
    id: 1,
    name: 'Sedikit Terganggu',
    description: 'Sedikit Terganggu',
    icon: <WarningIcon />  // Represents mild disturbance
  },
  {
    id: 0,
    name: 'Tidak Terganggu',
    description: 'Tidak Terganggu',
    icon: <CheckCircleIcon />  // Represents no disturbance
  }
];


export const ListQuestionnairePHQ15 = () => {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false) // State to track if the quiz is finished
  const [finalScore, setFinalScore] = useState<number>(0) // State to store average score

  const handleAnswerSelect = async (answerId: number) => {
    // Save the response
    setResponses((prev) => [...prev, answerId])

    // Move to the next question
    if (currentQuestionIndex < painOptions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // All questions answered, calculate average score
      const scoreSum = responses.reduce((sum, score) => sum + score, 0) + answerId // Include the last answer
      // const newAverageScore = scoreSum / (responses.length + 1) || 0; // Calculate new average

      setFinalScore(scoreSum); // Set the average score
      setIsFinished(true); // Set finished state to true
    }
  }

  if (isFinished) {
    let conclusion = '';

    if (finalScore >= 15 && finalScore <= 30) {
        conclusion = 'High';
    } else if (finalScore >= 10 && finalScore <= 14) {
        conclusion = 'Medium';
    } else if (finalScore >= 5 && finalScore <= 9) {
        conclusion = 'Low';
    } else if (finalScore >= 1 && finalScore <= 4) {
        conclusion = 'Minimal';
    }

    return (
      <div className="grid gap-4">
        <p>
          Skor PHQ-15 dari tanggapan Anda adalah: {finalScore}.
        </p>
        <p>
          Kategori berdasarkan skor Anda: {conclusion}.
        </p>
      </div>
    );
}


  const currentPainOption = painOptions[currentQuestionIndex]

  return (
    <div className="grid gap-4">
      <p>
        Apakah dalam 4 minggu terakhir, Anda mengalami masalah {currentPainOption.name}?
      </p>
      <div className="grid gap-4 p-2 sm:p-4 border border-zinc-200 rounded-2xl bg-white">
        {answerOptions.map(option => (
          <div
            key={option.id}
            className="p-2 flex justify-between hover:bg-zinc-50 rounded-xl cursor-pointer gap-4"
            onClick={() => handleAnswerSelect(option.id)}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-20 bg-zinc-100 aspect-video rounded-lg overflow-hidden flex items-center justify-center">
                {option.icon}
              </div>
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-zinc-600">{option.description}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
      <p className="mt-4">
        Pertanyaan selanjutnya: {currentQuestionIndex + 1} dari {painOptions.length}
      </p>
    </div>
  )
}
