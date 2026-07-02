import { Link } from "react-router-dom";

const Home = () => {
  const popularRoutes = [
    {
      from: "Hyderabad",
      to: "Bangalore",
      price: "₹799"
    },
    {
      from: "Hyderabad",
      to: "Chennai",
      price: "₹899"
    },
    {
      from: "Hyderabad",
      to: "Vijayawada",
      price: "₹499"
    },
    {
      from: "Hyderabad",
      to: "Visakhapatnam",
      price: "₹999"
    }
  ];

  return (
    <div className="bg-slate-50">

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="text-6xl font-black leading-tight">
                Book Bus Tickets
                <br />
                Across India
              </h1>

              <p className="mt-6 text-xl text-blue-100">
                Safe, comfortable and affordable travel with verified bus operators.
              </p>

              <div className="flex gap-5 mt-10">

                <Link
                  to="/buses"
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
                >
                  Search Buses
                </Link>

                <Link
                  to="/my-bookings"
                  className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
                >
                  My Bookings
                </Link>

              </div>

            </div>

            <div>

              <div className="bg-white rounded-3xl shadow-2xl p-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Search Your Journey
                </h2>

                <input
                  type="text"
                  placeholder="From"
                  className="w-full mb-4 p-4 rounded-xl border"
                />

                <input
                  type="text"
                  placeholder="To"
                  className="w-full mb-4 p-4 rounded-xl border"
                />

                <input
                  type="date"
                  className="w-full mb-6 p-4 rounded-xl border"
                />

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold">
                  Search Buses
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose TripPilot?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl">🚌</div>
              <h3 className="font-bold text-xl mt-5">500+ Operators</h3>
              <p className="text-gray-500 mt-3">
                Trusted bus partners across India.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl">💳</div>
              <h3 className="font-bold text-xl mt-5">Secure Payments</h3>
              <p className="text-gray-500 mt-3">
                Safe online payment options.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl">⭐</div>
              <h3 className="font-bold text-xl mt-5">Top Rated</h3>
              <p className="text-gray-500 mt-3">
                Thousands of happy travelers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl">📍</div>
              <h3 className="font-bold text-xl mt-5">Live Tracking</h3>
              <p className="text-gray-500 mt-3">
                Track your bus in real time.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Popular Routes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {popularRoutes.map((route, index) => (

              <div
                key={index}
                className="rounded-3xl shadow-lg border hover:shadow-xl transition p-8"
              >

                <h3 className="text-2xl font-bold">
                  {route.from}
                </h3>

                <p className="text-center my-4 text-blue-600 text-2xl">
                  ↓
                </p>

                <h3 className="text-2xl font-bold">
                  {route.to}
                </h3>

                <p className="mt-6 text-green-600 font-bold text-xl">
                  Starting {route.price}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-5xl font-black text-blue-600">
                1M+
              </h2>

              <p className="text-gray-500 mt-3">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-blue-600">
                500+
              </h2>

              <p className="text-gray-500 mt-3">
                Bus Operators
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-blue-600">
                100+
              </h2>

              <p className="text-gray-500 mt-3">
                Cities Connected
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-blue-600">
                24/7
              </h2>

              <p className="text-gray-500 mt-3">
                Customer Support
              </p>
            </div>

          </div>

        </div>

      </section>

      <footer className="bg-slate-900 text-white py-12">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <div>

            <h2 className="text-3xl font-black">
              TripPilot
            </h2>

            <p className="text-gray-400 mt-2">
              Your trusted travel partner.
            </p>

          </div>

          <div className="flex gap-8 mt-8 md:mt-0">

            <Link to="/">Home</Link>
            <Link to="/buses">Buses</Link>
            <Link to="/my-bookings">Bookings</Link>
            <Link to="/login">Login</Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;