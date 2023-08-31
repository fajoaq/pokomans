import { filterPokomans } from "../lib/pokomanStore";

export default function PokomanSearch() {
  const Search = () => (
    <>
      <div class="join mb-4">
        <div>
          <div>
            <input
              class="input input-bordered join-item"
              placeholder="Search..."
              type="search"
              incremental
              onInput={(e) => {
                filterPokomans(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );

  return <Search />;
}
