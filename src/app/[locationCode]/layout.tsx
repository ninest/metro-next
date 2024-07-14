import { Spacer } from "@/components/spacer";
import { metroApiClient } from "@/metro-api";
import { ReactNode } from "react";

export default async function IndexLayout({
  params,
  children,
}: {
  params: { locationCode: string };
  children: ReactNode;
}) {
  const feeds = await metroApiClient.getFeeds(params);
  return (
    <main className="p-5">
      <h1 className="font-black text-4xl">{feeds[0].name}</h1>

      <Spacer className="h-5" />
      
      {children}
    </main>
  );
}
