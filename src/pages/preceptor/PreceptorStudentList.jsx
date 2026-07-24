import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Download, Eye, 
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import '../college/PreceptorList.css';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';

const MOCK_STUDENTS = [
  { id: 'STU001', name: 'Arun Kumar', program: 'Pharm.D', year: '3rd Year', dept: 'Pharmacy Practice', email: 'arun.kumar@pharmdverse.edu.in', mobile: '9876543301', status: 'Active' },
  { id: 'STU002', name: 'Priya Sharma', program: 'Pharm.D', year: '4th Year', dept: 'Pharmacology', email: 'priya.sharma@pharmdverse.edu.in', mobile: '9876543302', status: 'Active' },
  { id: 'STU003', name: 'Rahul Verma', program: 'M.Pharm', year: '1st Year', dept: 'Pharmacy Practice', email: 'rahul.verma@pharmdverse.edu.in', mobile: '9876543303', status: 'Active' },
  { id: 'STU004', name: 'Sneha Patel', program: 'Pharm.D', year: '5th Year', dept: 'Pharmacology', email: 'sneha.patel@pharmdverse.edu.in', mobile: '9876543304', status: 'Inactive' },
  { id: 'STU005', name: 'Vikram Singh', program: 'Pharm.D', year: '2nd Year', dept: 'Pharmacy Practice', email: 'vikram.singh@pharmdverse.edu.in', mobile: '9876543305', status: 'Active' },
  { id: 'STU006', name: 'Meera Nair', program: 'M.Pharm', year: '2nd Year', dept: 'Pharmacology', email: 'meera.nair@pharmdverse.edu.in', mobile: '9876543306', status: 'Active' },
  { id: 'STU007', name: 'Karthik Reddy', program: 'Pharm.D', year: '3rd Year', dept: 'Pharmacy Practice', email: 'karthik.reddy@pharmdverse.edu.in', mobile: '9876543307', status: 'Active' },
  { id: 'STU008', name: 'Ananya Gupta', program: 'Pharm.D', year: '6th Year', dept: 'Pharmacy Practice', email: 'ananya.gupta@pharmdverse.edu.in', mobile: '9876543308', status: 'Active' },
];

const PreceptorStudentList = () => {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleView = (row) => {
    setSelectedRecord(row);
    setIsViewModalOpen(true);
  };

  return (
    <PreceptorLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Student List</h1>
            <div className="breadcrumbs">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Assigned Students</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Student List</span>
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
              <span className="filter-label">Program</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Pharm.D</option>
                  <option>M.Pharm</option>
                  <option>B.Pharm</option>
                  <option>D.Pharm</option>
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
                <th>Student ID <span className="sort-icon">↕</span></th>
                <th>Full Name</th>
                <th>Program</th>
                <th>Year</th>
                <th>Department</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((row) => (
                <tr key={row.id}>
                  <td><Link to="#" className="id-link">{row.id}</Link></td>
                  <td>{row.name}</td>
                  <td>{row.program}</td>
                  <td>{row.year}</td>
                  <td>{row.dept}</td>
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

      <ViewRecordModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        fields={[
          { label: 'Student ID', value: selectedRecord?.id },
          { label: 'Full Name', value: selectedRecord?.name },
          { label: 'Program', value: selectedRecord?.program },
          { label: 'Year', value: selectedRecord?.year },
          { label: 'Department', value: selectedRecord?.dept },
          { label: 'Email', value: selectedRecord?.email },
          { label: 'Mobile Number', value: selectedRecord?.mobile },
          { label: 'Status', value: selectedRecord?.status, type: 'status' },
        ]}
        title="Student Details"
        subtitle="View student information"
      />
    </PreceptorLayout>
  );
};

export default PreceptorStudentList;
