import { useNuiEvent } from './useNui';
export function useNui(event: string, cb: (data: unknown) => void) {
  useNuiEvent(event, cb);
}
