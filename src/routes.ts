import { createBrowserRouter } from "react-router";
import { MapView } from "./components/MapView";
import { ReelsView } from "./components/ReelsView";
import { LeaderboardView } from "./components/LeaderboardView";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: MapView },
      { path: "reels", Component: ReelsView },
      { path: "leaderboard", Component: LeaderboardView },
    ],
  },
]);
