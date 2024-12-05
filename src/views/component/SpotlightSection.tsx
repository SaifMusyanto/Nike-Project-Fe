import React from "react";

const SpotlightSection: React.FC = () => {
  // Sample product data using local image assets
  const products = [
    { id: 1, name: "Zoom Fly", image: "src/assets/SpotlightSection/spotlight1.png" },
    { id: 2, name: "Dunks", image: "src/assets/SpotlightSection/spotlight2.png" },
    { id: 3, name: "Air Force 1", image: "src/assets/SpotlightSection/spotlight3.png" },
    { id: 4, name: "Air Jordan 1", image: "src/assets/SpotlightSection/spotlight4.png" },
    { id: 5, name: "Cortez", image: "src/assets/SpotlightSection/spotlight5.png" },
    { id: 6, name: "Killshot", image: "src/assets/SpotlightSection/spotlight6.png" },
    // { id: 7, name: "Blazer", image: "src/assets/SpotlightSection/spotlight7.png" },
    { id: 8, name: "Pegasus", image: "src/assets/SpotlightSection/spotlight8.png" },
    { id: 9, name: "React Vision", image: "src/assets/SpotlightSection/spotlight9.png" },
    { id: 10, name: "Invincible Run", image: "src/assets/SpotlightSection/spotlight10.png" },
  ];

  return (
    <section className="container mx-auto px-6 ">
      <h2 className="text-xl font-semibold mb-4 text-left">Classics Spotlight</h2>
      <div className="overflow-x-auto overflow-visible scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[25%] bg-white shadow-sm overflow-hidden flex-shrink-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              {/* <h3 className="text-center text-lg font-semibold py-4">
                {product.name.toUpperCase()}
              </h3> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
