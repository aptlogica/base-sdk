// Copyright (c) 2026 Aptlogica Technologies Private Limited
// SPDX-License-Identifier: MIT
// Websites: https://www.aptlogica.com | https://www.serenibase.com
// Support: support@aptlogica.com | support@serenibase.com

import { FormData as NodeFormData, File as NodeFile } from 'formdata-node';
let cachedConstructor: typeof FormData | null = null;

function resolveFormDataConstructor(): typeof FormData {
  if (cachedConstructor) {
    return cachedConstructor;
  }

  if ('FormData' in globalThis) {
    cachedConstructor = globalThis.FormData;
    return cachedConstructor;
  }

  cachedConstructor = NodeFormData as unknown as typeof FormData;

  if (!('FormData' in globalThis)) {
    (globalThis as any).FormData = cachedConstructor;
  }
  if (!('File' in globalThis)) {
    (globalThis as any).File = NodeFile;
  }

  return cachedConstructor;
}

export function createFormData(): FormData {
  const FormDataImpl = resolveFormDataConstructor();
  return new FormDataImpl();
}