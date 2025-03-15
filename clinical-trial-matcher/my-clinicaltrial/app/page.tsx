import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/search');

  return (
      <div>
          <h1>Redirecting...</h1>
      </div>
  )
}
