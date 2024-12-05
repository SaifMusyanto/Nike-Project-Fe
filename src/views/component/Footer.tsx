// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray200 text-gray-400 py-6">
            <div className="container mx-auto px-6">
                <div className="flex justify-start gap-16 text-black ml-10 ">
                    <div>
                        <h4 className="font-semibold mb-2">Resources</h4>
                        <ul>
                            <li className='pt-2'>
                                <a href="#" className="hover:underline text-gray-600 text-xs hover:text-black ease-in duration-100">Find a Store</a>
                            </li>
                            <li className='pt-2'>
                                <a href="#" className="hover:underline text-gray-600 text-xs hover:text-black ease-in duration-100">Become a Member</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Help</h4>
                        <ul>
                            <li className='pt-2'>
                                <a href="#" className="hover:underline text-gray-600 text-xs hover:text-black ease-in duration-100">Get Help</a>
                            </li>
                            <li className='pt-2'>
                                <a href="#" className="hover:underline text-gray-600 text-xs hover:text-black ease-in duration-100">Order Status</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Company</h4>
                        <ul>
                            <li className='pt-2'>
                                <a href="#" className="hover:underline text-gray-600 text-xs hover:text-black ease-in duration-100">About Nike</a>
                            </li>
                            <li className='pt-2'>
                                <a href="#" className="hover:underline text-gray-600 text-xs hover:text-black ease-in duration-100">Careers</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className="text-sm">&copy; 2024 Nike, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
