import React from 'react';
import Navbar from './component/Navbar';
import OverlayCard from './component/OverlayCard';
import SpotlightSection from './component/SpotlightSection';
import Footer from './component/Footer';  


const Dashboard: React.FC = () => {

    const handleButtonClick = () => {
        alert("Button clicked!");
    };    

    return (
        <div className="bg-white w-screen">
            <div className="bg-gray-50 min-h-screen w-full justify-center">
                <Navbar />
                <div className="bg-white min-h-screen w-[90%] mx-auto">
            
                {/* Header Section */}
                <header className="bg-white">
                
                {/* Hero Section */}
                    <div>
                        <img src="src\assets\hero.png" alt="" />
                    </div>
                    <div className="container flex flex-col  mx-auto px-6 py-4">
                        <h1 className="mx-auto font-medium text-3xl text-gray-800">MERCURIAL DREAM SPEED</h1>
                        <p className="text-gray-600 font-normal text-xs mx-auto mt-2">Speed beyond your wildest dreams.</p>
                        <section className="button flex justify-center">
                            <button className="mt-4 px-7 py-2 bg-black text-sm text-white rounded-full border-white ease-in duration-100 hover:scale-90"><a href="/display" className='text-white hover:border-white text-border border-solid'>Shop Now</a></button>
                        </section>
                    </div>
                </header>

                {/* Featured Section */}
                <section className="container mx-auto px-6 py-10">
                    <h2 className="text-xl font-semibold mb-4 px-6">Featured</h2>
                    
                    <div className="flex justify-around items-center py-3">
                    <OverlayCard
                        title="Nike Pegasus 41 PRM"
                        buttonText="Shop Now"
                        backgroundImage="src/assets/featured/featured1.png"
                        onButtonClick={handleButtonClick}
                    />
                    <OverlayCard
                        title="Nike Pegasus 41 PRM"
                        buttonText="Shop Now"
                        backgroundImage="src/assets/featured/featured2.png"
                        onButtonClick={handleButtonClick}
                    />
                    <OverlayCard
                        title="Nike Pegasus 41 PRM"
                        buttonText="Shop Now"
                        backgroundImage="src/assets/featured/featured3.png"
                        onButtonClick={handleButtonClick}
                    />
                    </div>

                    
                </section>

                {/* Classics Spotlight Section */}
                <section className="container mx-auto px-6 py-10">
                    <div>
                        <SpotlightSection/>
                    </div>
                </section>

                {/* Hold Court Section */}
                <section className="container mx-auto px-6 py-10">
                    <div
                        className="relative bg-cover bg-center h-72 rounded-lg overflow-hidden"
                        style={{ backgroundImage: "url('src/assets/holdcourt/holdcourt1.png')" }}
                    >
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <div className="text-center text-white">
                                <h2 className="text-2xl font-bold">HOLD COURT</h2>
                                <p className="mt-2">Inspired by the men's game, and built for anyone ready to take the throne.</p>
                                <button className="mt-4 px-4 py-2 bg-white text-black rounded-full hover:border-black">Shop</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shop By Categories Section */}
                <section className="container mx-auto px-6 py-10">
                <h2 className="text-xl font-semibold mb-4">Shop By Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Running Category */}
                    <div className="bg-white shadow-sm group relative">
                        <img
                            src="src/assets/categories/running.png"
                            alt="Running"
                            className="w-full h-64 object-cover grayscale-0 group-hover:grayscale transition ease-in duration-150"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                    <button className="px-4 bg-black  text-black rounded-full hover:border-white duration-150 ease-in hover:scale-90"><a href="" className='text-white'>Running</a></button>
                                </div>
                        </div>
                    </div>

                    {/* Football Category */}
                    <div className="bg-white shadow-sm group relative">
                        <img
                            src="src/assets/categories/football.jpg"
                            alt="Running"
                            className="w-full h-64 object-cover grayscale-0 group-hover:grayscale transition ease-in duration-150"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                    <button className="px-4 bg-black  text-black rounded-full hover:border-white duration-150 ease-in hover:scale-90"><a href="" className='text-white'>Football</a></button>
                                </div>
                        </div>
                    </div>

                    {/* Basketball Category */}
                    <div className="bg-white shadow-sm group relative">
                        <img
                            src="src/assets/categories/basketball.png"
                            alt="Running"
                            className="w-full h-64 object-cover grayscale-0 group-hover:grayscale transition ease-in duration-150"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                    <button className="px-4 bg-black  text-black rounded-full hover:border-white duration-150 ease-in hover:scale-90 "><a href="" className='text-white'>Football</a></button>
                                </div>
                        </div>
                    </div>
                </div>
                </section>
                </div>
                {/* Footer */}
                <Footer/>
            </div>
        </div>
    );
};

export default Dashboard;
