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

function GenreSelect({
  onChange: parentOnChange,
  selectedValues: selectedGenres,
  parentFormName = "UNSETPARENTNAME",
  // by default, just make is a normal dropdown
  canSelectMultiple = false
}) {
  function mockParentOnChange(data) {
    console.group("In Genre Multi Select Changer")
    console.info(data)
    console.groupEnd()
  }
  return (
    <GenericModelSelect
      parentFormName={parentFormName}
      onChange={parentOnChange}
      modelName="genre"
      selectedValues={selectedGenres}
      canSelectMultiple={canSelectMultiple}
    />
  );
}

export default GenreSelect


