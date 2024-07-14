import { Line, RouteType } from "@/types";

export function LineList({ lines }: { lines: Line[] }) {
  return (
    <div className="space-y-3">
      {lines.map((line) => {
        return <LineDisplay key={line.id} line={line} />;
      })}
    </div>
  );
}

export function LineDisplay({ line }: { line: Line }) {
  const isBus = [RouteType.bus, RouteType.trolleybus].includes(line.type);
  const showBusNumber = 
  return (
    <div className="border p-3 rounded-md flex items-baseline gap-2">
      <div className="size-3 rounded-full flex-none" style={{ backgroundColor: `#${line.color}` }}></div>
      <div>
        {isBus ? (
          <>
            <span className="font-bold">{line.id}</span> <span className="">{line.longName}</span>
          </>
        ) : (
          <span className="font-bold">{line.longName}</span>
        )}
      </div>
    </div>
  );
}
