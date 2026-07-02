import { useState } from "react";
import { Link } from "react-router-dom";

const WhatsAppChat = () => {
    const [open, setOpen] = useState(false);

    const phoneNumber = "919346352287";

    const openWhatsApp = () => {
        window.open(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                "Hi! I need help."
            )}`,
            "_blank"
        );
        setOpen(false);
    };
    const callNow = () => {
  window.location.href = `tel:+919346352287`;
};

    return (
        <>
            <div className="fixed bottom-10 right-3 z-[100] group ">
                <button
                    onClick={callNow}
                    className="fixed bottom-35  right-3 z-[100] h-12 w-12 flex items-center justify-center hover:scale-110 transition"
                    aria-label="Call Now"
                >
                    <div className="bg-green-400 p-2 rounded-full cursor-pointer animate-pulse">
                        📞
                    </div>
                </button>
              
                <div className="absolute right-16 top-0 bg-black text-white text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition">
                    Give old dress & Save ₹500
                </div>

                <div className="absolute right-16 top-10 bg-black text-white text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition">
                    Exchange & Get coupon code
                </div>
            </div>
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-3 z-[100] h-12 w-12 flex items-center justify-center hover:scale-110 transition"
                aria-label="Open WhatsApp Chat"
            >
                <div className="bg-green-400 p-2 cursor-pointer rounded-full animate-pulse">
                    💬
                </div>
            </button>

            {/* Chat Popup */}
            {open && (
                <div className="fixed bottom-24 right-4 cursor-pointer w-80 bg-white rounded-xl shadow-xl z-[1001] border animate-in slide-in-from-bottom-2">

                    {/* Header */}
                    <div className="p-4 border-b flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                            GB
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Customer Care</p>
                            <p className="text-xs text-green-500">Online Shopping</p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="ml-auto text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Message */}
                    <div className="p-4">
                        <div className="bg-gray-100 rounded-lg p-3 text-sm">
                            👋 Hi! How can I help you?
                        </div>
                    </div>

                    {/* Action */}
                    <div className="p-4 border-t">
                        <button
                            onClick={openWhatsApp}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Chat on WhatsApp
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-2">
                            Powered by WhatsApp
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default WhatsAppChat;