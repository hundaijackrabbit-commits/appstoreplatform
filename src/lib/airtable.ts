const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

if (!AIRTABLE_TOKEN || !BASE_ID || !TABLE_NAME) {
  throw new Error('Missing Airtable env variables');
}

const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

export async function createOrderInAirtable(data: Record<string, any>) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: [{ fields: data }],
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('CREATE ERROR:', result);
    throw new Error(result?.error?.message || 'Create failed');
  }

  return result.records[0];
}

export async function getOrderFromAirtable(orderId: string) {
  const safeOrderId = String(orderId || '').trim();

  const response = await fetch(`${BASE_URL}?maxRecords=100`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
    cache: 'no-store',
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('GET ERROR:', result);
    throw new Error(result?.error?.message || 'Fetch failed');
  }

  const record =
    result.records?.find((r: any) => {
      const fieldOrderId = String(r.fields?.['Order ID'] || '').trim();
      return fieldOrderId === safeOrderId;
    }) || null;

  return record;
}

export async function getOrderByStripeSessionId(sessionId: string) {
  const safeSessionId = String(sessionId || '').trim();

  const response = await fetch(`${BASE_URL}?maxRecords=100`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
    cache: 'no-store',
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('GET BY SESSION ERROR:', result);
    throw new Error(result?.error?.message || 'Fetch by session failed');
  }

  const record =
    result.records?.find((r: any) => {
      const value = String(r.fields?.['Stripe Session ID'] || '').trim();
      return value === safeSessionId;
    }) || null;

  return record;
}

export async function listOrdersFromAirtable() {
  const response = await fetch(
    `${BASE_URL}?maxRecords=100&sort[0][field]=Created%20At&sort[0][direction]=desc`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error('LIST ERROR:', result);
    throw new Error(result?.error?.message || 'List failed');
  }

  return result.records || [];
}

export async function updateOrderInAirtable(
  recordId: string,
  fields: Record<string, any>
) {
  const response = await fetch(`${BASE_URL}/${recordId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('UPDATE ERROR:', result);
    throw new Error(result?.error?.message || 'Update failed');
  }

  return result;
}

export async function deleteOrderFromAirtable(recordId: string) {
  const response = await fetch(`${BASE_URL}/${recordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('DELETE ERROR:', result);
    throw new Error(result?.error?.message || 'Delete failed');
  }

  return result;
}
