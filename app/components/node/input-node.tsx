import { Handle, NodeProps, Position } from "@xyflow/react";
import { FC } from "react";

type StartNodeProps = NodeProps;

export const StartNode: FC<StartNodeProps> = () => {
  return (
    <>
      <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-primary shadow-lg">
        <p className="font-bold text-primary-foreground">Start</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
};
