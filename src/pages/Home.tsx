import React from 'react';
import { Link } from 'react-router-dom';
import petcareImage from '../assets/petcare.png';
import petfoodImage from '../assets/petFood.png';
import petcleanImage from '../assets/petClean.png';
import pettoyImage from '../assets/dogToy.png';
import petDoctorImage from '../assets/dogDoctor.png';
import petsleepImage from '../assets/petSleeping.png';
// import CarouselHeader from "../adoption/components/CarouselHeader";
// import PetCarousel from "../adoption/components/PetCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import Footer from '../ui/Footer';

const Home = () => {
    return (
        <div>
            <div className="flex md:pt-20 flex-col p-4 md:flex-row justify-evenly items-center bg-cream">
                {/* Text Section */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <h1 className="text-3xl md:text-4xl font-bold">Welcome to PetCare!</h1>
                    <p className="mt-2 text-gray-600 text-lg">Your one-stop solution for pet adoption, tips, and products!</p>
                    <p className="mt-4 text-gray-500 text-lg">
                        At PetCare, we are dedicated to helping you find the perfect pet, providing valuable tips for pet care, and offering a wide range of quality products for your furry friends.
                    </p>

                    {/* Button Section - now always side by side */}
                    <div className="mt-12 flex space-x-4"> {/* Use space-x-4 for horizontal spacing */}
                        <Link to="/store">
                            <button className="bg-primary text-white py-2 px-4 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                                Shop Now
                            </button>
                        </Link>
                        <Link to="/tips">
                            <button className="border border-primary text-primary py-2 px-4 rounded-3xl transition duration-300 hover:bg-primary hover:text-white">
                                Tips
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/3">
                    <img src={petcareImage} alt="Pet Care" className="mt-4 rounded-lg w-full h-auto" />
                </div>
            </div>

            {/* Carousel Section */}
            <div className="mt-6">
                {/* <CarouselHeader />
                <PetCarousel /> */}
            </div>

            <div>
                <div className="ps-8">
                    <div className="font-bold text-gray-700 text-2xl">Our Products</div>
                    <div className="bg-primary h-1 rounded-3xl w-20 mt-2"></div>
                </div>

                <div className="flex flex-col md:flex-row md:h-[28rem] space-y-4 md:space-y-0 md:space-x-4 mx-8 mt-6 mb-8">
                    {/* Left Section */}
                    <div className="w-full md:w-2/3 h-full space-y-4">
                        <div className="bg-lightOrange w-full h-1/2 rounded-lg p-5 flex justify-between items-center">
                            <div className="w-2/3 space-y-5 ">
                                <div className="text-primary font-bold text-3xl h-1/3">Nutrient-Rich Meals</div>
                                <div className="text-gray-600 text-sm h-1/3">Fuel your pet's health with high-quality, balanced meals made from natural ingredients.</div>
                                <div className={"h-1/3"}>
                                    <Link to="/store">
                                        <button className="bg-primary text-white py-2 px-4 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                                            Shop Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-1/3 ms-8 md:ms-24">
                                <img className="h-full w-full object-cover" src={petfoodImage} alt="Pet Food"/>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row w-full h-1/2 space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex flex-row bg-lightOrange w-full md:w-1/2 rounded-lg p-5">
                                <div className={"space-y-2 w-1/2"}>
                                    <div className={"text-primary font-bold text-xl h-1/3"}>Hygiene Essentials</div>
                                    <div className="text-gray-600 text-xs h-1/3">Keep your pet clean with our grooming and hygiene products designed for all fur types.</div>
                                    <div className={"h-1/3"}>
                                        <Link to="/store">
                                            <button className="bg-primary text-white py-2 px-4 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                                                Shop Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className={"w-1/2"}><img alt="Pet Care" src={petcleanImage}/></div>
                            </div>
                            <div className="flex flex-row p-5 bg-lightGray w-full md:w-1/2 rounded-lg">
                                <div className={"space-y-2 w-1/2"}>
                                    <div className={"text-primary font-bold text-xl h-1/3"}> Interactive Toys for Fun</div>
                                    <div className="text-gray-600 text-xs h-1/3">Engage your pet with durable and fun toys that stimulate their mind and keep them active.</div>
                                    <div className={"h-1/3"}>
                                        <Link to="/store">
                                            <button className="bg-primary text-white py-2 px-4 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                                                Shop Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className={"w-1/2 flex flex-col justify-center"}><img alt="Pet Care" className={"scale-125"} src={pettoyImage}/></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="bg-lightGray w-full md:w-1/3 rounded-lg h-[29rem] p-6 flex flex-col">
                       <div className={"space-y-5 h-1/2"}>
                           <div className="text-primary font-bold text-3xl">Cozy Beds & Sleep Accessories</div>
                           <div className="text-gray-600 text-sm">Help your pet rest better with our comfortable, supportive beds and soothing sleep accessories.</div>
                           <div>
                               <Link to="/store">
                                   <button className="bg-primary text-white py-2 px-4 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                                       Shop Now
                                   </button>
                               </Link>
                           </div>
                       </div>
                        <div className={"h-1/2 flex justify-end"}><img alt="Pet Care" className={"scale-150 pe-4"} src={petsleepImage}/></div>
                    </div>
                </div>
            </div>
            <div className="relative bg-white flex flex-col items-center p-8 mb-12">
                {/* Background paws */}
                <div className="absolute top-0 left-0 text-gray-300 opacity-20">
                    <FontAwesomeIcon icon={faPaw} size="6x" />
                </div>
                <div className="absolute bottom-0 right-0 text-gray-300 opacity-20">
                    <FontAwesomeIcon icon={faPaw} size="6x" />
                </div>

                {/* Circle Image Container */}
                <div className="relative z-10 w-48 h-48 rounded-full border-4 border-primary flex items-center justify-center overflow-hidden">
                    <img src={petDoctorImage} alt="Pet Care" className="w-full h-full object-cover"/>
                </div>

                {/* Title, Description, and Button */}
                <div className="relative z-10 mt-6 text-center">
                    <div className="text-primary font-bold text-2xl mb-2">Helpful Pet Articles</div>
                    <div className="text-gray-600 text-sm mb-4">Explore expert tips and articles to care for your pets, ensuring they live a happy and healthy life.</div>
                    <Link to="/tips">
                        <button className="bg-primary text-white py-2 px-6 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>

            <div className={"mx-4 mb-12 md:mx-12 bg-lightGray rounded-3xl flex flex-col md:flex-row space-y-4 md:space-x-12 md:space-y-0 p-6"}>
                <div className={"space-y-3 w-full md:w-1/3"}>
                    <div className={"text-primary text-xl font-bold"}>Daily Newsletter</div>
                    <div className={"text-gray-600 text-sm"}>Subscribe to our daily newsletter and enjoy the helpful tips</div>
                </div>

                <div className={"w-full md:w-2/3 flex flex-col md:flex-row items-center"}>
                    <form className="w-full md:w-2/3">
                        <input
                            className={
                                "w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none text-gray-700"
                            }
                            placeholder={"Your email here"}
                        />
                    </form>
                    <div className="mt-4 md:mt-0 md:ml-4">
                        <Link to="/">
                            <button className="bg-primary text-white py-2 px-4 rounded-3xl transition duration-300 hover:bg-[#D77A48]">
                                Subscribe
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        <Footer/>

        </div>
    );
};

export default Home;
