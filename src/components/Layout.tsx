import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto">
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
