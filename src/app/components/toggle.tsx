import composeClassName from "@/utils/compose-class-name";

interface Props {
  leftLabel: string;
  rightLabel: string;
  onChange?: (selected: "left" | "right") => void;
  state?: "left" | "right";
}

const Toggle = ({ leftLabel, rightLabel, onChange, state }: Props) => {
  return (
    <label className="cursor-pointer inline-flex gap-4 items-center">
      {/* NOTE: Needs to be first element, else "peer" modifier won't work */}
      <input
        type="checkbox"
        value={state}
        className="peer opacity-0 absolute h-0 w-0"
        onChange={(e) => onChange?.(e.target.checked ? "right" : "left")}
      />
      <span className="peer-unchecked:underline">{leftLabel}</span>
      <span
        style={{ "--padding": "0.25em" } as React.CSSProperties}
        className={composeClassName(
          "text-xl",
          "inline-block",
          "w-[4em]",
          "h-[2em]",
          "bg-slate-200",
          "rounded-full",
          "relative",
          "before:absolute",
          "before:left-[var(--padding)]",
          "before:top-[var(--padding)]",
          "before:bottom-[var(--padding)]",
          "before:rounded-full",
          "before:bg-blue-500",
          "before:aspect-square",
          "before:transition",
          "peer-checked:before:translate-x-[calc(100%+2*var(--padding))]"
        )}
      ></span>
      <span className="peer-checked:underline">{rightLabel}</span>
    </label>
  );
};

export default Toggle;
