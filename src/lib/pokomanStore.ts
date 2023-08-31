import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { atom } from "nanostores";

import removeDuplicates from "./removearrduplicates";

export const POKOMANS = atom<CollectionEntry<"pokoman">[]>([]);
export const PMOVES = atom<CollectionEntry<"pmove">[]>([]);
export const filteredList = atom<CollectionEntry<"pokoman">[]>([]);
export const filteredPMoves = atom<CollectionEntry<"pmoves">[]>([]);
export const searchTerm = atom<String>("");
export const loadedIndex = atom<number>(0);

export async function populateStore() {
  if (getPokomans().length) return;

  const _PMOVES: CollectionEntry<"pmove">[] = await getCollection("pmove");
  const _POKOMANS: CollectionEntry<"pokoman">[] = await getCollection(
    "pokoman",
    (p) => p.data.draft !== true
  );

  POKOMANS.set(
    removeDuplicates(_POKOMANS, "id").sort((a, b) => a.data.id - b.data.id)
  );
  PMOVES.set(removeDuplicates(_PMOVES, "id"));
  filteredList.set(getPokomans());
  filteredPMoves.set(getPMoves());
  loadedIndex.set(getPokomans().length);
}

export async function incrementStore(loadMax?: number) {
  if (loadMax) setLoadedIndex(loadMax);

  const _p: CollectionEntry<"pokoman">[] = await getCollection(
    "pokoman",
    (p) =>
      p.data.draft !== true &&
      checkIDRange(getLoadedIndex(), getPokomans().length, p.data.id)
  );

  const _P = removeDuplicates(getPokomans().concat(_p), "id").sort(
    (a, b) => a.data.id - b.data.id
  );

  POKOMANS.set(_P);

  filteredList.set(getPokomans());

  if (getPMoves().length) return;

  const _PMOVES: CollectionEntry<"pmove">[] = await getCollection("pmove");

  PMOVES.set(removeDuplicates(_PMOVES, "id"));

  filteredPMoves.set(getPMoves());
}

function checkIDRange(upper: number, lower: number, id: number) {
  if (id > upper) return false;
  if (id <= lower) return false;

  return true;
}

export function filterPokomans(term: String) {
  let list: CollectionEntry<"pokoman">[] = [];

  list = getPokomans().filter((i) =>
    i.data.title.toLowerCase().includes(term.toLowerCase())
  );

  filteredList.set(list);
  searchTerm.set(term);
}

export function filterPMoves(term: String) {
  let list: CollectionEntry<"pokoman">[] = [];

  list = getPMoves().filter((i) =>
    i.data.title.toLowerCase().includes(term.toLowerCase())
  );

  filteredPMoves.set(list);
  searchTerm.set(term);
}

export function getPokomans() {
  return POKOMANS.get();
}

export function getLoadedIndex() {
  return loadedIndex.get();
}

export function setLoadedIndex(num: number) {
  return loadedIndex.set(num);
}

export function getPMoves() {
  return PMOVES.get();
}

export function getFilteredList() {
  return filteredList.get();
}

export function getFilteredPMoves() {
  return filteredPMoves.get();
}
