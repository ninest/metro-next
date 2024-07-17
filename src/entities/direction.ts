import { Direction, Stop } from "@/types";

/**
 * Get the stops as a list of lists, where each list is a branch
 */
function getStopsOrder(direction: Direction) {
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

function findBranchPoint(stations1: Stop[], stations2: Stop[]) {
  let branchPoint: null | Stop = null;

  const length = Math.min(stations1.length, stations2.length);
  for (let i = 0; i < length; i++) {
    if (stations1[i].parentStation === stations2[i].parentStation) {
      branchPoint = stations1[i];
    } else {
      break;
    }
  }

  return branchPoint;
}

function findBranchPointBidirectional(stations1: Stop[], stations2: Stop[]) {
  // Forward direction
  let forwardBranchPoint = findBranchPoint(stations1, stations2);

  // Reverse direction
  let reverseBranchPoint = findBranchPoint(stations1.slice().reverse(), stations2.slice().reverse());

  return forwardBranchPoint || reverseBranchPoint;
}

function shouldDisplayMultipleBranches(branches: Stop[][]) {
  // Should only display branches as separate if branches are NOT subsets of each other
  // Some lines like CR-Worcester have the same line as multiple branches, with some stations removed,
  // probably due to stations being skipped in some schedules
  for (let i = 0; i < branches.length; i++) {
    for (let j = 0; j < branches.length; j++) {
      if (i !== j && isSubset(branches[i], branches[j])) {
        return false;
      }
    }
  }
  return true;
}

function isSubset(subset: Stop[], superset: Stop[]) {
  let i = 0;
  for (let j = 0; j < superset.length && i < subset.length; j++) {
    if (subset[i].parentStation === superset[j].parentStation) {
      i++;
    }
  }
  return i === subset.length;
}

export const direction = {
  getStopsOrder,
  findBranchPointBidirectional,
  shouldDisplayMultipleBranches,
};
