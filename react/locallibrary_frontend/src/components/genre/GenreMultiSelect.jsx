/*
 * component that serves as the multi-select form item for any form that wants to select on genre
 *
 * This will intiate a GET request
 * for all genres from the API
 *
 * It is intended to work as a 
 * react-bootstrap form component
 */

import GenericModelSelect from "../FormSelection/GenericModelSelect";

function GenreMultiSelect({
  onChange: parentOnChange,
  selectedValues: selectedGenres,
  parentFormName = "UNSETPARENTNAME",
}) {
  return (
    <GenericModelSelect
      parentFormName={parentFormName}
      onChange={parentOnChange}
      modelName="genre"
      selectedValues={selectedGenres}
      canSelectMultiple={true}
    />
  );
}

export default GenreMultiSelect


