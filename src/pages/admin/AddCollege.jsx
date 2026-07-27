import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import CollegeRegistrationForm from '../../components/shared/CollegeRegistrationForm';

const AddCollege = () => {
  return (
    <AdminLayout>
      <CollegeRegistrationForm mode="admin" />
    </AdminLayout>
  );
};

export default AddCollege;
