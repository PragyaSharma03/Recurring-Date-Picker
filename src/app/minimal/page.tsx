export default function MinimalTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Minimal Test Page</h1>
        <p className="text-gray-700">This is a minimal test page to verify basic functionality.</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-900">✅ If you can see this, the page is working!</p>
        </div>
      </div>
    </div>
  );
} 