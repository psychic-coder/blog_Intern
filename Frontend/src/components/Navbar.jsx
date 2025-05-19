import { useState } from "react";
import { PenLine, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleNavigate = () => navigate("/createblog");
    
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full p-6">
            <nav className="bg-white shadow-md p-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center" >
                            <span className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={()=>navigate("/")}>
                                BlogsHub
                            </span>
                        </div>

                        <div className="hidden md:flex items-center justify-center flex-1">
                            <h1 className="text-lg font-semibold text-gray-800">
                                Discover the latest articles and updates
                            </h1>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button 
                                onClick={handleNavigate}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition duration-150"
                            >
                                <PenLine size={18} className="mr-2" />
                                Create Blog
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center transition duration-150">
                                <User size={18} className="mr-2" />
                                Profile
                            </button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <p className="text-center text-gray-800 py-2">
                                Discover the latest articles and updates
                            </p>
                            <button 
                                onClick={handleNavigate}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium flex items-center justify-center"
                            >
                                <PenLine size={18} className="mr-2" />
                                Create Blog
                            </button>
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-base font-medium flex items-center justify-center">
                                <User size={18} className="mr-2" />
                                Profile
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;