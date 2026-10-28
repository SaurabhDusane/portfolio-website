import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** A small graph where one point has lost its connections: the "you are here" of a broken link. */
function DisconnectedNode() {
  const nodes = [
    [40, 70],
    [110, 30],
    [150, 100],
    [80, 140],
    [190, 50],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 2],
    [1, 4],
    [2, 4],
  ];
  return (
    <svg viewBox="0 0 360 170" className="w-full max-w-[360px] h-auto" aria-hidden="true">
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="cover-edge" strokeWidth="1.5" />
      ))}
      {/* The dashed stubs lead nowhere */}
      <line x1="190" y1="50" x2="250" y2="78" className="cover-edge" strokeWidth="1.5" strokeDasharray="4 6" />
      <line x1="150" y1="100" x2="240" y2="98" className="cover-edge" strokeWidth="1.5" strokeDasharray="4 6" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="cover-node" strokeWidth="1.5" />
      ))}
      <circle cx="300" cy="88" r="9" className="cover-node cover-node-hot" strokeWidth="1.5" />
      <circle cx="300" cy="88" r="18" fill="none" className="cover-edge-hot" strokeWidth="1.5" strokeDasharray="3 5" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="page">
      <DisconnectedNode />
      <p className="t-small tabular-nums mt-8">404</p>
      <h1 className="t-h1 mt-2">This page isn’t connected to anything</h1>
      <p className="t-body mt-3 max-w-[520px]">
        Like a node with no edges, this link doesn’t lead anywhere. It may have moved, or the address might be
        mistyped.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <Link href="/projects" className="btn btn-secondary">
          See the work
        </Link>
      </div>
    </div>
  );
}
