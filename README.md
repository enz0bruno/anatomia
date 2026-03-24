import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Brain, ChevronRight, CheckCircle2, Trophy, ArrowLeft, Sparkles, BookOpen, GraduationCap, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- TIPOS DE DADOS ---
interface Question {
  id: number;
  text: string;
  type: 'text' | 'boolean' | 'choice';
  correctAnswer: string | boolean;
  options?: string[];
  explanation?: string;
}

interface QuizPart {
  title: string;
  description: string;
  questions: Question[];
}

interface StudyTopic {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  details: { name: string; description: string }[];
}

// --- DADOS DO QUIZ ---
const QUIZ_DATA: QuizPart[] = [
  {
    title: "PARTE 1: RELAÇÕES E ARTICULAÇÕES (Escrita)",
    description: "Escreva a resposta correta para cada pergunta técnica.",
    questions: [
      { 
        id: 1, 
        text: "O Capítulo do úmero se articula com qual osso do antebraço?", 
        type: 'text', 
        correctAnswer: "radio",
        explanation: "O capítulo do úmero é redondo para o rádio girar sobre ele."
      },
      { 
        id: 2, 
        text: "O Processo Condilar da mandíbula se encaixa em qual fossa do osso temporal?", 
        type: 'text', 
        correctAnswer: "fossa mandibular",
        explanation: "É o buraquinho no osso temporal onde a mandíbula encaixa."
      },
      { 
        id: 3, 
        text: "Quais são os 3 ossos que se fundem para formar o Osso do Quadril (Coxal)?", 
        type: 'text', 
        correctAnswer: "ilio, isquio e pubis",
        explanation: "Os três se unem no Acetábulo."
      },
      { 
        id: 4, 
        text: "A Cavidade Glenoidal da escápula recebe a cabeça de qual osso?", 
        type: 'text', 
        correctAnswer: "umero",
        explanation: "Forma a articulação Glenoumeral."
      },
      { 
        id: 5, 
        text: "Qual acidente da Ulna se encaixa na Fossa do Olécrano do Úmero?", 
        type: 'text', 
        correctAnswer: "olecrano",
        explanation: "A pontinha da Ulna que 'trava' no cotovelo quando esticamos o braço."
      },
    ]
  },
  {
    title: "PARTE 2: MOVIMENTOS E MÚSCULOS (Assinalar)",
    description: "Escolha a alternativa correta.",
    questions: [
      { 
        id: 6, 
        text: "Ao fazer o movimento de 'rosca direta' (dobrar o cotovelo), o principal músculo acionado é o:", 
        type: 'choice', 
        options: ["Tríceps Braquial", "Bíceps Braquial", "Deltoide"],
        correctAnswer: "Bíceps Braquial",
        explanation: "Bíceps flexiona, Tríceps estende."
      },
      { 
        id: 7, 
        text: "Qual destes músculos
