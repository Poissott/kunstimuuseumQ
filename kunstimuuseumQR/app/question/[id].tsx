import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { questions, languageNames } from '@/constants/questions';
import { useLanguage } from '@/contexts/LanguageContext';

const imageMap: Record<string, any> = {
  'loss.png': require('@/assets/images/loss.png'),
};

export default function QuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = questions[id as string];

  if (!question) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Question Not Found</ThemedText>
          <ThemedText>Question ID: {id}</ThemedText>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const handleAnswerPress = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
  };

  const getAnswerStyle = (index: number) => {
    if (!isAnswered) return styles.answerButton;
    
    if (index === question.correctAnswer) {
      return [styles.answerButton, styles.correctAnswer];
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return [styles.answerButton, styles.wrongAnswer];
    }
    
  return [styles.answerButton, styles.disabledAnswer];
};

return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Language Selector */}
      <View style={styles.languageSelector}>
        {(['et', 'en'] as const).map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.languageButton,
              language === lang && styles.languageButtonActive
            ]}
            onPress={() => setLanguage(lang)}>
            <Text style={[
              styles.languageButtonText,
              language === lang && styles.languageButtonTextActive
            ]}>
              {languageNames[lang]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ThemedView style={styles.questionContainer}>
        <ThemedText type="subtitle" style={styles.questionNumber}>
          {language === 'et' ? 'Küsimus' : 'Question'} {id}
        </ThemedText>
        <ThemedText type="title" style={styles.questionText}>
          {question.question[language]}
        </ThemedText>
        {question.image && imageMap[question.image] && (
          <Image
            source={imageMap[question.image]}
            style={styles.questionImage}
            resizeMode="contain"
          />
        )}
      </ThemedView>

      <View style={styles.answersContainer}>
        {question.answers[language].map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={getAnswerStyle(index)}
            onPress={() => handleAnswerPress(index)}
            disabled={isAnswered}>
            <Text style={styles.answerText}>
              {String.fromCharCode(65 + index)}. {answer}
            </Text>
            {isAnswered && index === question.correctAnswer && (
              <Text style={styles.checkmark}>✓</Text>
            )}
            {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
              <Text style={styles.cross}>✗</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {isAnswered && (
          selectedAnswer === question.correctAnswer ? (
            <View style={styles.resultContainerCorrect}>
                <ThemedText style={styles.correctText}>
                    {language === 'et' ? '✅ Õige vastus!' : '✅ Correct!'}
                </ThemedText>
                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={() => router.back()}>
                <Text style={styles.nextButtonText}>
                  {language === 'et' ? 'Jätka' : 'Continue'}
                </Text>
                </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.resultContainerWrong}>
                <ThemedText style={styles.wrongText}>
                  {language === 'et' 
                    ? `❌ Vale vastus. Õige vastus oli ${String.fromCharCode(65 + question.correctAnswer)}.`
                    : `❌ Incorrect. The correct answer was ${String.fromCharCode(65 + question.correctAnswer)}.`
                  }
                </ThemedText>
                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={() => router.back()}>
                <Text style={styles.nextButtonText}>
                  {language === 'et' ? 'Jätka' : 'Continue'}
                </Text>
                </TouchableOpacity>
            </View>
          )
      )}
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7c4479ff',
  },
  container: {
    flex: 1,
    backgroundColor: '#7c4479ff',
  },
  contentContainer: {
    padding: 20,
  },
  questionContainer: {
    backgroundColor: '#ac89c9ff',
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    color: '#dadadaff',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 22,
    lineHeight: 32,
  },
  questionImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#ac89c9ff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ac89c9ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  correctAnswer: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  wrongAnswer: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  disabledAnswer: {
    opacity: 0.5,
  },
  checkmark: {
    fontSize: 24,
    color: '#28a745',
    fontWeight: 'bold',
  },
  cross: {
    fontSize: 24,
    color: '#dc3545',
    fontWeight: 'bold',
  },
  resultContainerCorrect: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#d4edda',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#28a745',
    alignItems: 'center',
  },
  resultContainerWrong: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#f8d7da',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dc3545',
    alignItems: 'center',
  },
  correctText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  wrongText: {
    fontSize: 18,
    color: '#dc3545',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#2a8d41ff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#521d63ff',
    borderWidth: 2,
    borderColor: '#521d63ff',
  },
  languageButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  languageButtonTextActive: {
    color: '#666',
  },
});
