import React, { useEffect, useState } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { toast } from "react-toastify";
import fetchWithAuth from "../../utils/fetchWithAuth";
const AllUser = () => {
  const [data, setData] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [selectRole, setSelectUserRole] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);


  //fetct data all user
  const fetchAllUser = async () => {
    const fetchData = await fetchWithAuth("http://localhost:3000/api/get-users", {
      method: "get",
      credentials: "include",
    });
    const dataRes = await fetchData.json();

    if (dataRes.success) {
      setData(dataRes.data);
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
    }
  };
  //update role user
  const handleSelect = (user) => {
    setIsShowModal(!isShowModal);
    console.log(isShowModal);
    
    setSelectUser(user);
    setSelectUserRole(user?.role);
  };
  const handleChangeRole = (e) => {
    setSelectUserRole(e.target.value);
  };
  const handleUpdateRoleUser = async () => {
    const fecthData = await fetchWithAuth("http://localhost:3000/api/update-user", {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: selectUser?._id,
        role: selectRole,
      }),
    });

    const dataRes = await fecthData.json();
    if (dataRes.success) {
      toast.success(dataRes.message);
      await fetchAllUser();
      const modal = document.getElementById("myModal");
      const modalInstance = new window.bootstrap.Modal(modal);
      modalInstance.hide();
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
    }
  };
  //delete user
  const handleDeleteUser = async (userId) => {
    const fetchData = await fetchWithAuth("http://localhost:3000/api/delete-user", {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const dataRes = await fetchData.json();
    if (dataRes.success) {
      toast.success(dataRes.message);
      setData((prevData) => prevData.filter((user) => user._id !== userId));
    }
    if (dataRes.error) {
      toast.error(dataRes.message);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, [data]);
  return (
    <>
      <h2 className="text-dark text-center fs-4">Danh sách người dùng</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Create At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format("ll")}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary edit-user mx-2"
                    data-bs-toggle="modal"
                    onClick={() => handleSelect(user)}
                  >
                    Edit role
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger delete"
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        isShowModal && (
          <div className="modal show d-block fade">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title text-dark">
                chỉnh sửa quyền truy cập người dùng
              </h4>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsShowModal(!isShowModal)}
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body text-dark">
              <p>
                Username:{" "}
                <span id="modal-username">{selectUser?.username}</span>
              </p>
              <p>
                Email: <span id="modal-email">{selectUser?.email}</span>
              </p>
              <form action="" className="form-control-lg">
                <p>
                  Role
                  <select
                    className="form-select-lg role"
                    name="role"
                    value={selectRole}
                    onChange={handleChangeRole}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="GENERAL">GENERAL</option>
                  </select>
                </p>
                <div className="d-grid gap-3">
                  <button
                    type="button"
                    className="change btn btn-success btn-block"
                    onClick={handleUpdateRoleUser}
                    data-bs-dismiss="modal"
                  >
                    Thay đổi
                  </button>
                </div>
              </form>
            </div>

            {/* <!-- Modal footer --> */}
          </div>
        </div>
      </div>
        )
      }
    </>
  );
};

export default AllUser;
