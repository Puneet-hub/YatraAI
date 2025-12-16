import TravelForm from "../components/TravelForm";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4">
      
      {/* 🔥 STEP 2: HERO SECTION
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl font-bold">
          Plan smarter trips with AI ✨
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Get train & bus options, budget stays, food spots,
          and a complete day-wise travel plan — all in seconds.
        </p>
      </div> */}

      {/* Travel Form */}
      <TravelForm />

    </main>
  );
}
