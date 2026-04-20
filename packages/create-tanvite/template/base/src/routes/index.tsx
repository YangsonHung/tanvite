import { createFileRoute } from '@tanstack/react-router';
import { StarterHomePage } from '@/widgets/starter-home';

export const Route = createFileRoute('/')({
  component: StarterHomePage,
});
