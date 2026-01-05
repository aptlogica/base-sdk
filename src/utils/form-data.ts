import { FormData as NodeFormData, File as NodeFile } from 'formdata-node';

let cachedConstructor: typeof FormData | null = null;

function resolveFormDataConstructor(): typeof FormData {
  if (cachedConstructor) {
    return cachedConstructor;
  }

  if (typeof globalThis.FormData !== 'undefined') {
    cachedConstructor = globalThis.FormData;
    return cachedConstructor;
  }

  cachedConstructor = NodeFormData as unknown as typeof FormData;

  if (typeof (globalThis as any).FormData === 'undefined') {
    (globalThis as any).FormData = cachedConstructor;
  }
  if (typeof (globalThis as any).File === 'undefined') {
    (globalThis as any).File = NodeFile;
  }

  return cachedConstructor;
}

export function createFormData(): FormData {
  const FormDataImpl = resolveFormDataConstructor();
  return new FormDataImpl();
}