import React from 'react';

const DiwaliTest = () => {
  console.log("DiwaliTest component rendering...");
  
  const testImages = [
    { name: "Gulab Jamun", base: "gulab-jamun", ext: "jpg" },
    { name: "Kaju Katli", base: "kaju-katli", ext: "jpg" },
    { name: "Badusha", base: "badusha", ext: "jpg" },
    { name: "Mysore Pak", base: "mysore-pak", ext: "jpeg" },
    { name: "Rasgulla", base: "rasgulla", ext: "avif" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {testImages.map((item, index) => {
          const imageUrl = `/diwaliSweets/${item.base}.${item.ext}`;
          console.log(`Rendering image ${index + 1}:`, imageUrl);
          
          return (
            <div key={item.base} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-red-200 relative">
                <div className="absolute top-0 left-0 right-0 bg-black text-yellow-300 text-xs p-2">
                  {imageUrl}
                </div>
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`✓ SUCCESS: ${item.name} loaded`)}
                  onError={(e) => {
                    console.error(`✗ FAILED: ${item.name} failed to load from ${e.currentTarget.src}`);
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.base}.{item.ext}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Manual URL Test:</h2>
        {testImages.map(item => (
          <div key={item.base} className="mb-2">
            <a 
              href={`/diwaliSweets/${item.base}.${item.ext}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              Test: /diwaliSweets/{item.base}.{item.ext}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiwaliTest;
