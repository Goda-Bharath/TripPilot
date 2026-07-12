import React from "react";

const offers = [
  {
    id: 1,
    title: "Welcome Offer",
    description: "Get ₹100 OFF on your first booking.",
    code: "WELCOME100",
    discount: "₹100 OFF",
    validTill: "31 Dec 2026",
  },
  {
    id: 2,
    title: "Weekend Special",
    description: "Enjoy 20% OFF on weekend trips.",
    code: "WEEKEND20",
    discount: "20% OFF",
    validTill: "31 Dec 2026",
  },
  {
    id: 3,
    title: "Student Discount",
    description: "Special savings for students.",
    code: "STUDENT15",
    discount: "15% OFF",
    validTill: "31 Dec 2026",
  },
  {
    id: 4,
    title: "Festival Offer",
    description: "Celebrate your holidays with extra savings.",
    code: "FESTIVAL25",
    discount: "25% OFF",
    validTill: "31 Dec 2026",
  },
  {
    id: 5,
    title: "Family Trip",
    description: "Book for your family and save ₹500.",
    code: "FAMILY500",
    discount: "₹500 OFF",
    validTill: "31 Dec 2026",
  },
  {
    id: 6,
    title: "Cashback Offer",
    description: "Get 10% cashback on UPI payments.",
    code: "CASHBACK10",
    discount: "10% Cashback",
    validTill: "31 Dec 2026",
  },
];
const Offers = () => {
  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    alert(`${code} copied successfully!`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Exclusive Offers
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Save more on every TripPilot journey.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {offer.title}
                    </h2>
                    <p className="mt-2 text-gray-500">
                      {offer.description}
                    </p>
                  </div>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {offer.discount}
                  </span>
                </div>
                <div className="mt-6 border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Coupon Code
                    </p>

                    <h3 className="text-2xl font-black tracking-widest text-blue-700">
                      {offer.code}
                    </h3>
                  </div>
                  <button
                    onClick={() => copyCoupon(offer.code)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex justify-between items-center mt-6">

                  <div>
                    <p className="text-sm text-gray-500">
                      Valid Till
                    </p>

                    <p className="font-semibold text-gray-700">
                      {offer.validTill}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Active
                  </span>
                </div>
                <button
                  onClick={() => copyCoupon(offer.code)}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-xl font-bold transition"
                >
                  Use This Offer 
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default Offers;