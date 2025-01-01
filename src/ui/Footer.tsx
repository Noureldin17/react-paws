import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-cream text-gray-700 py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">

                    {/* About Us */}
                    <div className="md:w-1/3 pe-8">
                        <h3 className="text-primary text-xl font-bold mb-3">About PetCare</h3>
                        <p className="text-gray-600">
                            At PetCare, we believe in the well-being of your pets. From adoption tips to healthy pet products,
                            our goal is to be a trusted resource for all your pet care needs.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div className="md:w-1/3">
                        <h3 className="text-primary text-xl font-bold mb-3">Useful Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/store" className="hover:underline">Store</a></li>
                            <li><a href="/adoption" className="hover:underline">Adoption</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="md:w-1/3">
                        <h3 className="text-primary text-xl font-bold mb-3">Follow Us</h3>
                        <p className="text-gray-600 mb-4">
                            Stay updated with our latest news, tips, and products. Follow us on social media!
                        </p>
                        <div className="flex space-x-4 text-primary">
                            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-[#D77A48]">
                                <FontAwesomeIcon icon={faFacebookF} size="lg" />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-[#D77A48]">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-[#D77A48]">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="https://youtube.com" aria-label="YouTube" className="hover:text-[#D77A48]">
                                <FontAwesomeIcon icon={faYoutube} size="lg" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm">
                    <p>&copy; 2024 PetCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
