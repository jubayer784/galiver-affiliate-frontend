import { Suspense } from 'react';
import VerifyForm from './VerifyForm';

export const metadata = { title: 'Verify Email' };

export default function VerifyPage() {
  return <Suspense fallback={<main className="auth-page"><p className="auth-subtitle">লোড হচ্ছে...</p></main>}><VerifyForm /></Suspense>;
}
