import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hospital Scheduler
        </h1>
        <p className="text-gray-600 mb-8">
          Manage doctor appointments with ease
        </p>
        <Link 
          href="/schedule"
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Go to Schedule
        </Link>
      </div>
    </div>
  );
}
