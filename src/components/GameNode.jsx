import { useCallback } from "react";
import { Handle } from "reactflow";

export default function GameNode({ data, id }) {
  const showId = () => console.log(id);

  return (
    <div
      className="relative rounded-full border-2 border-black"
      onClick={showId}
    >
      <Handle
        type="source"
        isConnectable={true}
        className=" top-[50%] mt-[-15px] h-[30px] w-[30px] rounded-full"
      />
      {console.log(data.live ? id : "")}
      <div
        className={`h-[50px] w-[50px] rounded-full bg-${data.live ? "green" : "red"}-700`}
      ></div>
    </div>
  );
}
