/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { FaHourglassHalf, FaRedoAlt, FaSun, FaSyncAlt, FaTimes } from 'react-icons/fa'; // Example of icons from React Icons

interface PainOption {
  id: number
  name: string
  description: string
}

const painOptions: PainOption[] = [
  {
    id: 1,
    name: 'Saya merasa terganggu dengan kelelahan yang saya rasakan',
    description: 'Terganggu oleh Kelelahan'
  },
  {
    id: 2,
    name: 'Saya merasa cepat lelah atau cape atau letih',
    description: 'Cepat Lelah'
  },
  {
    id: 3,
    name: 'Saya tidak banyak melakukan apa-apa setiap harinya',
    description: 'Tidak Banyak Melakukan Aktivitas'
  },
  {
    id: 4,
    name: 'Saya tidak memiliki cukup tenaga atau energi untuk melakukan kegiatan setiap harinya',
    description: 'Kekurangan Tenaga'
  },
  {
    id: 5,
    name: 'Secara fisik, saya merasa kehabisan tenaga',
    description: 'Kehabisan Tenaga Fisik'
  },
  {
    id: 6,
    name: 'Saya memiliki masalah untuk memulai sesuatu kegiatan',
    description: 'Masalah Memulai Kegiatan'
  },
  {
    id: 7,
    name: 'Saya memiliki masalah untuk berpikir jernih',
    description: 'Masalah Berpikir Jernih'
  },
  {
    id: 8,
    name: 'Saya merasa tidak bersemangat untuk melakukan apapun',
    description: 'Tidak Bersemangat'
  },
  {
    id: 9,
    name: 'Secara mental, saya merasa kehabisan tenaga atau energi',
    description: 'Kehabisan Energi Mental'
  },
  {
    id: 10,
    name: 'Ketika saya melakukan sesuatu, saya bisa berkonsentrasi dengan baik',
    description: 'Bisa Berkonsentrasi'
  }
]


const answerOptions = [
  {
    id: 1,
    name: 'Selalu',
    description: 'Selalu',
    icon: '🔄' // Continuous or repeat icon to represent ""
  },
  {
    id: 2,
    name: 'Sering',
    description: 'Sering',
    icon: '🔁' // Circular arrow to suggest frequent occurrences
  },
  {
    id: 3,
    name: 'Kadang-kadang',
    description: 'Kadang-kadang',
    icon: '⏳' // Hourglass icon to suggest something that happens occasionally
  },
  {
    id: 4,
    name: 'Jarang',
    description: 'Jarang',
    icon: '🌤' // Partly sunny icon, implying something rare
  },
  {
    id: 5,
    name: 'Tidak Pernah',
    description: 'Tidak Pernah',
    icon: '❌' // Cross mark icon to signify "never"
  }
]

const iconMap: { [key: number]: JSX.Element } = {
  1: <FaSyncAlt />, // Selalu
  2: <FaRedoAlt />, // Sering
  3: <FaHourglassHalf />, // Kadang-kadang
  4: <FaSun />, // Jarang
  5: <FaTimes /> // Tidak Pernah
};


export const ListQuestionnaireFAS = () => {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false) // State to track if the quiz is finished
  const [finalScore, setFinalScore] = useState<number>(0) // State to store average score

  const handleAnswerSelect = async (answerId: number) => {
    // Reverse coding for questions 4 and 10
    const reverseCodedQuestions = [3, 9]; // Question 4 and 10 are at index 3 and 9
    let modifiedAnswer = answerId;
  
    // If the current question is either 4 or 10, apply reverse coding
    if (reverseCodedQuestions.includes(currentQuestionIndex)) {
      modifiedAnswer = 6 - answerId; // Recode the answer (1=5, 2=4, 3=3, 4=2, 5=1)
    }
  
    // Save the response with modified answer (if applicable)
    setResponses((prev) => [...prev, modifiedAnswer]);
  
    // Move to the next question
    if (currentQuestionIndex < painOptions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All questions answered, calculate average score
      const scoreSum = responses.reduce((sum, score) => sum + score, 0) + modifiedAnswer; // Include the last answer
      // const newAverageScore = scoreSum / (responses.length + 1) || 0; // Calculate new average
  
      setFinalScore(scoreSum); // Set the average score
      setIsFinished(true); // Set finished state to true
    }
  };
  
  if (isFinished) {
    let conclusion= '';

    if (finalScore >= 10 && finalScore <= 21) {
      conclusion = 'No Fatique';
    } else if (finalScore >= 22 && finalScore <= 34) {
      conclusion = 'Fatique';
    } else if (finalScore >= 35) {
      conclusion = 'Extreme Fatique';
    }
    return (
      <div className="grid gap-4">
        {/* <p>Hasil tes FAS:</p> */}
        <p>
        Hasil tes FAS: {finalScore} ({conclusion}).
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
            <div className="w-20 bg-zinc-100 aspect-video rounded-lg overflow-hidden flex items-center justify-center text-2xl">
              {iconMap[option.id]}
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
