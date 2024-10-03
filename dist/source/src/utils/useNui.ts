import { createEffect, createSignal, onCleanup } from 'solid-js';
import { noop } from './misc';

interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export const useNuiEvent = <T = unknown>(
  action: string,
  handler: (data: T) => void
) => {
  let savedHandler: (data: T) => void = () => {};

  createEffect(() => {
    savedHandler = handler;
  });

  const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
    const { action: eventAction, data } = event.data;

    if (savedHandler) {
      if (eventAction === action) {
        savedHandler(data);
      }
    }
  };

  window.addEventListener('message', eventListener);

  onCleanup(() => {
    window.removeEventListener('message', eventListener);
  });
};
