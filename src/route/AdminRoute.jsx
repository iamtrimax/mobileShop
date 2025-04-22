import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = useSelector((state) => state?.user?.user);
    if (user === undefined) {
        // Redux chưa có user -> Đợi load user xong
        return <div>Loading...</div>;
    }
    if (!user || user?.data?.role !== 'ADMIN') {
        return <Navigate to="/403-page" />
    }

    return children;
};

export default AdminRoute;