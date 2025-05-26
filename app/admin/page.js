import TreesAdmin from './TreesAdmin';

async function getStreets() {
  const res = await fetch(`/api/streets`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getTrees(locationId) {
  if (!locationId) return [];
  const res = await fetch(`/api/tree/${locationId}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPage({ searchParams }) {
  const streets = await getStreets();

  const locationId = searchParams?.locationId || '';
  const trees = locationId ? await getTrees(locationId) : [];

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Dashboard - SSR</h1>

      <label>
        Select Street:{' '}
        <select
          onChange={(e) => {
            const val = e.target.value;
            window.location.href = `/admin?locationId=${val}`;
          }}
          defaultValue={locationId}
        >
          <option value="">-- Select --</option>
          {streets.map((street) => (
            <option key={street.location_id} value={street.location_id}>
              {street.location_name}
            </option>
          ))}
        </select>
      </label>

      {locationId ? (
        <TreesAdmin initialTrees={trees} initialLocationId={locationId} />
      ) : (
        <p>Please select a street to manage its trees.</p>
      )}
    </main>
  );
}