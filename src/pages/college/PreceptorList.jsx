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
import './PreceptorList.css';

const MOCK_DATA = [
  { id: 'PRE001', name: 'Dr. Ramesh Patel', dept: 'Pharmacy Practice', designation: 'Associate Professor', email: 'ramesh.patel@pharmdverse.edu.in', mobile: '9876543210', status: 'Active' },
  { id: 'PRE002', name: 'Dr. Sunita Sharma', dept: 'Pharmacology', designation: 'Professor', email: 'sunita.sharma@pharmdverse.edu.in', mobile: '9876543211', status: 'Active' },
  { id: 'PRE003', name: 'Dr. Arjun Verma', dept: 'Pharmaceutics', designation: 'Assistant Professor', email: 'arjun.verma@pharmdverse.edu.in', mobile: '9876543212', status: 'Active' },
  { id: 'PRE004', name: 'Dr. Neha Singh', dept: 'Pharmacognosy', designation: 'Associate Professor', email: 'neha.singh@pharmdverse.edu.in', mobile: '9876543213', status: 'Inactive' },
  { id: 'PRE005', name: 'Dr. K. Mahesh', dept: 'Pharmacy Practice', designation: 'Assistant Professor', email: 'mahesh.k@pharmdverse.edu.in', mobile: '9876543214', status: 'Active' },
  { id: 'PRE006', name: 'Dr. Priya Nair', dept: 'Pharmacology', designation: 'Assistant Professor', email: 'priya.nair@pharmdverse.edu.in', mobile: '9876543215', status: 'Active' },
  { id: 'PRE007', name: 'Dr. Vikas Joshi', dept: 'Pharmaceutics', designation: 'Associate Professor', email: 'vikas.joshi@pharmdverse.edu.in', mobile: '9876543216', status: 'Active' },
  { id: 'PRE008', name: 'Dr. Meena Reddy', dept: 'Pharmacy Practice', designation: 'Professor', email: 'meena.reddy@pharmdverse.edu.in', mobile: '9876543217', status: 'Active' },
];

const PreceptorList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [preceptors, setPreceptors] = useState(MOCK_DATA);

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
      setPreceptors(preceptors.filter(p => p.id !== selectedRecord.id));
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
                  <td><Link to="#" className="id-link">{row.id}</Link></td>
                  <td>{row.name}</td>
                  <td>{row.dept}</td>
                  <td>{row.designation}</td>
                  <td>{row.email}</td>
                  <td>{row.mobile}</td>
                  <td>
                    <span className={`status-pill status-${row.status.toLowerCase()}`}>
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
