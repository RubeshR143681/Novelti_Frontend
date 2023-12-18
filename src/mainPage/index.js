// Import necessary modules and components

import React, { useEffect, useState } from "react";
import { Table, Divider, Drawer } from "antd";
import { getAllUser, deleteUser } from "./redux/user.actions";
import { useDispatch, useSelector } from "react-redux";
import UserAdd from "./addUser/index";
import UserEdit from "./editUser/index";


// Define the UserListMainPage component
const UserListMainPage = () => {

  // Initialize Redux dispatch
  const dispatch = useDispatch();

    // Retrieve user data from Redux store
  const allUserData = useSelector(
    (state) => state.userListReducer.getAllUser?.data
  );

  // Define various state variables using React hooks
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState(allUserData);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [query, setQuery] = useState("");
  const [Usersinfo, setUsersinfo] = useState({
    status: [],
    response: [],
  });

  // ... other state variables

  const checkedStatus = Usersinfo.response;

    // Fetch all user data on component mount and update state
  useEffect(() => {
    dispatch(getAllUser);  // Dispatch action to get all users
    if (allUserData) {
      setData(allUserData);  //Update data state with fetched data
    }
  }, [dispatch, allUserData?.length]);


// ... other useEffect hooks for filtering data, managing states, etc.
  useEffect(() => {
    if (query) {
      const searchData = data?.filter(
        (item) =>
          item.first_name.toLowerCase().includes(query.toLowerCase()) ||
          item.email_id.toLowerCase().includes(query.toLowerCase())
      );
      setData(searchData);
      console.log("seactched data", searchData);
    }
    if (query === "") {
      setData(allUserData);
    }
  }, [query]);

  useEffect(() => {
    let resultData = [];
    data?.filter((item) => {
      checkedStatus?.map((val) => {
        if (val?.toLowerCase() === item?.teamName.toLowerCase()) {
          resultData.push(item);
        }
      });
    });
  }, [checkedStatus]);

    // Define function to show total number of records
  const showTotal = (pages, range) => {
    return `No of records: ${range[0]}-${range[1]} of ${pages} `;
  };

    // Define columns for the Ant Design Table component

  const orderColumns = [
    {
      title: "FIRST NAME",
      dataIndex: "first_name",
      key: "first_name",
      responsive: ["xs", "md"],
    },
    {
      title: "LAST NAME",
      dataIndex: "last_name",
      key: "last_name",
      responsive: ["xs", "md"],
    },
    {
      title: "EMAIL ID",
      dataIndex: "email_id",
      key: "email_id",
      responsive: ["xs", "md"],
    },
    {
      title: "MOBILE NO",
      dataIndex: "mobile_no",
      key: "mobile_no",
      responsive: ["xs", "md"],
    },
    {
      title: "ADDRESS",
      dataIndex: "address_1",
      key: "address_1",
      responsive: ["xs", "md"],
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
      responsive: ["xs", "md"],
    },
    {
      title: "STATE",
      dataIndex: "state",
      key: "state",
      responsive: ["xs", "md"],
    },
    {
      title: "ZIPCODE",
      dataIndex: "zip_code",
      key: "zip_code",
      responsive: ["xs", "md"],
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",

      render: (_, record) => (
        <div className="flex justify-around items-center gap-[10px]">
          <div
            onClick={() => {
              setEdit(true);
              setEditData(record);
            }}
            className="  w-[40px] bg-green-300 flex justify-center rounded p-[5px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[18px] h-[18px] hover:animate-bounce text-green-900">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              dispatch(deleteUser(record.id));
            }}
            className="w-[40px] bg-red-500 flex justify-center rounded p-[5px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[18px] h-[18px] hover:animate-bounce text-white">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      ),

      responsive: ["xs", "md"],
    },
  ];


    // JSX component rendering

  return (
    <div className="bg-[#D1D5DB] h-[150vh]  lg:px-[40px] lg:py-[30px] py-[30px]  px-[15px] ">
      <div className="">
        <h1
          className="text-[20px]   lg:text-[25px]"
          style={{ fontWeight: 650 }}>
          User List
        </h1>
      </div>
      <div className="bg-white  rounded-[20px] lg:mt-[40px] mt-[20px] px-[10px] lg:px-[20px] py-[10px] lg:py-[25px] shadow-md hover:shadow-lg">
        <div className=" flex flex-row justify-between items-center gap-[15px] lg:gap-[0px]">
          <div className="w-full lg:w-[500px]">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 lg:w-5 lg:h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                class="bg-gray-100 h-10 lg:h-12 font-semibold border-none outline-none border-gray-300 text-gray-900 text-sm rounded-md lg:w-[300px]  focus:bg-gray-200 block w-full pl-10 p-2.5"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <div
            onClick={() => {
              setAdd(true);
            }}
            className="flex hover:ring-2 group items-center gap-[5px] h-10
            lg:h-12 justify-center w-[150px] bg-[#009ef7] hover:bg-[#088ed9]
            rounded-md cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="white"
              class="w-4 h-4 lg:w-5 lg:h-5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p className="text-[12px] lg:text-[15px]  text-white  font-semibold">
              Add User
            </p>
          </div>
        </div>
        <Divider />
        <div className="mt-[30px]  lg:mt-[30px]">
          <Table
            columns={orderColumns}
            dataSource={data}
            scroll={{
              x: 700,
            }}
            pagination={{
              current: page,
              pageSize: pageSize,
              showTotal: showTotal,
              hideOnSinglePage: true,
              pageSizeOptions: [5, 10, 15, 20],
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </div>
      </div>
      {add && (
        <Drawer
          placement="right"
          width={window.innerWidth > 768 ? "70%" : 320}
          headerStyle={{ padding: "0px" }}
          closeIcon={
            <div
              onClick={() => {
                setAdd(false);
              }}
              className="float-right hover:rotate-180 flex absolute z-40  bg-white w-8 h-8 text-base items-center justify-center text-gray-900 rounded-full  content-center top-[50%] left-[-42px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 	">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          }
          closable={true}
          visible={add}
          bodyStyle={{ backgroundColor: "", padding: "30px" }}>
          <UserAdd setAdd={setAdd} />
        </Drawer>
      )}
      {edit && (
        <Drawer
          placement="right"
          width={window.innerWidth > 768 ? "70%" : 320}
          headerStyle={{ padding: "0px" }}
          closeIcon={
            <div
              onClick={() => {
                setEdit(false);
              }}
              className="float-right hover:rotate-180 flex absolute z-40  bg-white w-8 h-8 text-base items-center justify-center text-gray-900 rounded-full  content-center top-[50%] left-[-42px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 	">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          }
          closable={true}
          visible={edit}
          bodyStyle={{ backgroundColor: "", padding: "30px" }}>
          <UserEdit setEdit={setEdit} editData={editData} />
        </Drawer>
      )}
    </div>
  );
};

export default UserListMainPage;
