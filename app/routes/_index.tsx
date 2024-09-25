import "@xyflow/react/dist/style.css";

import type { MetaFunction } from "@remix-run/cloudflare";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";

import { StartNode } from "~/components/node/input-node";
import { Button } from "~/components/ui/button";

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

  createNode: state.createNode,

  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function Index() {
  const store = useFlowStore(useShallow(selector));

  return (
    <div className="flex h-screen w-screen">
      <div className="w-full">
        <ReactFlow
          nodes={store.nodes}
          edges={store.edges}
          nodeTypes={{ start: StartNode }}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          fitView
        >
          <MiniMap />
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <nav className="fixed right-0 m-8 h-[calc(100%_-_4rem)] w-80 rounded-xl bg-white p-4 shadow-xl">
        <Button
          onClick={() =>
            store.createNode({
              type: "start",
              position: { x: 0, y: 0 },
              data: { value: 123 },
            })
          }
        >
          AddNode
        </Button>
      </nav>
    </div>
  );
}
