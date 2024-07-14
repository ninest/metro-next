import { routes } from "@/routes";
import { Line, RouteType } from "@/types";
import Link from "next/link";

export function LineList({ lines, locationCode }: { lines: Line[]; locationCode: string }) {
  return (
    <div className="space-y-3">
      {lines.map((line) => {
        return <LineDisplay key={line.id} line={line} locationCode={locationCode} />;
      })}
    </div>
  );
}

export function LineDisplay({ line, locationCode }: { line: Line; locationCode: string }) {
  return (
    <Link
      href={routes.location(locationCode).line(line.id).index()}
      className="pb-3 border-b flex items-baseline gap-2"
    >
      <div className="size-3 rounded-sm flex-none" style={{ backgroundColor: `#${line.color}` }}></div>
      <div>
        <span className="font-bold">{line.shortName}</span> <span className="">{line.longName}</span>
      </div>
    </Link>
  );
}
