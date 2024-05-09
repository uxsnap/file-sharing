import { Select } from "@mantine/core";
import { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Select
      searchable
      placeholder="Search for user..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      nothingFoundMessage="No user with such name..."
      data={[]}
      limit={10}
    />
  );
};

export default Search;
