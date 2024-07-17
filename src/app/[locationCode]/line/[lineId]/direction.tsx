"use client";

import { Spacer } from "@/components/spacer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation";
import { direction } from "@/entities/direction";
import { routes } from "@/routes";
import { Direction, Line, Stop } from "@/types";
import { cn } from "@/utils/style";
import { redirect, usePathname } from "next/navigation";

export function DirectionDisplay({
  locationCode,
  line,
  currentDirectionId,
  directions,
  stops,
}: {
  locationCode: string;
  line: Line;
  currentDirectionId: string;
  directions: Direction[];
  stops: Stop[];
}) {
  const currentDirection = directions.find((d) => d.id === currentDirectionId);
  if (!currentDirection) return redirect(routes.location(locationCode).line(line.id).index());

  const branches = direction.getStopsOrder(currentDirection);
  const stopsInDirectionBranches = branches.map((stopIds) => stopIds.map((id) => stops.find((s) => s.id === id)!));

  const hasMultipleBranches =
    direction.shouldDisplayMultipleBranches(stopsInDirectionBranches) && stopsInDirectionBranches.length > 1;
  const branchingStation = hasMultipleBranches
    ? direction.findBranchPointBidirectional(stopsInDirectionBranches[0], stopsInDirectionBranches[1])
    : null;

  return (
    <>
      <TabNavigation>
        {directions.map((direction) => {
          const href = routes.location(locationCode).line(line.id).direction(direction.id);
          const active = currentDirectionId === direction.id;
          return (
            <TabNavigationLink key={direction.id} href={href} active={active}>
              {direction.name}
            </TabNavigationLink>
          );
        })}
      </TabNavigation>

      <Spacer className="h-3" />

      {/* <pre>
        {JSON.stringify(
          stopsInDirectionBranches.map((s) => s.map((b) => b.name)),
          null,
          2
        )}
      </pre> */}

      {hasMultipleBranches ? (
        <>
          <Accordion type="single" collapsible>
            {stopsInDirectionBranches.map((branch) => {
              const from = branch[0]?.name;
              const to = branch.at(-1)?.name;

              const key = `${from}-to-${to}`;
              return (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>
                    {from} to {to}
                  </AccordionTrigger>
                  <AccordionContent>
                    <StopList line={line} branchingStation={branchingStation} stops={branch} />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      ) : (
        <>
          <StopList line={line} stops={stopsInDirectionBranches[0]} />
        </>
      )}

      {/* <pre className="text-xs">{JSON.stringify({ stopsInDirectionBranches }, null, 2)}</pre> */}
      {/* <div className="space-y-3">
        {stopsInDirection.map((stop) => {
          return <div key={stop?.id}>{stop?.name}</div>;
        })}
      </div> */}
    </>
  );
}

function StopList({
  line,
  branchingStation = null,
  stops,
}: {
  line: Line;
  branchingStation?: null | Stop;
  stops: Stop[];
}) {
  return (
    <ul>
      {stops.map((station) => {
        const isBranch = station?.parentStation === branchingStation?.parentStation;
        return (
          <li key={station.id} className="flex gap-2 items-baseline">
            <div style={{ backgroundColor: `#${line.color}` }} className="size-2 rounded-full"></div>
            <div className={cn({ "font-bold": isBranch })}>{station?.name}</div>
          </li>
        );
      })}
    </ul>
  );
}
