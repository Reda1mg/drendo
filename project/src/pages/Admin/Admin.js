import React from 'react';
import AdminControls from './Components/AdminControls';
import AdminTable from './Components/AdminTable';

const Admin = () => {
  return (
    <div>
      <h1>Tableau de Bord Admin</h1>
      <AdminControls />
      <AdminTable />
    </div>
  );
};

export default Admin;
