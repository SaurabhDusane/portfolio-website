import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page">
      <p className="t-small tabular-nums">404</p>
      <h1 className="t-h1 mt-2">This page doesn’t exist</h1>
      <p className="t-body mt-3">It may have moved, or the link might be mistyped.</p>
      <Link href="/" className="btn btn-secondary mt-8">
        <ArrowLeft size={16} /> Back to home
      </Link>
    </div>
  );
}
