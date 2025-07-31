// components/AnimatedBackground.tsx

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Colorful Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob1"></div>
        <div className="absolute w-[600px] h-[600px] bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob2"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob3"></div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 animate-text-glow">
          RBAC Configuration Tool
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
          Seamlessly manage roles, permissions, and user access in style.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <a href="/dashboard" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-xl hover:scale-105 transition-transform">
            🧭 Go to Dashboard
          </a>
          <a href="/permissions/manage" className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-xl hover:scale-105 transition-transform">
            🔐 Manage Permissions
          </a>
          <a href="/roles/manage" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-xl shadow-xl hover:scale-105 transition-transform">
            🎭 Manage Roles
          </a>
        </div>
      </div>
    </main>
  );
}
