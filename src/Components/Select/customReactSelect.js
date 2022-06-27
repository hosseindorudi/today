import React from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white',outerWidth:"100%" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? data.color
            : isFocused
            ? color.alpha(0.1).css()
            : undefined,
          color: isDisabled
            ? '#ccc'
            : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
    
          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled
              ? isSelected
                ? data.color
                : color.alpha(0.3).css()
              : undefined,
          },
        };
      },
      multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: color.alpha(0.1).css(),
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
          backgroundColor: data.color,
          color: 'white',
        },
      }),
}

export const CustomReactMultiSelect= ({options,placeholder,value,onchangeHandler,isMulti,isLoading}) => (
  <Select
    placeholder={placeholder}
    closeMenuOnSelect={!isMulti}
    isMulti={isMulti}
    options={options}
    value={value}
    styles={colourStyles}
    onChange={onchangeHandler}
    isLoading={isLoading}
  />
);