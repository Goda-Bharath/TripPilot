import { Link } from "react-router-dom";

function CustomerCare() {
  return (
    <div className="max-w-7xl mx-auto px-4 right-20 py-12 grid lg:grid-cols-2 gap-8">
      <Link to="/customer-care">
        <div className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 rounded-2xl p-5 shadow-lg">
          <div className="bg-white rounded-xl p-8 h-full">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Contact Us
              </h2>
              <p className="text-gray-500 mt-2">
                We'd love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Email
                </h4>
                <Link
                  to="/emailcontact"
                  className="text-sm text-gray-600 hover:text-blue-500"
                >
                  support@example.com
                </Link>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Phone
                </h4>
                <p className="text-sm text-gray-600 hover:text-blue-500">
                  +91 98765 43210
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Location
                </h4>
                <p className="text-sm text-gray-600 hover:text-blue-500">
                  Hyderabad, India
                </p>
              </div>

            </div>
          </div>
        </div>
      </Link>
      <div className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 rounded-2xl p-5 shadow-lg">
        <img
          src="https://www.kapture.cx/blog/wp-content/uploads/2022/05/positive-language-in-customer-service.jpg"
          alt="Customer Support"
          className="w-full h-full rounded-xl object-cover"
        />
      </div>

    </div>
  );
}

export default CustomerCare;