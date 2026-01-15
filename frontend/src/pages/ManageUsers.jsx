import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageUsers.css';

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', bio: '', avatar: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', is_admin: false });
  const usersPerPage = 20;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/users?page=${currentPage}&limit=${usersPerPage}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Admin privileges required.');
        }
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
      setTotalPages(data.pagination?.pages || 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUsers();
  }, [navigate, currentPage, fetchUsers]);

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      bio: user.bio || '',
      avatar: user.avatar || ''
    });
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: '', email: '', bio: '', avatar: '' });
    setError(null);
  };

  const handleSaveUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update user');
      }

      setSuccess('User updated successfully!');
      setEditingUser(null);
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete user');
      }

      setSuccess('User deleted successfully!');
      setUsers(users.filter(user => user.id !== userId));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleBlockUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to block user "${userName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/users/${userId}/block`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to block user');
      }

      setSuccess('User blocked successfully!');
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleUnblockUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to unblock user "${userName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/users/${userId}/unblock`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to unblock user');
      }

      setSuccess('User unblocked successfully!');
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createForm)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create user');
      }

      setSuccess('User created successfully!');
      setShowCreateForm(false);
      setCreateForm({ name: '', email: '', password: '', is_admin: false });
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && users.length === 0) {
    return (
      <div className="manage-users-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="manage-users-container">
        <div className="error-page">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-users-container">
      <div className="manage-users-page">
        <div className="page-header">
          <h1>Manage Users</h1>
          <p className="page-subtitle">View and manage all registered users</p>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)} 
            className="btn-primary"
            style={{ marginTop: '10px' }}
          >
            {showCreateForm ? 'Cancel' : 'Create New User'}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {showCreateForm && (
          <div className="create-user-form-wrapper">
            <h2>Create New User</h2>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    required
                    placeholder="Enter user name"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    required
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    required
                    placeholder="Enter password"
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={createForm.is_admin}
                      onChange={(e) => setCreateForm({ ...createForm, is_admin: e.target.checked })}
                    />
                    Admin User
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary">Create User</button>
            </form>
          </div>
        )}

        {users.length === 0 ? (
          <div className="no-data">
            <p>No users found.</p>
          </div>
        ) : (
          <>
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Posts</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      {editingUser === user.id ? (
                        <>
                          <td>{user.id}</td>
                          <td>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            {user.is_admin ? (
                              <span className="role-badge admin">Admin</span>
                            ) : (
                              <span className="role-badge user">User</span>
                            )}
                          </td>
                          <td className="text-center">{user.post_count || 0}</td>
                          <td>
                            {new Date(user.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="actions-cell">
                            <button
                              onClick={() => handleSaveUser(user.id)}
                              className="btn-save-small"
                              title="Save"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="btn-cancel-small"
                              title="Cancel"
                            >
                              ✗
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{user.id}</td>
                          <td>
                            <div className="user-info">
                              <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=40&background=3498db&color=fff`}
                                alt={user.name}
                                className="user-avatar-small"
                              />
                              <span>{user.name}</span>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            {user.is_admin ? (
                              <span className="role-badge admin">Admin</span>
                            ) : (
                              <span className="role-badge user">User</span>
                            )}
                          </td>
                          <td>
                            {user.is_blocked ? (
                              <span className="status-badge blocked">Blocked</span>
                            ) : (
                              <span className="status-badge active">Active</span>
                            )}
                          </td>
                          <td className="text-center">{user.post_count || 0}</td>
                          <td>
                            {new Date(user.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="actions-cell">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="btn-edit-small"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            {user.is_blocked ? (
                              <button
                                onClick={() => handleUnblockUser(user.id, user.name)}
                                className="btn-success-small"
                                title="Unblock"
                              >
                                🔓
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBlockUser(user.id, user.name)}
                                className="btn-warning-small"
                                title="Block"
                              >
                                🔒
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id, user.name)}
                              className="btn-delete-small"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div className="page-actions">
          <button onClick={() => navigate('/')} className="btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
