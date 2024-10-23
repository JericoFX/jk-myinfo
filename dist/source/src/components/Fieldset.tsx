import { Component, JSXElement, Show } from 'solid-js';
import { css } from 'styled-system/css';
const Fieldset: Component<{ legend?: string; children?: JSXElement }> = (
  props
) => {
  return (
    <fieldset
      class={css({
        padding: '0.75rem',
        borderRadius: '0.375rem',
        shadow: 'sm',
        width: '100%',
        height: '100%',
        position: 'relative',
      })}
    >
      <Show when={props.legend} fallback={props.children}>
        <legend
          {...props}
          class={css({
            paddingLeft: props.padding ? '0.25rem' : '0',
            paddingRight: props.padding ? '0.25rem' : '0',
            fontSize: '0.85rem',
            lineHeight: '1rem',
            fontWeight: 600,
            color: '#D1D5DB',
          })}
        >
          {props.legend}
        </legend>
        {props.children}
      </Show>
    </fieldset>
  );
};

export default Fieldset;
