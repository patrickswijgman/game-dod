const entities: Array<number> = [];

let playerIdx = 0;

export function addEntity(i: number) {
  entities.push(i);
}

export function getEntities(): Readonly<Array<number>> {
  return entities;
}

export function sortEntities(sort: (a: number, b: number) => number) {
  entities.sort(sort);
}

export function setPlayer(i: number) {
  playerIdx = i;
}

export function getPlayer() {
  return playerIdx;
}
