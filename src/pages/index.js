import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };
  const handleContinueAsGuest = () => {
    router.push("/Posts");
  };

  return (
    <div className="h-screen flex flex-col">
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to MediaShare
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Connect, share, and discover amazing content from creators around the world. Your story matters - share it with the community.
          </p>
          <div className="flex sm:flex-row gap-4 justify-center">
            <button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
            <button onClick={handleContinueAsGuest} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Continue as Guest
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose MediaShare?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect with Community</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Build meaningful connections with like-minded creators and audiences.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Story</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Post photos, videos, and thoughts that matter to you and your audience.</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover Content</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Explore trending posts and discover new creators in your areas of interest.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
