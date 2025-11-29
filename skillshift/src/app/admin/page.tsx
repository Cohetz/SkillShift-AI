import { redirect } from 'next/navigation';
import { getRoleFromRequest } from '@/lib/auth/claims';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const role = await getRoleFromRequest();
  if (role !== 'admin') {
    redirect('/dashboard');
  }
  return <AdminClient />;
}
