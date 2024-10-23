import { createEffect, createSignal, For, Show } from 'solid-js';
import {
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Stack,
  VStack,
} from 'styled-system/jsx';
import Fieldset from './components/Fieldset';
import { Award, Briefcase, User, Wrench } from 'lucide-solid';
import { Text } from './components/ui/text';
import { css } from 'styled-system/css';
import { Motion, Presence } from 'solid-motionone';
import User2 from 'lucide-solid/icons/user-2';
import { createStore } from 'solid-js/store';
import { useNuiEvent } from './utils/useNui';
import { fetchNui } from './utils/fetchNui';
import { isEnvBrowser } from './utils/misc';
import { Button } from './components/ui/button';
import ScrollArea from './utils/ScrollArea';
type R = {
  name: string;
  job: string;
  rank: string;
  id: number;
  licenses: { name: string; status: string }[];
  onlinePlayers: { name: string; count: number }[];
  open: boolean;
};
function App() {
  const [characterData, setCharacterData] = createStore<R>({
    name: '',
    job: '',
    rank: '',
    id: 0,
    licenses: [],
    onlinePlayers: [],
    open: false,
  });
  const [open, setOpen] = createSignal<boolean>(false);
  useNuiEvent('open', (data: R) => {
    setCharacterData({
      name: data.name,
      job: data.job,
      rank: data.rank,
      id: data.id,
      licenses: data.licenses,
    });
    setOpen(!open());
  });

  useNuiEvent('update', (data: R) => {
    setCharacterData('onlinePlayers', data.onlinePlayers);
  });

  useNuiEvent('exit', () => {
    setOpen(!open());
    fetchNui('exit', {});
  });
  // createEffect(() => {
  //   if (open()) {
  //     const timer = setTimeout(async () => {
  //       await fetchNui('exit', {});
  //       setOpen(false);
  //       clearTimeout(timer);
  //     }, 5000);
  //   }
  // });

  return (
    <>
      <Show when={isEnvBrowser()}>
        <Button onClick={() => setOpen(!open())}>Open</Button>
      </Show>
      <HStack
        position='relative'
        w='100vw'
        h='100vh'
        justifyContent={'end'}
        alignContent={'center'}
        userSelect={'none'}
        overflow={'hidden'}
      >
        <Presence exitBeforeEnter>
          <Show when={open()}>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <Box
                borderTopLeftRadius='0.5rem'
                borderBottomLeftRadius='0.5rem'
                w='25vw'
                maxHeight='70vh'
                p='2'
                paddingBottom='10'
                backgroundColor='bg.default'
                position={'relative'}
                overflow={'hidden'}
              >
                <Box w='full' marginBottom={'1'} h='10vh' position={'relative'}>
                  <HStack
                    w='full'
                    h='10vh'
                    p='2'
                    alignContent={'center'}
                    justifyContent={'start'}
                    position={'relative'}
                    borderRadius='0.5rem'
                    marginBottom='0.5rem'
                  >
                    <User
                      class={css({
                        color: '#60A5FA',
                      })}
                      size={32}
                    ></User>
                    <Stack gap='2' direction={'column'}>
                      <Stack gap='1'>
                        <Text
                          variant='heading'
                          fontSize={'1.75rem'}
                          lineHeight={'1.75rem'}
                          fontWeight={700}
                        >
                          {characterData.name}
                        </Text>
                      </Stack>
                      <Stack gap='1' w='full' direction={'row'}>
                        <Briefcase
                          width={'0.75rem'}
                          height={'0.75rem'}
                        ></Briefcase>
                        <Text
                          marginLeft='0.5rem'
                          alignItems='center'
                          fontSize='0.75rem'
                          fontWeight={700}
                          lineHeight='1rem'
                          color='#9CA3AF'
                          as='span'
                        >
                          {characterData.job}
                        </Text>
                      </Stack>
                      <Stack gap='1' w='full' direction={'row'}>
                        <Award width={'0.75rem'} height={'0.75rem'}></Award>
                        <Text
                          marginLeft='0.5rem'
                          alignItems='center'
                          fontSize='0.75rem'
                          lineHeight='1rem'
                          fontWeight={700}
                          color='#9CA3AF'
                          as='span'
                        >
                          {characterData.rank}
                        </Text>
                      </Stack>
                      <Stack gap='1' w='full' direction={'row'}>
                        <User2 width={'0.75rem'} height={'0.75rem'}></User2>
                        <Text
                          marginLeft='0.5rem'
                          alignItems='center'
                          fontSize='0.75rem'
                          lineHeight='1rem'
                          color='#9CA3AF'
                          fontWeight={700}
                          as='span'
                        >
                          ID: {characterData.id}
                        </Text>
                      </Stack>
                    </Stack>
                  </HStack>
                </Box>
                <Divider></Divider>
                <Fieldset padding legend='Licencias'>
                  <For
                    each={characterData.licenses}
                    fallback={<Text>Ninguna</Text>}
                  >
                    {(license, index) => (
                      <HStack
                        key={index}
                        w='full'
                        alignContent={'center'}
                        justifyContent={'space-between'}
                        p='0.5'
                      >
                        <Text as='span' color='#9CA3AF'>
                          {license.name}
                        </Text>
                        <Text
                          p='0.5'
                          as='span'
                          w='fit-content'
                          borderRadius='0.25rem'
                          borderBottom={
                            license.status === 'Valido'
                              ? '1px solid green'
                              : '1px solid red'
                          }
                          color={'fg.default'}
                        >
                          {license.status}
                        </Text>
                      </HStack>
                    )}
                  </For>
                </Fieldset>{' '}
                <Fieldset
                  legend={`Jugadores Online Actualizacion cada 5 Segundos`}
                >
                  <Grid columns={1}>
                    <ScrollArea>
                      <For
                        each={characterData.onlinePlayers}
                        fallback={<Text>Cargando Datos...</Text>}
                      >
                        {(player, index) => (
                          <GridItem colSpan={1}>
                            <Stack
                              justifyContent={'space-between'}
                              alignItems={'start'}
                              fontSize={'0.75rem'}
                              lineHeight={'1rem'}
                              w='full'
                            >
                              <Stack
                                w='full'
                                alignItems={'start'}
                                justifyContent={'space-between'}
                                direction={'row'}
                                p='0.5'
                              >
                                <HStack alignItems={'center'} p='0.5'>
                                  <Wrench
                                    class={css({
                                      width: '0.75rem',
                                      height: '0.75rem',
                                      color: '#FBBF24',
                                    })}
                                  />
                                  <Text as='span' p='0.5'>
                                    {player.name.toUpperCase()} :
                                  </Text>
                                </HStack>
                                <Text>
                                  {player?.count === null ||
                                  player?.count === undefined
                                    ? 0
                                    : player.count}
                                </Text>
                              </Stack>
                            </Stack>
                          </GridItem>
                        )}
                      </For>
                    </ScrollArea>
                  </Grid>
                </Fieldset>
              </Box>
            </Motion.div>
          </Show>
        </Presence>
      </HStack>
    </>
  );
}

export default App;
