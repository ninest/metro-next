import { Direction, Stop } from "@/types";

function getStopsOrder(direction: Direction) {
  // // First stop
  // let currentStop = direction.stops.find((stop) => !Object.values(direction.order).flat().includes(stop.parentStation));
  // if (!currentStop) throw new Error("No start stop found");
  // const orderedStops = [];
  // while (currentStop) {
  //   orderedStops.push(currentStop.parentStation);
  //   const nextStops = direction.order[currentStop.parentStation];
  //   if (!nextStops || nextStops.length === 0) break;
  //   currentStop = direction.stops.find((stop) => stop.parentStation === nextStops[0]);
  // }
  // return orderedStops
  const { order } = direction;
  const branches: string[][] = [];
  const visited: Set<string> = new Set();

  function dfs(current: string, path: string[]): void {
    if (visited.has(current)) {
      branches.push([...path]);
      return;
    }

    visited.add(current);
    path.push(current);

    if (!order[current] || order[current].length === 0) {
      branches.push([...path]);
    } else {
      for (const next of order[current]) {
        dfs(next, path);
      }
    }

    path.pop();
    visited.delete(current);
  }

  for (const start in order) {
    if (Object.keys(order).every((key) => !order[key].includes(start))) {
      dfs(start, []);
    }
  }

  return branches;
}

export const direction = {
  getStopsOrder,
};
