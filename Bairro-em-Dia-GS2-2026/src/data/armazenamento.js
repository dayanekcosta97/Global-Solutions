/** Persistência local do protótipo (web/Android/iOS). Não possui integração com Oracle. */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dadosDemonstrativos } from '../domain/ocorrencias.mjs';

const STORAGE_KEY = '@bairro-em-dia/ocorrencias-v1';

export async function carregarOcorrencias() {
  const salvo = await AsyncStorage.getItem(STORAGE_KEY);
  if (salvo === null) {
    const demos = dadosDemonstrativos();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
    return demos;
  }
  const registros = JSON.parse(salvo);
  if (!Array.isArray(registros)) throw new Error('Formato de dados local inválido.');
  return registros;
}

export async function salvarOcorrencias(ocorrencias) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
}
