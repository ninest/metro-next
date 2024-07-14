"use client";

import { Spacer } from "@/components/spacer";
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation";
import { direction } from "@/entities/direction";
import { routes } from "@/routes";
import { Direction, Stop } from "@/types";
import { redirect, usePathname } from "next/navigation";

export function DirectionDisplay({
  locationCode,
  lineId,
  currentDirectionId,
  directions,
  stops,
}: {
  locationCode: string;
  lineId: string;
  currentDirectionId: string;
  directions: Direction[];
  stops: Stop[];
}) {
  const currentDirection = directions.find((d) => d.id === currentDirectionId);
  if (!currentDirection) return redirect(routes.location(locationCode).line(lineId).index());

  const branches = direction.getStopsOrder(currentDirection);
  const stopsInDirection = branches.map((stopIds) => stopIds.map((id) => (stops.find((s) => s.id === id))?.name));

  return (
    <>
      <TabNavigation>
        {directions.map((direction) => {
          const href = routes.location(locationCode).line(lineId).direction(direction.id);
          const active = currentDirectionId === direction.id;
          return (
            <TabNavigationLink key={direction.id} href={href} active={active}>
              {direction.name}
            </TabNavigationLink>
          );
        })}
      </TabNavigation>

      <Spacer className="h-3" />

      <pre className="text-xs">{JSON.stringify(stopsInDirection,null,2)}</pre>
      {/* <div className="space-y-3">
        {stopsInDirection.map((stop) => {
          return <div key={stop?.id}>{stop?.name}</div>;
        })}
      </div> */}
    </>
  );
}
