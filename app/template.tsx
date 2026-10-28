// Templates remount on every navigation, so each page replays the CSS
// entrance fade. Pure CSS: content still ends up visible without JS.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
