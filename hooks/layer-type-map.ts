import { useSyncExternalStore } from 'react';

// Armazenando os listeners
let listeners: (() => void)[] = [];

// Função para obter o valor do tipo de camada armazenado no localStorage
const getStoredLayerType = () => {
    const stored = localStorage.getItem('type-layer-map');
    return stored ? Number(stored) : 0; // Retorna 0 se não houver valor armazenado
};

// Função para o valor de fallback quando renderizando no servidor
function getServerLayerType() {
    return 0; // Retorna 0 como valor padrão no servidor
}

// Função para atualizar o tipo de camada e notificar os listeners
const setStoredLayerType = (layerType: number) => {
    localStorage.setItem('type-layer-map', `${layerType}`);
    listeners.map((listener) => listener());
};

// Função para inscrever listeners que serão chamados quando o tipo de camada mudar
const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
};

// Hook que retorna o tipo de camada atual e permite atualizá-lo
export function useLayerType() {
    const layerType = useSyncExternalStore(
        subscribe,
        getStoredLayerType,
        getServerLayerType
    );

    return { layerType, setStoredLayerType };
}
