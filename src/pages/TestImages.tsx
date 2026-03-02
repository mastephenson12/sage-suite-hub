import React from 'react';

const TestImages: React.FC = () => {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Image Test</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>input_file_0.png</p>
          <img src="input_file_0.png" alt="Test 0" className="w-full h-auto border" />
        </div>
        <div>
          <p>/input_file_0.png</p>
          <img src="/input_file_0.png" alt="Test 0 slash" className="w-full h-auto border" />
        </div>
        <div>
          <p>input_file_1.png</p>
          <img src="input_file_1.png" alt="Test 1" className="w-full h-auto border" />
        </div>
        <div>
          <p>/input_file_1.png</p>
          <img src="/input_file_1.png" alt="Test 1 slash" className="w-full h-auto border" />
        </div>
      </div>
    </div>
  );
};

export default TestImages;
