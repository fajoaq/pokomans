import { useStore } from "@nanostores/solid";
import {
  populateStore,
  incrementStore,
  filteredList,
  searchTerm,
  getPokomans,
  setLoadedIndex,
  loadedIndex,
} from "../lib/pokomanStore";
import createSlug from "../lib/createSlug";

interface IProps {
  loadMax?: number;
  increment?: number;
}

export default function ({ loadMax, increment }: IProps) {
  if (!getPokomans().length)
    loadMax ? incrementStore(loadMax) : populateStore();

  const $loadedPMNum = useStore(loadedIndex);
  const $list = useStore(filteredList);
  const $term = useStore(searchTerm);

  function incrementList() {
    setLoadedIndex($loadedPMNum() + (increment ? increment : 1));
    incrementStore();
  }

  const List = ({ ...rest }) => (
    <ul {...rest}>
      {$term().length && !$list().length ? (
        <p class="bg-red-700">No Pokoman found</p>
      ) : null}

      {$list().length
        ? $list().map((p) => (
            <li class="w-60">
              <a class="stat" href={`/pokoman/${createSlug(p.data.title)}`}>
                <div class="stat-figure text-secondary">
                  <div class="avatar ">
                    <div class="w-16 rounded-full">
                      <img
                        src={`/images/${p.data.title.toLowerCase()}.svg`}
                        alt={`The Pokoman named ${p.data.title}`}
                      />
                    </div>
                  </div>
                </div>
                <p class="stat-value stat-md ">{p.data.title}</p>
                <p class="stat-title">{p.data.intro}</p>
              </a>
            </li>
          ))
        : null}
    </ul>
  );

  return (
    <>
      <List class="menu bg-base-200 flex w-60 lg:w-full flex-wrap !flex-row rounded-box" />

      <div class="flex justify-center w-full">
        <button
          class="btn btn-outline btn-secondary bg-base-300 btn-xs sm:btn-sm md:btn-md lg:btn-lg text-center mt-8"
          onclick={incrementList}
        >
          load more
        </button>
      </div>
    </>
  );
}
