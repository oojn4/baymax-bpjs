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
    name: 'Saya berpikir bahwa gejala fisik yang saya alami adalah tanda-tanda penyakit serius',
    description: 'Penyakit Serius'
  },
  {
    id: 2,
    name: 'Saya sangat mengkhawatirkan kesehatan saya',
    description: 'Mengkhawatirkan Kesehatan'
  },
  {
    id: 3,
    name: 'Masalah kesehatan saya menghambat saya dalam kehidupan sehari-hari',
    description: 'Menghambat Kehidupan'
  },
  {
    id: 4,
    name: 'Saya yakin bahwa gejala saya serius',
    description: 'Gejala Serius'
  },
  {
    id: 5,
    name: 'Gejala saya membuat saya takut',
    description: 'Takut Karena Gejala'
  },
  {
    id: 6,
    name: 'Keluhan fisik saya menyibukkan saya hampir sepanjang hari',
    description: 'Keluhan Menyibukkan'
  },
  {
    id: 7,
    name: 'Orang lain mengatakan kepada saya bahwa masalah fisik saya tidak serius',
    description: 'Masalah Fisik Tidak Serius'
  },
  {
    id: 8,
    name: 'Saya khawatir keluhan fisik saya tidak akan pernah berhenti',
    description: 'Khawatir Keluhan Tidak Berhenti'
  },
  {
    id: 9,
    name: 'Kekhawatiran saya tentang kesehatan saya menyita energi saya',
    description: 'Kekhawatiran Menyita Energi'
  },
  {
    id: 10,
    name: 'Saya merasa dokter tidak menanggapi keluhan fisik saya dengan serius',
    description: 'Dokter Tidak Menanggapi Serius'
  },
  {
    id: 11,
    name: 'Saya khawatir bahwa gejala fisik saya akan berlanjut di masa depan',
    description: 'Khawatir Gejala Berlanjut'
  },
  {
    id: 12,
    name: 'Karena keluhan fisik saya, saya memiliki konsentrasi yang buruk pada hal-hal lain',
    description: 'Konsentrasi Buruk Karena Keluhan Fisik'
  }
]

const iconMap: { [key: number]: JSX.Element } = {
  1: <FaSyncAlt />, // Selalu
  2: <FaRedoAlt />, // Sering
  3: <FaHourglassHalf />, // Kadang-kadang
  4: <FaSun />, // Jarang
  5: <FaTimes /> // Tidak Pernah
};

const answerOptions = [
  {
    id: 4,
    name: 'Selalu',
    description: 'Selalu',
    icon: '🔄' // Continuous or repeat icon to represent "always"
  },
  {
    id: 3,
    name: 'Sering',
    description: 'Sering',
    icon: '🔁' // Circular arrow to suggest frequent occurrences
  },
  {
    id: 2,
    name: 'Kadang-kadang',
    description: 'Kadang-kadang',
    icon: '⏳' // Hourglass icon to suggest something that happens occasionally
  },
  {
    id: 1,
    name: 'Jarang',
    description: 'Jarang',
    icon: '🌤' // Partly sunny icon, implying something rare
  },
  {
    id: 0,
    name: 'Tidak Pernah',
    description: 'Tidak Pernah',
    icon: '❌' // Cross mark icon to signify "never"
  }
]

