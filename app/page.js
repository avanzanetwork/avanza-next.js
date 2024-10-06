import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <div className="flex gap-4">
          <Link href="/map" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Map
          </Link>
          <Link href="/gantt" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Go to Gantt Chart
          </Link>
        </div>
      </main>
    </div>
  );
}
