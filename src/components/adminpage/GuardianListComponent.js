import React, { useEffect, useState } from "react";
import {
  ChildInfo,
  PageNum,
  UserInfo,
  UserListBox,
  UserListItem,
  UserListWrap,
  UserMain,
} from "../../styles/adminstyle/guardianlist";
import { GrayBtn } from "../../styles/ui/buttons";
import AdminParentEdit from "../../pages/adminPage/AdminParentEdit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";
import useCustomLogin from "../../hooks/useCustomLogin";

const initParentList = {
  totalCnt: 0,
  parentPage: [
    {
      iparent: 0,
      parentNm: "",
      uid: "",
      phoneNb: "",
      kids: [
        {
          kidNm: "",
          iclass: 0,
        },
      ],
    },
  ],
};

const GuardianListComponent = ({
  parentList,
  checkedItems,
  oncheckedClick,
  page,
  iclass,
  onChildClick,
}) => {
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  // 로그인정보 체크
  const { isLogin, isAdminLogin, loginState, isTeacherLogin } =
    useCustomLogin();
  // 페이지네이션
  const handleChangePage = page => {
    // console.log(page);
    navigate(`/admin?page=${page}&iclass=${iclass}`);
  };
  // 학부모 정보 수정
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editKey, setEditKey] = useState(0);
  const [iparent, setIparent] = useState(0);
  const [editState, setEditState] = useState(0);
  const onStateChange = () => {
    setEditState(prevState => prevState + 1);
    onChildClick();
  };
  // console.log("중간체크 ", editState);

  const onAdminParentEditClick = () => {
    setIsEditOpen(true);
    setEditKey(prevKey => prevKey + 1);
  };

  const handleCancel = () => {
    setIsEditOpen(false);
  };

  // 체크박스 전체 선택 시 pk값 수집
  const handleSelectAllChange = e => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name^="iparent"]',
    );
    const updatedCheckedItems = Array.from(checkboxes)
      .filter((checkbox, index) => index !== 0 && (checkbox.checked = checked))
      .map(checkbox => (checked ? parseInt(checkbox.value) : null))
      .filter(value => value !== null);
    oncheckedClick(updatedCheckedItems);
  };

  // 개별 선택 시 pk값 수집
  const handleChangeCheck = e => {
    const value = parseInt(e.target.value);
    if (!e.target.checked) {
      oncheckedClick(prevItems => prevItems.filter(item => item !== value));
    } else {
      oncheckedClick([...checkedItems, value]);
    }
    // oncheckedClick(checkedItems);
  };

  return (
    <>
      <UserMain>
        <div>
          <input
            type="checkbox"
            id="selectAll"
            name="iparent"
            checked={selectAllChecked}
            onChange={handleSelectAllChange}
          />
          <label htmlFor="selectAll">전체 선택</label>
        </div>
        <UserListWrap>
          {Array.isArray(parentList.parentPage) &&
            parentList.parentPage.map(item => (
              <UserListItem key={item.iparent}>
                <UserListBox>
                  <input
                    type="checkbox"
                    name="iparent"
                    value={item.iparent}
                    onChange={e => {
                      handleChangeCheck(e);
                    }}
                  />
                  <UserInfo>
                    <span>{item.uid}</span>
                    <p>{item.parentNm}</p>
                  </UserInfo>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div>
                      <ChildInfo>
                        {!item.kids ? <p>연결된 아이가 없습니다.</p> : null}
                        {Array.isArray(item.kids) &&
                          item.kids.map((kidsitem, index) => (
                            <p key={`${item.iparent}_${index}`}>
                              {kidsitem.iclass === 1
                                ? "무궁화반"
                                : kidsitem.iclass === 2
                                ? "해바라기반"
                                : kidsitem.iclass === 3
                                ? "장미반"
                                : ""}{" "}
                              {kidsitem.kidNm}
                            </p>
                          ))}
                      </ChildInfo>
                    </div>
                  </div>

                  <em>{item.phoneNb}</em>
                  {isAdminLogin ||
                  (isTeacherLogin && iclass == loginState.iclass) ? (
                    <GrayBtn
                      onClick={() => {
                        setIparent(item.iparent);
                        setIsEditOpen(true);
                        setEditKey(prevKey => prevKey + 1);
                      }}
                    >
                      정보 수정
                    </GrayBtn>
                  ) : null}
                </UserListBox>
              </UserListItem>
            ))}
        </UserListWrap>
      </UserMain>
      <PageNum>
        <Pagination
          defaultCurrent={page}
          total={parentList.totalCnt}
          pageSize={12}
          onChange={handleChangePage}
        />
      </PageNum>
      {isEditOpen && (
        <AdminParentEdit
          open={isEditOpen}
          handleCancel={handleCancel}
          key={editKey}
          iparent={iparent}
          onStateChange={onStateChange}
        />
      )}
    </>
  );
};
export default GuardianListComponent;
