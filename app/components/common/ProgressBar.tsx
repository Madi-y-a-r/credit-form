const ProgressBar = ({ step }: { step: number }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
         <div className="bg-gradient-to-r from-orange-300 to-red-500 h-2.5 rounded-full"
         style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
    );
  };
  
  export default ProgressBar;
  