import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

export default function Question() {
  const router = useRouter();

  // Hardcoded question IDs for development/testing. In production, the questions are accessed via QR code scanning.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Museum Quiz
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Scan QR codes or tap below to test questions
      </ThemedText>

      <View style={styles.questionsContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.questionButton}
            onPress={() => router.push(`/question/${num}`)}>
            <ThemedText style={styles.questionButtonText}>
              📝 Question {num}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <ThemedText type="subtitle" style={styles.infoTitle}>
          QR Code Format:
        </ThemedText>
        <ThemedText style={styles.infoText}>
          kunstimuuseumqr://question/1
        </ThemedText>
        <ThemedText style={styles.infoText}>
          kunstimuuseumqr://question/2
        </ThemedText>
        <ThemedText style={styles.infoSubtext}>
          (Replace number with question ID)
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  questionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  questionButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  infoTitle: {
    marginBottom: 12,
  },
  infoText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#333',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
