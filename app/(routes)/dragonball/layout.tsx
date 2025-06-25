import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DragonBall API - Anime Platform",
  description: "Access DragonBall characters, transformations and planets data",
};

export default function DragonBallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
