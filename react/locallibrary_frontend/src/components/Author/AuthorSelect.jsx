import GenericModelSelect from "../FormSelection/GenericModelSelect";

function AuthorSelect({
  onChange: parentOnChange,
  selectedValues,
  parentFormName = "UNSETPARENTNAME",
  // by default, just make is a normal dropdown
  canSelectMultiple = false
}) {
  return (
    <GenericModelSelect
      parentFormName={parentFormName}
      onChange={parentOnChange}
      modelName="author"
      selectedValues={selectedValues}
      canSelectMultiple={canSelectMultiple}
    />
  );
}

export default AuthorSelect



