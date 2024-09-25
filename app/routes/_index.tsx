import "@xyflow/react/dist/style.css";

import type { MetaFunction } from "@remix-run/node";
import { Background, ReactFlow } from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";

import { StoreType, useFlowStore } from "./store/store";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

const selector = (state: StoreType) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function Index() {
  const store = useFlowStore(useShallow(selector));

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