export const ListQuestionnaireSSD = () => {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false) // State to track if the quiz is finished
  // const [averageScore, setAverageScore] = useState<number>(0) // State to store average score
  const [kognitif, setKognitif] = useState<number>(0) // State to store average score
  const [afektif, setAfektif] = useState<number>(0) // State to store average score
  const [behavioral, setBehavioral] = useState<number>(0) // State to store average score
  const handleAnswerSelect = async (answerId: number) => {
    // Save the response
    setResponses((prev) => [...prev, answerId]);
  
    // Move to the next question
    if (currentQuestionIndex < painOptions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Filter responses for questions 1, 4, and 7
      const kognitifResponses = responses.filter((_, index) => 
        index === 0 || index === 3 || index === 6
      );
  
      // Add the current answer if it belongs to questions 1, 4, or 7
      if (currentQuestionIndex === 0 || currentQuestionIndex === 3 || currentQuestionIndex === 6) {
        kognitifResponses.push(answerId);
      }
  
      const kognitifSum = kognitifResponses.reduce((sum, score) => sum + score, 0);
      
      setKognitif(kognitifSum); // Set the average score

      // Filter responses for questions 2, 5, and 8
      const afektifResponses = responses.filter((_, index) => 
        index === 1 || index === 4 || index === 7
      );
  
      // Add the current answer if it belongs to questions 2, 5, or 8
      if (currentQuestionIndex === 1 || currentQuestionIndex === 4 || currentQuestionIndex === 7) {
        afektifResponses.push(answerId);
      }
  
      const afektifSum = afektifResponses.reduce((sum, score) => sum + score, 0);
      
      setAfektif(afektifSum); // Set the average score
      
      // Filter responses for questions 3, 6, and 9
      const behavioralResponses = responses.filter((_, index) => 
        index === 2 || index === 5 || index === 8
      );
  
      // Add the current answer if it belongs to questions 1, 4, or 7
      if (currentQuestionIndex === 2 || currentQuestionIndex === 5 || currentQuestionIndex === 8) {
        behavioralResponses.push(answerId);
      }
  
      const behavioralSum = behavioralResponses.reduce((sum, score) => sum + score, 0);
      
      setBehavioral(behavioralSum); // Set the average score
      
      setIsFinished(true); // Set finished state to true
    }
  };
  
  if (isFinished) {
    let conclusionKognitif = '';

    if (kognitif >= 0 && kognitif <= 3) {
      conclusionKognitif = 'Low';
    } else if (kognitif > 3 && kognitif <= 5) {
      conclusionKognitif = 'Medium';
    } else if (kognitif > 5) {
      conclusionKognitif = 'High';
    } 
    let conclusionAfektif = '';

    if (afektif >= 0 && afektif <= 2) {
      conclusionAfektif = 'Low';
    } else if (kognitif > 2 && kognitif <= 4.75) {
      conclusionAfektif = 'Medium';
    } else if (kognitif > 4.75) {
      conclusionAfektif = 'High';
    } 

    let conclusionBehavioral= '';

    if (afektif >= 0 && afektif <= 1) {
      conclusionBehavioral = 'Low';
    } else if (kognitif > 1 && kognitif <= 3) {
      conclusionBehavioral = 'Medium';
    } else if (kognitif > 3) {
      conclusionBehavioral = 'High';
    }
    return (
      <div className="grid gap-4">
        <p>Hasil tes SSD:</p>
        <p>
          Aspek Kognitif: {kognitif} ({conclusionKognitif}).
        </p>
        <p>
          Aspek Afektif: {afektif} ({conclusionAfektif}).
        </p>
        <p>
          Aspek Behavioral: {behavioral} ({conclusionBehavioral}).
        </p>
      </div>
    );
  }
  

  const currentPainOption = painOptions[currentQuestionIndex]

  return (
    <div className="grid gap-4">
      <p>
        Karakteristik: {currentPainOption.name}?
      </p>
      <div className="grid gap-4 p-2 sm:p-4 border border-zinc-200 rounded-2xl bg-white">
        {answerOptions.map(option => (
          <div
            key={option.id}
            className="p-2 flex justify-between hover:bg-zinc-50 rounded-xl cursor-pointer gap-4"
            onClick={() => handleAnswerSelect(option.id)}
          >
            <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
        ))}
      </div>
      <p className="mt-4">
        Pertanyaan selanjutnya: {currentQuestionIndex + 1} dari {painOptions.length}
      </p>
    </div>
  )
}
