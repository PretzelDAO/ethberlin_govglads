import composeClassName from "@/utils/compose-class-name";

interface Props {
  fill: number; // [0, 1]
}

const VotingPowerBar = ({ fill }: Props) => {
  return (
    <div>
      <div
        style={{ width: `${fill * 100}%` }}
        className={composeClassName(
          "h-2",
          "mx-auto",
          "bg-blue-400",
          fill !== 1 && "rounded-md"
        )}
      ></div>
    </div>
  );
};

export default VotingPowerBar;
