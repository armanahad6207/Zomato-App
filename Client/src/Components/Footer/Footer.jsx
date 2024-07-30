function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 mb-4">
              <h5 className="font-bold text-lg mb-2">About Us</h5>
              <p className="text-sm">
                We are a company dedicated to providing the best services to our
                customers.
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-4">
              <h5 className="font-bold text-lg mb-2">Contact</h5>
              <ul className="text-sm">
                <li>Email: support@company.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Street, City, Country</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-4">
              <h5 className="font-bold text-lg mb-2">Quick Links</h5>
              <ul className="text-sm">
                <li>
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-4">
              <h5 className="font-bold text-lg mb-2">Follow Us</h5>
              <ul className="flex space-x-4 text-sm">
                <li>
                  <a
                    href="https://facebook.com"
                    className="hover:text-gray-400"
                  >
                    <i className="fab fa-facebook"></i> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" className="hover:text-gray-400">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    className="hover:text-gray-400"
                  >
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    className="hover:text-gray-400"
                  >
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm">
              &copy; 2024 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
