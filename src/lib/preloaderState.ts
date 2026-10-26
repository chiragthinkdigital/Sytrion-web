const listeners = new Set<() => void>();

let complete = false;

function notify() {
  listeners.forEach((listener) => listener());
}

export function beginPreloader() {
  complete = false;
  notify();
}

export function completePreloader() {
  complete = true;
  notify();
}

export function isPreloaderComplete() {
  return complete;
}

export function subscribePreloader(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
