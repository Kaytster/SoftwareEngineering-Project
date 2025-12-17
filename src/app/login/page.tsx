import { Metadata } from 'next';
import { verifySession } from '../../../lib/session';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: "Log In | SustainWear"
}

export default async function LoginPage() {
  const session = await verifySession();

  if (session) {
    return <div>
      You are already logged in as {session.userId} ({session.userRole})!
    </div>
  } else {
    return <LoginForm />
  }

}
