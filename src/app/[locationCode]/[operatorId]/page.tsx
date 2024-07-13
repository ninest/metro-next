import { Spacer } from "@/components/spacer";
import { metroApiClient } from "@/metro-api";
import { RouteType } from "@/types";

export default async function IndexPage({ params }: { params: { locationCode: string; operatorId: string } }) {
  const operator = await metroApiClient.getOperator(params);
  const lines = await metroApiClient.getLines(params);

  const metroLines = lines.filter((line) =>
    [RouteType.subway, RouteType.light_rail, RouteType.cable_tram].includes(line.type)
  );
  const busLines = lines.filter((line) => [RouteType.bus, RouteType.trolleybus].includes(line.type));
  const regionalLines = lines.filter((line) => [RouteType.rail].includes(line.type));

  return (
    <main className="p-5">
      <h1 className="font-black text-4xl">
        {operator.fullName} ({operator.shortName})
      </h1>

      <Spacer className="h-5" />

      <LineList lines={metroLines} />
      <Spacer className="h-5" />
      <LineList lines={regionalLines} />
    </main>
  );
}

function LineList({ lines }: { lines: { id: string; color: string; longName: string }[] }) {
  return (
    <div className="space-y-3">
      {lines.map((line) => {
        return <Line key={line.id} line={line} />;
      })}
    </div>
  );
}

function Line({ line }: { line: { color: string; longName: string } }) {
  return (
    <div className="border p-3 rounded-md flex items-center gap-2">
      <div className="size-3 rounded-full" style={{ backgroundColor: `#${line.color}` }}></div>
      <div className="font-bold">{line.longName}</div>
    </div>
  );
}
