export type Language = 'et' | 'en';

export interface Question {
  id: string; // question ID
  question: Record<Language, string>; // question text
  image?: string; // optional image filename
  answers: Record<Language, string[]>; // array of 5 answers
  correctAnswer: number; // index of correct answer (0-4)
}

export const questions: Record<string, Question> = {
  '1': {
    id: '1',
    question: {
      et: 'Mis näidisküsimus?',
      en: 'What sample question?'
    },
    image: 'Chateau_Montsoreau_Loire.jpg',
    answers: {
      et: ['Valik 1', 'Valik 2', 'Valik 3', 'Valik 4', 'Valik 5'],
      en: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    },
    correctAnswer: 1
  },
  '2': {
    id: '2',
    question: {
      et: 'Kes maalis "Torm Galilea merel"?',
      en: 'Who painted "The Storm on the Sea of Galilee"?'
    },
    answers: {
      et: ['Leonardo da Vinci', 'Rembrandt', 'Vincent van Gogh', 'Claude Monet', 'Pablo Picasso'],
      en: ['Leonardo da Vinci', 'Rembrandt', 'Vincent van Gogh', 'Claude Monet', 'Pablo Picasso']
    },
    correctAnswer: 1
  },
  '3': {
    id: '3',
    question: {
      et: 'Millist kunstivoolu iseloomustavad julgad värvid ja metsik pintslikäsitlus?',
      en: 'What art movement is characterized by bold colors and wild brushwork?'
    },
    answers: {
      et: ['Impressionism', 'Kubism', 'Fovism', 'Sürrealism', 'Minimalism'],
      en: ['Impressionism', 'Cubism', 'Fauvism', 'Surrealism', 'Minimalism']
    },
    correctAnswer: 2
  },
  '4': {
    id: '4',
    question: {
      et: 'Kes lõi skulptuuri "Mõtleja"?',
      en: 'Who sculpted "The Thinker"?'
    },
    answers: {
      et: ['Michelangelo', 'Donatello', 'Auguste Rodin', 'Antonio Canova', 'Bernini'],
      en: ['Michelangelo', 'Donatello', 'Auguste Rodin', 'Antonio Canova', 'Bernini']
    },
    correctAnswer: 2
  },
  '5': {
    id: '5',
    question: {
      et: 'Milline periood oli enne renessanssi?',
      en: 'Which period came before the Renaissance?'
    },
    answers: {
      et: ['Barokk', 'Keskaeg', 'Neoklassitsism', 'Romantism', 'Modernism'],
      en: ['Baroque', 'Medieval', 'Neoclassical', 'Romantic', 'Modern']
    },
    correctAnswer: 1
  }
};

export const languageNames: Record<Language, string> = {
  et: 'Eesti',
  en: 'English'
};
