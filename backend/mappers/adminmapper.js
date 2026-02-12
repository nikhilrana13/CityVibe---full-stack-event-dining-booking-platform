const AdminMapper = (admin)=>({
    id:admin._id,
    name: admin.Mcname,
    email: admin.email,
    role: admin.role,
    isVerified: admin.isVerified, 
})
module.exports = AdminMapper