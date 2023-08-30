import GenericModelSelect from "../FormSelection/GenericModelSelect";

function LanguageSelect({
  onChange: parentOnChange,
  selectedValues,
  parentFormName = "UNSETPARENTNAME",
  // by default, just make is a normal dropdown
  canSelectMultiple = false,
}) {
  return (
    <GenericModelSelect
      parentFormName={parentFormName}
      onChange={parentOnChange}
      modelName="language"
      selectedValues={selectedValues}
      canSelectMultiple={canSelectMultiple}
    />
  );
}

export default LanguageSelect



