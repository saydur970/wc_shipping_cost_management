type T_param = {
  url: string,
  methodType?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  data?: { [key: string]: any },
  header?: HeadersInit
};

export async function Fetch<T>({
  url, methodType, data, header
}: T_param): Promise<T> {

  const method = methodType || 'GET';

  const resS = await fetch(url, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json',
      ...(header && header)
    },
    ...(['POST', 'PATCH'].includes(method) && data && { 
      body: JSON.stringify(data) 
    })
  });

  if (!resS.ok) {
    const errRes = await resS.json();
    throw new Error(errRes || 'error');
  }

  const resSData = await resS.json() as T;
  return resSData;

}