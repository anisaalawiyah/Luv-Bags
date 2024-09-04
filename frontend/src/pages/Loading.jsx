// src/components/Loading.js

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center mb-4">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-700">Pesanan Anda Sedang Diproses...</p>
    </div>
  );
};

export default Loading;
