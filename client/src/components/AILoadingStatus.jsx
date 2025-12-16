import { useEffect, useState } from "react";

const messages = [
  "😅 Convincing Google Maps not to lie",
  "🧭 Asking locals for hidden gems",
  "🚌 Finding buses that actually arrive on time",
  "✈️ Booking flights in imagination mode",
  "🏨 Checking hotel pillows for comfort",
  "🍽️ Scanning menus for must-try food",
  "🏔️ Climbing virtual mountains (no oxygen needed)",
  "🛣️ Avoiding routes that look good only on maps",
  "🏔️ Preparing for mild adventures and epic photos",
  "🌍 Unlocking your next travel memory",
  "🤫 Ignoring your wallet’s objections",
  "✈️ Plotting a legendary escape plan…",
];

export default function AILoadingStatus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 flex justify-center">
      <p className="text-sm text-gray-600 animate-fadeIn text-center">
        {messages[index]}…
      </p>
    </div>
  );
}
