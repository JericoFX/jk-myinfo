import { fetchNui } from './fetchNui';
export async function SendNui(
  event: string,
  data: Object,
  callback: Function
): Promise<any> {
  if (!callback) return await fetchNui(event, data);
  return await fetchNui(event, data).then((cb) => callback(cb));
}
