import React, { useState } from "react";
import {
  InfoBox,
  ListBox,
  ListBoxTop,
  MainTop,
  MainTopLeft,
  MainTopRight,
  TeacherImgInfo,
  TeacherInfo,
  TeacherListItem,
  TeacherListWrap,
  TeacherMain,
} from "../../styles/adminstyle/teacherinfolist";
import { GrayBtn } from "../../styles/ui/buttons";
import { PageNum } from "../../styles/adminstyle/guardianlist";
import { Pagination } from "antd";
import { useNavigate } from "react-router";
import { IMG_URL } from "../../api/config";

const initTeacherList = {
  teacherCnt: 0,
  list: [
    {
      iteacher: 0,
      iclass: 0,
      teacherNm: "",
      teacherUid: "",
      tcIsDel: 0,
      tcEmail: "",
      teacherProfile: "",
    },
  ],
};
const TeacherListComponent = ({
  page,
  iclass,
  tcIsDel,
  teacherList,
  oncheckedClick,
  checkedItems,
}) => {
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // 체크박스 전체 선택 시 pk값 수집
  const handleSelectAllChange = e => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name^="iteacher"]',
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
  // 페이지네이션
  const handleChangePage = page => {
    // console.log(page);
    navigate(
      `/admin/teacher?ipage=${page}&iclass=${iclass}&tcIsDel=${tcIsDel}`,
    );
  };
  return (
    <>
      <TeacherMain>
        <MainTop>
          <MainTopLeft>
            <input
              type="checkbox"
              id="selectAll"
              name="iteacher"
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            />
            <label htmlFor="selectAll">전체 선택</label>
          </MainTopLeft>

          <MainTopRight>
            <button
              onClick={e =>
                navigate(`/admin/teacher?page=1&iclass=0&tcIsDel=0`)
              }
            >
              재직중
            </button>
            <button
              onClick={e =>
                navigate(`/admin/teacher?page=1&iclass=0&tcIsDel=1`)
              }
            >
              퇴사
            </button>
          </MainTopRight>
        </MainTop>
        <TeacherListWrap>
          {Array.isArray(teacherList.list) &&
            teacherList.list.map(item => (
              <TeacherListItem key={item.iteacher}>
                <input
                  type="checkbox"
                  name="iteacher"
                  value={item.iteacher}
                  onChange={e => {
                    handleChangeCheck(e);
                  }}
                />
                <ListBox>
                  <ListBoxTop>
                    <TeacherImgInfo>
                      <img
                        src={`${IMG_URL}/pic/user/${item.iteacher}/${item.teacherProfile}`}
                      />
                    </TeacherImgInfo>
                    <TeacherInfo>
                      <p
                        className={
                          item.iclass === 1
                            ? "hibiscus"
                            : item.iclass === 2
                            ? "sunflower"
                            : item.iclass === 3
                            ? "rose"
                            : item.iclass === 4
                            ? "admin"
                            : ""
                        }
                      >
                        {item.iclass === 1
                          ? "무궁화반"
                          : item.iclass === 2
                          ? "해바라기반"
                          : item.iclass === 3
                          ? "장미반"
                          : item.iclass === 4
                          ? "원장"
                          : ""}
                      </p>
                      <p className="leaf">{item.teacherNm}</p>
                    </TeacherInfo>
                    <GrayBtn
                      onClick={e =>
                        navigate(
                          `/admin/teacher/edit?iteacher=${item.iteacher}`,
                        )
                      }
                    >
                      정보 수정
                    </GrayBtn>
                  </ListBoxTop>
                  <InfoBox>
                    <dl>
                      <dt>이름</dt>
                      <dd>{item.teacherNm}</dd>
                    </dl>
                    <dl>
                      <dt>아이디</dt>
                      <dd>{item.teacherUid}</dd>
                    </dl>
                    <dl>
                      <dt>재직상태</dt>
                      <dd>
                        {item.tcIsDel === 0
                          ? "재직중"
                          : item.tcIsDel === 1
                          ? "퇴사"
                          : ""}
                      </dd>
                    </dl>
                    <dl>
                      <dt>이메일</dt>
                      <dd>{item.tcEmail}</dd>
                    </dl>
                    <p>인사말</p>
                    <span>{item.teacherIntroduce}</span>
                  </InfoBox>
                </ListBox>
              </TeacherListItem>
            ))}
        </TeacherListWrap>
      </TeacherMain>
      <PageNum>
        <Pagination
          defaultCurrent={page}
          total={teacherList.teacherCnt}
          pageSize={6}
          onChange={handleChangePage}
        />
      </PageNum>
    </>
  );
};

export default TeacherListComponent;
