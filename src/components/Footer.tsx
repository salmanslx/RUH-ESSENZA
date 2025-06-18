import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-black py-16 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/8bc88281-ee6b-4640-bceb-57661193a427.png" 
              alt="Ruh Essenza" 
              className="h-16 w-auto"
            />
            <p style={{ color: '#cdc4a5' }} className="text-sm">
              Crafting exquisite fragrances that capture the essence of the soul. 
              Experience luxury in every bottle.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#cdc4a5' }} className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" style={{ color: '#cdc4a5' }} className="hover:underline">Home</a></li>
              <li><a href="#products" style={{ color: '#cdc4a5' }} className="hover:underline">Collections</a></li>
              <li><a href="#about" style={{ color: '#cdc4a5' }} className="hover:underline">About</a></li>

            </ul>
          </div>

          <div>
            <h3 style={{ color: '#cdc4a5' }} className="font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" style={{ color: '#cdc4a5' }} />
                <span style={{ color: '#cdc4a5' }}>support@ruhessenza.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: '#cdc4a5' }} />
                <span style={{ color: '#cdc4a5' }}>+971 50 902 7555</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" style={{ color: '#cdc4a5' }} />
                <span style={{ color: '#cdc4a5' }}>Dubai, UAE</span>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#cdc4a5' }} className="font-bold mb-4">Social Media</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Instagram className="h-4 w-4" style={{ color: '#cdc4a5' }} />
                <a href="https://www.instagram.com/ruh_essenza" target="_blank" rel="noopener noreferrer">
                  <span style={{ color: '#cdc4a5' }}>ruh_essenza</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Facebook className="h-4 w-4" style={{ color: '#cdc4a5' }} />
                <a href="https://www.facebook.com/ruhessenza" target="_blank" rel="noopener noreferrer">
                  <span style={{ color: '#cdc4a5' }}>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p style={{ color: '#cdc4a5' }} className="text-sm">
            © 2025 Ruh Essenza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
