const entities: Array<number> = [];

export function addEntity(i: number) {
  entities.push(i);
}

export function getEntities(): Readonly<Array<number>> {
  return entities;
}

export function sortEntities(sort: (a: number, b: number) => number) {
  entities.sort(sort);
}
