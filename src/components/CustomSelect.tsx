import React from 'react';
import Select, { Props } from 'react-select';

interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} />
  );
}

export default CustomSelect;