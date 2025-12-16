import { cn } from "../utils/cn";

export default function InputField({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={16}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}

      <input
        {...props}
        className={cn(
          // RESET
          "appearance-none bg-transparent border-0 outline-none ring-0",

          // UNDERLINE
          "w-full border-b border-gray-200",
          "pl-6 pr-2 py-2 text-sm text-gray-900",

          // PLACEHOLDER
          "placeholder:text-gray-400",

          // FOCUS EFFECT
          "focus:border-blue-500",

          // SMOOTH
          "transition-colors duration-200"
        )}
      />
    </div>
  );
}
