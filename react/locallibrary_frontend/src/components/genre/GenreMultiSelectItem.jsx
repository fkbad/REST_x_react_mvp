

function MultiSelectItem({ id, name }) {
  /* function to generate each <option> for a ANY multi-selct
   *
   * Inputs:
   *    id: the id/primary key of the model this options represent
   *    name: the display name of the model
   */
  return (
    <>
      <option value={id} >{name}</option>
    </>
  );
}

export default MultiSelectItem
