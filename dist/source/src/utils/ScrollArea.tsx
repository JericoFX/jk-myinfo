import { createSignal, onCleanup, onMount } from 'solid-js';
import { Box } from 'styled-system/jsx';

function ScrollArea(props) {
  return (
    <Box
      overflowY='auto'
      overflow='hidden'
      maxH={props.maxH || 'fit-content'}
      borderRadius={'sm'}
      padding='1rem'
    >
      {props.children}
    </Box>
  );
}

export default ScrollArea;
