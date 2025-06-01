"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminPageWrapper() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [reports, setReports] = useState([]);
  const [showCreateTreeForm, setShowCreateTreeForm] = useState(false);
  const [showDeleteTreeForm, setShowDeleteTreeForm] = useState(false);
  const [locations,setLocations] = useState([])
  const [treeData, setTreeData] = useState({
    tree_name: "",
    tree_id: "",
    tree_health: "",
    tree_status: "",
    tree_age_years: "",
    tree_height_meters: "",
    location_id: "",
  });

  const [deleteTreeId, setDeleteTreeId] = useState("");

  useEffect(()=>{
    fetch('/api/streets')
    .then((res)=> res.json())
    .then((data)=>{
      setLocations(data)
    })
  },[])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        const initialRoles = {};
        data.forEach((user) => {
          initialRoles[user.email] = user.role;
        });
        setSelectedRoles(initialRoles);
        setLoadingUsers(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  const handleRoleChange = (email, newRole) => {
    setSelectedRoles((prev) => ({ ...prev, [email]: newRole }));
  };

  const updateRole = async (email) => {
    const role = selectedRoles[email];
    const res = await fetch("/api/users/update-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const result = await res.json();
    alert(result.message);
  };

  const handleTreeChange = (e) => {
    const { name, value } = e.target;
    setTreeData((prev) => ({
      ...prev,
      [name]:
        name === "tree_age_years" || name === "tree_height_meters"
          ? Number(value)
          : value,
    }));
  };

  const updateReportStatus = async (id, status) => {
  const res = await fetch(`/api/reports/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (res.ok) {
    const updated = await res.json();
    console.log("Fresh Status ",updated);
    setReports(prev =>
      prev.map(r => r._id === id ? { ...r, status: updated.status } : r)
    );
  } else {
  }
  window.location.href = '/admin'
};


  const handleCreateTree = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/tree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(treeData),
    });
    const result = await res.json();
    if (res.ok) {
      alert(`Tree created with ID: ${result.insertedId || "success"}`);
      setTreeData({
        tree_name: "",
        tree_id: "",
        tree_health: "",
        tree_status: "",
        tree_age_years: "",
        tree_height_meters: "",
        location_id: "",
      });
      setShowCreateTreeForm(false);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleDeleteTree = async (e) => {
    e.preventDefault();
    if (!deleteTreeId.trim()) {
      alert("Please enter Tree ID to delete");
      return;
    }
    const res = await fetch(`/api/tree/${deleteTreeId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setDeleteTreeId("");
      setShowDeleteTreeForm(false);
    } else {
      setShowDeleteTreeForm(false);
    }
  };

  if (status === "loading")
    return <div className="p-4 min-h-[calc(100dvh-5rem)]">Loading session...</div>;

  if (!session || session.user.role !== "admin")
    return (
      <div className="p-6 text-center text-red-500 min-h-[calc(100dvh-5rem)]">Access Denied</div>
    );

  return (
    <div className="mx-auto p-6 min-h-[calc(100dvh-10rem)] backdrop-blur-md bg-white/10 border border-blue-100/20 shadow-lg text-white">

      <h1 className="text-2xl font-bold mb-4 text-center">
        Admin Panel - Manage Roles
      </h1>

      {loadingUsers ? (
        <div>Loading users...</div>
      ) : (
        <table className="w-full border border-blue-100/20 mb-8">
          <thead>
            <tr className="bg-blue-500/30 text-white">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
  {users
    .filter((user) => user.email !== session.user.email)
    .map((user) => (
      <tr
        key={user.email}
        className="text-center text-black odd:bg-gray-100 even:bg-white"
      >
        <td className="border p-2">{user.name || "N/A"}</td>
        <td className="border p-2">{user.email}</td>
        <td className="border p-2">
          <select
            className="border bg-white rounded px-2 py-1 text-black"
            value={selectedRoles[user.email]}
            onChange={(e) => handleRoleChange(user.email, e.target.value)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </td>
        <td className="border p-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => updateRole(user.email)}
          >
            Update
          </button>
        </td>
      </tr>
    ))}
</tbody>

        </table>
      )}

      <div className="flex gap-4 mb-6 justify-center">
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          onClick={() => setShowCreateTreeForm(true)}
        >
          Create Tree
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          onClick={() => setShowDeleteTreeForm(true)}
        >
          Delete Tree
        </button>
      </div>

      {showCreateTreeForm && (
        <div className="fixed inset-0  bg-opacity-60 flex backdrop-blur-2xl backdrop-opacity-5 items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full text-black relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
              onClick={() => setShowCreateTreeForm(false)}
              aria-label="Close create tree form"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Add a Tree</h2>
            <form onSubmit={handleCreateTree} className="flex flex-col gap-3">
              <select
                name="location_id"
                value={treeData.location_id}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
                required
              >
              <option value="" disabled>
                Select Location
              </option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc.location_name}>
                  {loc.location_name}
                </option>
              ))}
              </select>
              <input type="text"
                name="tree_name"
                placeholder="Tree Name"
                value={treeData.tree_name}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
                required
              />
              <input
                type="text"
                name="tree_id"
                placeholder="Tree ID"
                value={treeData.tree_id}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
                required
              />
              <input
                type="text"
                name="tree_health"
                placeholder="Tree Health"
                value={treeData.tree_health}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
              />
              <input
                type="text"
                name="tree_status"
                placeholder="Tree Status"
                value={treeData.tree_status}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
              />
              <input
                type="number"
                name="tree_age_years"
                placeholder="Tree Age (years)"
                value={treeData.tree_age_years}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
              />
              <input
                type="number"
                name="tree_height_meters"
                placeholder="Tree Height (meters)"
                value={treeData.tree_height_meters}
                onChange={handleTreeChange}
                className="px-3 py-2 rounded text-black"
              />
              
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
          Add a Tree
        </button>
        </form>
        </div>
        </div>
      )}

      {showDeleteTreeForm && (
        <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-black relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
              onClick={() => setShowDeleteTreeForm(false)}
              aria-label="Close delete tree form"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Remove Tree</h2>
            <form onSubmit={handleDeleteTree} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter Tree ID to delete"
                value={deleteTreeId}
                onChange={(e) => setDeleteTreeId(e.target.value)}
                className="px-3 py-2 rounded text-black"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Remove Tree
              </button>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-2 text-center">Reported Issues</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-black bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Tree ID</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Issue Type</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Reported At</th>
              <th className="border p-2">Report Status</th>
            </tr>
          </thead>
          <tbody>
  {reports.map(report => (
    <tr key={report._id}>
      <td className="border p-2">{report.tree_id}</td>
      <td className="border p-2">{report.location_id}</td>
      <td className="border p-2">{report.issue_type}</td>
      <td className="border p-2">{report.description}</td>
      <td className="border p-2">{report.reported_at}</td>
      <td className="border p-2">
        <select
          value={report.status}
          onChange={(e) => updateReportStatus(report._id, e.target.value)}
          className="px-2 py-1 text-sm m-auto rounded text-black"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
