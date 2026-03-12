import type { PageLoad } from './$types';
import quizResult from '$lib/data/quiz-result.json';

export const load: PageLoad = () => {
  return { quiz: quizResult };
};
