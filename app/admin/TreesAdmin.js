'use client';

import { useState, useEffect } from 'react';

export default function TreesAdmin({ initialTrees, initialLocationId }) {
  const [trees, setTrees] = useState(initialTrees);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [locationId, setLocationId] = useState(initialLocationId);

  async function fetchTrees() {
    if (!locationId) return setTrees([]);
    const res = await fetch(`/api/tree/${locationId}`);
    const data = await res.json();
    setTrees(data);
  }

  useEffect(() => {
    fetchTrees();
  }, [locationId]);

  function resetForm() {
    setForm({});
    setEditId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      const res = await fetch(`/api/tree/${editId}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await fetchTrees();
        resetForm();
      }
    } else {
      const res = await fetch(`/api/tree`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        await fetchTrees();
        resetForm();
      }
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure?')) return;
    const res = await fetch(`/api/tree/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchTrees();
  }

  function handleEdit(tree) {
    setEditId(tree._id);
    setForm(tree);
  }

  return (
    <>
      <label>
        Location ID:{' '}
        <input
          type="text"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          placeholder="location_id"
        />
      </label>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <h2>{editId ? 'Edit Tree' : 'Add New Tree'}</h2>
        <input
          required
          placeholder="Tree Name"
          value={form.tree_name || ''}
          onChange={(e) => setForm({ ...form, tree_name: e.target.value })}
        />
        <input
          required
          placeholder="Tree ID"
          value={form.tree_id || ''}
          onChange={(e) => setForm({ ...form, tree_id: e.target.value })}
        />
        <input
          placeholder="Health"
          value={form.tree_health || ''}
          onChange={(e) => setForm({ ...form, tree_health: e.target.value })}
        />
        <input
          placeholder="Status"
          value={form.tree_status || ''}
          onChange={(e) => setForm({ ...form, tree_status: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age (years)"
          value={form.tree_age_years || ''}
          onChange={(e) => setForm({ ...form, tree_age_years: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Height (meters)"
          value={form.tree_height_meters || ''}
          onChange={(e) => setForm({ ...form, tree_height_meters: Number(e.target.value) })}
        />
        <input
          placeholder="Address"
          value={form.tree_address || ''}
          onChange={(e) => setForm({ ...form, tree_address: e.target.value })}
        />
        <input
          required
          placeholder="Location ID"
          value={form.location_id || locationId}
          onChange={(e) => setForm({ ...form, location_id: e.target.value })}
        />

        <button type="submit" style={{ marginTop: 10 }}>
          {editId ? 'Update Tree' : 'Add Tree'}
        </button>
        {editId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        )}
      </form>

      <h2 style={{ marginTop: 30 }}>Trees</h2>
      {trees.length === 0 && <p>No trees found</p>}

      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tree ID</th>
            <th>Health</th>
            <th>Status</th>
            <th>Age</th>
            <th>Height</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trees.map((tree) => (
            <tr key={tree._id}>
              <td>{tree.tree_name}</td>
              <td>{tree.tree_id}</td>
              <td>{tree.tree_health}</td>
              <td>{tree.tree_status}</td>
              <td>{tree.tree_age_years}</td>
              <td>{tree.tree_height_meters}</td>
              <td>{tree.tree_address}</td>
              <td>
                <button onClick={() => handleEdit(tree)}>Edit</button>{' '}
                <button onClick={() => handleDelete(tree._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
