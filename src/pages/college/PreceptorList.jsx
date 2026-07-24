import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AddPreceptorModal from '../../components/college/preceptor/AddPreceptorModal';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorList.css';

const PreceptorList = () => {
  const { users } = useDatabase();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const preceptors = users.filter(u => u.role === 'preceptor');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const handleDelete = (row) => {
    setSelectedRecord(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      alert(`Delete not fully implemented in UI for ${selectedRecord.id}`);
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const handleEdit = (row) => {
    setEditRecord(row);
    setIsAddModalOpen(true);
  };

  const handleView = (row) => {
    setSelectedRecord(row);
    setIsViewModalOpen(true);
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Preceptor List</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/preceptors" className="breadcrumb-link">Preceptor Management</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Preceptor List</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by name, email, or mobile..." />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Department</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Pharmacy Practice</option>
                  <option>Pharmacology</option>
                  <option>Pharmaceutics</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Status</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <button className="btn-filter">
              <Filter size={16} /> Filter
            </button>
          </div>

          <button className="btn-export">
            <Download size={16} /> Export
          </button>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Preceptor ID <span className="sort-icon">↕</span></th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {preceptors.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name || row.fullName}</td>
                  <td>{row.department || row.dept}</td>
                  <td>{row.designation}</td>
                  <td>{row.email}</td>
                  <td>{row.mobile || row.mobileNumber}</td>
                  <td>
                    <span className={`status-pill ${row.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="View" onClick={() => handleView(row)}>
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Edit" onClick={() => handleEdit(row)}>
                        <Pencil size={16} />
                      </button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleDelete(row)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing 1 to 8 of 25 entries
            </div>
            
            <div className="pagination-controls">
              <div className="page-numbers">
                <button className="page-btn"><ChevronsLeft size={16} /></button>
                <button className="page-btn"><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
                <button className="page-btn"><ChevronsRight size={16} /></button>
              </div>
              
              <div className="rows-per-page">
                <div className="select-wrapper">
                  <select>
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <AddPreceptorModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <ViewRecordModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRecord(null);
        }}
        title="Preceptor Details"
        subtitle="View preceptor information"
        fields={[
          { label: 'Preceptor ID', value: selectedRecord?.id },
          { label: 'Full Name', value: selectedRecord?.name },
          { label: 'Department', value: selectedRecord?.dept },
          { label: 'Designation', value: selectedRecord?.designation },
          { label: 'Email', value: selectedRecord?.email },
          { label: 'Mobile Number', value: selectedRecord?.mobile },
          { label: 'Status', value: selectedRecord?.status, type: 'status' },
        ]}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this record?"
      />
    </CollegeAdminLayout>
  );
};

export default PreceptorList;
