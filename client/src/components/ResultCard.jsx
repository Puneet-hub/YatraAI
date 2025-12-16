import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { platformLinks } from "../utils/platformLinks";
import { createGoogleMapsLink } from "../utils/maps";
import { extractPlacesFromPlan } from "../utils/extractPlaces";

/* 🔗 Custom link renderer */
function LinkRenderer({ href, children }) {
  const text = String(children[0]);

  if (platformLinks[text]) {
    return (
      <a
        href={platformLinks[text]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline"
      >
        {text} ↗
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  );
}

export default function ResultCard({ plan, fromCity, toCity }) {
  const [view, setView] = useState("formatted");

  const isCheapest = plan.includes("Cheapest Option");
  const isBest = plan.includes("Best Experience");

  const extractedPlaces = extractPlacesFromPlan(plan);

  const mapsLink =
    fromCity && toCity
      ? createGoogleMapsLink(fromCity, toCity, extractedPlaces)
      : "#";

  const shareLink = `${window.location.origin}/share?plan=${encodeURIComponent(
    plan
  )}`;

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Your AI Travel Plan
        </h2>

        <button
          onClick={() =>
            setView(view === "formatted" ? "raw" : "formatted")
          }
          className="text-xs text-blue-600 hover:underline"
        >
          {view === "formatted" ? "View raw text" : "View formatted"}
        </button>
      </div>

      {/* Badges */}
      {(isCheapest || isBest) && (
        <div className="flex gap-2 mb-4">
          {isCheapest && (
            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs">
              Cheapest option
            </span>
          )}
          {isBest && (
            <span className="bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-xs">
              Best experience
            </span>
          )}
        </div>
      )}

      {/* Places */}
      {extractedPlaces.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Places covered
          </p>
          <div className="flex flex-wrap gap-2">
            {extractedPlaces.map((place, idx) => (
              <span
                key={idx}
                className="bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full text-xs"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {view === "formatted" ? (
        <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
          <ReactMarkdown components={{ a: LinkRenderer }}>
            {plan}
          </ReactMarkdown>
        </div>
      ) : (
        <pre className="bg-gray-50 p-4 rounded-lg text-xs text-gray-700 whitespace-pre-wrap">
          {plan}
        </pre>
      )}

      {/* Actions */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-3">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-center py-2.5 rounded-lg text-sm font-medium transition ${
            fromCity && toCity
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-400 pointer-events-none"
          }`}
        >
          Open in Google Maps
        </a>

        <button
          onClick={() => window.print()}
          className="py-2.5 rounded-lg text-sm text-gray-700 bg-gray-300 hover:bg-gray-100 transition"
        >
          Save / Print PDF
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(shareLink);
            alert("Shareable link copied!");
          }}
          className="md:col-span-2 py-2.5 rounded-lg text-sm text-grey-700 bg-green-100 hover:bg-gray-100 transition"
        >
          Copy shareable link
        </button>
      </div>
    </div>
  );
}
