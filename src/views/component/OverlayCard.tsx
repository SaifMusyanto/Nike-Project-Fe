import React from "react";

interface OverlayCardProps {
  title: string;
  buttonText: string;
  backgroundImage: string;
  onButtonClick?: () => void;
}

const OverlayCard: React.FC<OverlayCardProps> = ({
  title,
  buttonText,
  backgroundImage,
  onButtonClick,
}) => {
  return (
    <div
      className="relative w-96 h-96 bg-cover bg-center shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-[30%] hover:bg-opacity-0 ease-in duration-200"></div>

      {/* Content */}
      <div className="absolute bottom-5 left-5 z-10 text-white">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          className="mt-2 px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition hover:border-black"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OverlayCard;
