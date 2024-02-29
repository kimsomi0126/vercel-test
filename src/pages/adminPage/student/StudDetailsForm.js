import React, { useEffect, useState } from "react";
import { ContentInner, PageTitle } from "../../../styles/basic";
import {
  DetailPhysical,
  TableWrap,
  TitleWrap,
} from "../../../styles/user/mypage";
import { DatePicker, Form, Input, Select } from "antd";
import {
  DetailFormTable,
  DetailPhysicalTable,
  KeywordTable,
  StudDetailWrap,
  StudDetailsFormFooter,
} from "../../../styles/adminstyle/studdetailsform";
import { GreenBtn, PinkBtn } from "../../../styles/ui/buttons";
import ModalTwoBtn from "../../../components/ui/ModalTwoBtn";
import ModalOneBtn from "../../../components/ui/ModalOneBtn";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getDetailInfo,
  postStudentDetail,
  putDetailEdit,
} from "../../../api/adminPage/admin_api";
import dayjs from "dayjs";
import useCustomLogin from "../../../hooks/useCustomLogin";

// 상세정보 POST
const initDetailData = {
  ikid: 0,
  height: 0,
  weight: 0,
  growth: 0,
  growthDate: "",
  growthMemo: "",
  bodyDate: "",
};

// 상세정보 GET
const initDetailInfo = {
  kidNm: "",
  iclass: 0,
  gender: 0,
  birth: "",
  growths: [
    {
      height: 0,
      weight: 0,
      bodyDate: "",
      growth: 0,
      growthDate: "",
      growthMemo: "",
    },
  ],
};

const StudDetailsForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLogin } = useCustomLogin();
  // 폼 변경값 확인
  const [formChanged, setFormChanged] = useState(false);

  // 상세 정보 Get
  const [detailInfo, setDetailInfo] = useState(initDetailInfo);
  const [serchParams, setSearchParams] = useSearchParams();
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      setTitle("관리자 전용 페이지");
      setSubTitle("관리자만 접근 가능합니다.");
      setIsOpen(true);
      setIsNavigate(`/login`);
      return;
    } else {
      getDetailInfo({ successFn, failFn, errorFn, ikid, year });
    }
  }, [isLogin]);

  const ikid = serchParams.get("ikid");
  const year = serchParams.get("year");

  const successFn = result => {
    if (result.growths[0]) {
      setEditState(true);
    }
    setDetailInfo(result);
    const values = {};
    for (let i = 0; i < 4; i++) {
      const bodyDateValue = result.growths[i]?.bodyDate
        ? dayjs(result.growths[i]?.bodyDate)
        : null;
      const growthDateValue = result.growths[i]?.growthDate
        ? dayjs(result.growths[i]?.growthDate)
        : null;
      values[`ikid${i + 1}`] = ikid;
      values[`bodyDate${i + 1}`] = bodyDateValue;
      values[`height${i + 1}`] = result.growths[i]?.height;
      values[`weight${i + 1}`] = result.growths[i]?.weight;
      values[`growthDate${i + 1}`] = growthDateValue;
      values[`growth${i + 1}`] = {
        label:
          result.growths[i]?.growth === 1
            ? "활발한"
            : result.growths[i]?.growth === 2
            ? "예의바른"
            : result.growths[i]?.growth === 3
            ? "창의적인"
            : result.growths[i]?.growth === 4
            ? "호기심 많은"
            : result.growths[i]?.growth === 5
            ? "착한"
            : result.growths[i]?.growth === 6
            ? "씩씩한"
            : result.growths[i]?.growth === 7
            ? "성실한"
            : result.growths[i]?.growth === 8
            ? "편식없는"
            : result.growths[i]?.growth === 9
            ? "깔끔한"
            : result.growths[i]?.growth === 10
            ? "튼튼한"
            : "키워드 입력",
        value: result.growths[i]?.growth,
        key: result.growths[i]?.growth,
      };
      values[`growthMemo${i + 1}`] = result.growths[i]?.growthMemo;
    }
    // console.log("기존정보", values);
    form.setFieldsValue(values);
    setAllDetailData(values);
  };

  const failFn = result => {
    setDetailInfo(result);
  };
  const errorFn = result => {
    setDetailInfo(result);
  };

  // 상세 정보 Post
  const [allDetailData, setAllDetailData] = useState(initDetailData);
  const firstObject = {};
  for (const key in allDetailData) {
    if (key.includes("1")) {
      const newKey = key.replace("1", "");
      firstObject[newKey] = allDetailData[key];
    }
  }
  const secondObject = {};
  for (const key in allDetailData) {
    if (key.includes("2")) {
      const newKey = key.replace("2", "");
      secondObject[newKey] = allDetailData[key];
    }
  }
  const thirdObject = {};
  for (const key in allDetailData) {
    if (key.includes("3")) {
      const newKey = key.replace("3", "");
      thirdObject[newKey] = allDetailData[key];
    }
  }
  const forthObject = {};
  for (const key in allDetailData) {
    if (key.includes("4")) {
      const newKey = key.replace("4", "");
      forthObject[newKey] = allDetailData[key];
    }
  }
  const onValuesChange = (changeValue, allValue) => {
    setAllDetailData({ ...allValue });
    setFormChanged(true);
  };
  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  const [delOpen, setDelOpen] = useState(false);
  // 등록
  const handleAddClick = () => {
    if (!formChanged) {
      setIsOpen(true);
      setTitle("입력된 내용이 없습니다.");
      setSubTitle("내용을 입력해주세요.");
    } else {
      const sendServerData = [];
      if (firstObject.bodyDate || firstObject.growthDate) {
        firstObject.bodyDate = dayjs(firstObject.bodyDate).format("YYYY-MM-DD");
        firstObject.growthDate = dayjs(firstObject.growthDate).format(
          "YYYY-MM-DD",
        );
        if (firstObject.growth.value) {
          firstObject.growth = parseInt(firstObject.growth.value);
        } else {
          firstObject.growth = parseInt(firstObject.growth);
        }
        firstObject.ikid = parseInt(firstObject.ikid);
        sendServerData.push(firstObject);
      }
      if (secondObject.bodyDate || secondObject.growthDate) {
        secondObject.bodyDate = dayjs(secondObject.bodyDate).format(
          "YYYY-MM-DD",
        );
        secondObject.growthDate = dayjs(secondObject.growthDate).format(
          "YYYY-MM-DD",
        );
        if (secondObject.growth.value) {
          secondObject.growth = parseInt(secondObject.growth.value);
        } else {
          secondObject.growth = parseInt(secondObject.growth);
        }
        secondObject.ikid = parseInt(secondObject.ikid);
        sendServerData.push(secondObject);
      }
      if (thirdObject.bodyDate || thirdObject.growthDate) {
        thirdObject.bodyDate = dayjs(thirdObject.bodyDate).format("YYYY-MM-DD");
        thirdObject.growthDate = dayjs(thirdObject.growthDate).format(
          "YYYY-MM-DD",
        );
        if (thirdObject.growth.value) {
          thirdObject.growth = parseInt(thirdObject.growth.value);
        } else {
          thirdObject.growth = parseInt(forthObject.growth);
        }
        thirdObject.ikid = parseInt(thirdObject.ikid);
        sendServerData.push(thirdObject);
      }
      if (forthObject.bodyDate || forthObject.growthDate) {
        forthObject.bodyDate = dayjs(forthObject.bodyDate).format("YYYY-MM-DD");
        forthObject.growthDate = dayjs(forthObject.growthDate).format(
          "YYYY-MM-DD",
        );
        if (forthObject.growth.value) {
          forthObject.growth = forthObject.growth.value;
        } else {
          forthObject.growth = parseInt(forthObject.growth);
        }
        forthObject.ikid = parseInt(forthObject.ikid);
        sendServerData.push(forthObject);
      }

      // console.log(sendServerData);
      // console.log("전체 보낼 데이터 : ", sendServerData);

      postStudentDetail({
        allDetailData: sendServerData,
        successAddFn,
        errorAddFn,
      });
    }
  };
  const successAddFn = result => {
    setIsOpen(true);
    setTitle("등록 완료");
    setSubTitle("성공적으로 등록되었습니다.");
    setIsNavigate(`/admin/student/details?year=${year}&ikid=${ikid}`);
  };

  const errorAddFn = result => {
    setIsOpen(true);
    setTitle("등록 실패");
    setSubTitle("등록을 실패했습니다. 다시 시도해주세요.");
  };
  // 취소
  const handleCancelClick = () => {
    setDelOpen(true);
    setTitle("정말 취소할까요?");
    setSubTitle("작성된 내용은 저장되지 않습니다.");
    setIsNavigate(`/admin/student/details?year=${year}&ikid=${ikid}`);
  };
  const handleDelOk = () => {
    setDelOpen(false);
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  const handleCancel = () => {
    setDelOpen(false);
  };
  let sendServerData = [];
  const parseAndPushData = object => {
    if (object.bodyDate || object.growthDate) {
      object.bodyDate = dayjs(object.bodyDate).format("YYYY-MM-DD");
      object.growthDate = dayjs(object.growthDate).format("YYYY-MM-DD");
      object.height = parseInt(object.height); // 변환 추가
      object.weight = parseInt(object.weight); // 변환 추가
      if (object.growth.value) {
        object.growth = parseInt(object.growth.value);
      } else {
        object.growth = parseInt(object.growth);
      }
      object.ikid = parseInt(object.ikid);
      sendServerData.push(object);
    }
  };

  const handleEditClick = () => {
    if (!formChanged) {
      setIsOpen(true);
      setTitle("수정된 내용이 없습니다.");
      setSubTitle("내용을 입력해주세요.");
    } else {
      parseAndPushData(firstObject);
      parseAndPushData(secondObject);
      parseAndPushData(thirdObject);
      parseAndPushData(forthObject);
      // console.log("수정완", sendServerData);

      putDetailEdit({
        allDetailData: sendServerData,
        successEditFn,
        errorEditFn,
      });
    }
  };
  const successEditFn = result => {
    setIsOpen(true);
    setTitle("수정 완료");
    setSubTitle("성공적으로 수정되었습니다.");
    setIsNavigate(`/admin/student/details?year=${year}&ikid=${ikid}`);
    // console.log(result);
  };
  const errorEditFn = result => {
    setIsOpen(true);
    setTitle("수정 실패");
    setSubTitle("수정을 실패했습니다. 다시 시도해주세요.");
  };
  const handleOk = () => {
    setIsOpen(false);
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  return (
    <ContentInner>
      {/* 상세정보 */}
      <StudDetailWrap>
        <TitleWrap>
          <PageTitle>{year}년 상세정보 입력</PageTitle>
        </TitleWrap>
        <DetailFormTable>
          <TableWrap>
            <table>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <thead>
                <tr>
                  <th>반</th>
                  <th>이름</th>
                  <th>성별</th>
                  <th>생년월일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {detailInfo.iclass === 1
                      ? "무궁화반"
                      : detailInfo.iclass === 2
                      ? "해바라기반"
                      : "장미반"}
                  </td>

                  <td>{detailInfo.kidNm}</td>
                  <td>{detailInfo.gender === 0 ? "여자" : "남자"}</td>
                  <td>{detailInfo.birth}</td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
        </DetailFormTable>
      </StudDetailWrap>
      {/* 신체정보 */}
      <Form
        form={form}
        onValuesChange={(changeValue, allValue) => {
          onValuesChange(changeValue, allValue);
        }}
      >
        <Form.Item name="ikid1" style={{ display: "none" }}>
          {" "}
          <Input disabled />
        </Form.Item>
        <Form.Item name="ikid2" style={{ display: "none" }}>
          {" "}
          <Input disabled />
        </Form.Item>
        <Form.Item name="ikid3" style={{ display: "none" }}>
          {" "}
          <Input disabled />
        </Form.Item>
        <Form.Item name="ikid4" style={{ display: "none" }}>
          <Input disabled />
        </Form.Item>
        <StudDetailWrap>
          <TitleWrap>
            <PageTitle>키/몸무게</PageTitle>
          </TitleWrap>
          <DetailPhysical>
            <DetailPhysicalTable>
              <TableWrap className="th_left" col3>
                <table>
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>측정날짜</th>
                      <td>
                        <Form.Item name="bodyDate1">
                          <DatePicker
                            style={{
                              width: "100%",
                            }}
                            placeholder="측정날짜입력"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item name="bodyDate2">
                          <DatePicker
                            style={{
                              width: "100%",
                            }}
                            placeholder="측정날짜입력"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item name="bodyDate3">
                          <DatePicker
                            style={{
                              width: "100%",
                            }}
                            placeholder="측정날짜입력"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item name="bodyDate4">
                          <DatePicker
                            style={{
                              width: "100%",
                            }}
                            placeholder="측정날짜입력"
                          />
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <th>신장</th>
                      <td>
                        <Form.Item
                          name="height1"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력하세요.",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="신장 입력 (숫자만)"
                          ></Input>
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          name="height2"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력하세요.",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="신장 입력 (숫자만)" />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          name="height3"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력하세요.",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="신장 입력 (숫자만)" />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          name="height4"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력하세요.",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="신장 입력 (숫자만)" />
                        </Form.Item>
                      </td>
                    </tr>
                    <tr>
                      <th>몸무게</th>
                      <td>
                        <Form.Item
                          name="weight1"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="몸무게 입력 (숫자만)"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          name="weight2"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="몸무게 입력 (숫자만)"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          name="weight3"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="몸무게 입력 (숫자만)"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          name="weight4"
                          rules={[
                            {
                              pattern: /^\d*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="몸무게 입력 (숫자만)"
                          />
                        </Form.Item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </TableWrap>
            </DetailPhysicalTable>
          </DetailPhysical>
        </StudDetailWrap>
        {/* 키워드 */}
        <StudDetailWrap>
          <TitleWrap>
            <PageTitle>키워드</PageTitle>
          </TitleWrap>
          <KeywordTable>
            <TableWrap>
              <table>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="50%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>키워드</th>
                    <th>상세내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form.Item name="growthDate1">
                        <DatePicker
                          style={{
                            width: "100%",
                          }}
                          placeholder="날짜입력"
                        />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growth1">
                        <Select>
                          <Select.Option value="1">활발한</Select.Option>
                          <Select.Option value="2">예의바른</Select.Option>
                          <Select.Option value="3">창의적인</Select.Option>
                          <Select.Option value="4">호기심 많은</Select.Option>
                          <Select.Option value="5">착한</Select.Option>
                          <Select.Option value="6">씩씩한</Select.Option>
                          <Select.Option value="7">성실한</Select.Option>
                          <Select.Option value="8">편식 없는</Select.Option>
                          <Select.Option value="9">깔끔한</Select.Option>
                          <Select.Option value="10">튼튼한</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growthMemo1">
                        <Input
                          type="text"
                          placeholder="선택한 키워드와 관련된 내용"
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Item name="growthDate2">
                        <DatePicker
                          style={{
                            width: "100%",
                          }}
                          placeholder="날짜입력"
                        />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growth2">
                        <Select
                          labelInValue
                          defaultValue={{
                            value: "",
                            label: (
                              <span style={{ color: " rgba(0, 0, 0, 0.25) " }}>
                                키워드 선택
                              </span>
                            ),
                          }}
                        >
                          <Select.Option value="1">활발한</Select.Option>
                          <Select.Option value="2">예의바른</Select.Option>
                          <Select.Option value="3">창의적인</Select.Option>
                          <Select.Option value="4">호기심 많은</Select.Option>
                          <Select.Option value="5">착한</Select.Option>
                          <Select.Option value="6">씩씩한</Select.Option>
                          <Select.Option value="7">성실한</Select.Option>
                          <Select.Option value="8">편식 없는</Select.Option>
                          <Select.Option value="9">깔끔한</Select.Option>
                          <Select.Option value="10">튼튼한</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growthMemo2">
                        <Input
                          type="text"
                          placeholder="선택한 키워드와 관련된 내용"
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Item name="growthDate3">
                        <DatePicker
                          style={{
                            width: "100%",
                          }}
                          placeholder="날짜입력"
                        />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growth3">
                        <Select
                          labelInValue
                          defaultValue={{
                            value: "",
                            label: (
                              <span style={{ color: " rgba(0, 0, 0, 0.25) " }}>
                                키워드 선택
                              </span>
                            ),
                          }}
                        >
                          <Select.Option value="1">활발한</Select.Option>
                          <Select.Option value="2">예의바른</Select.Option>
                          <Select.Option value="3">창의적인</Select.Option>
                          <Select.Option value="4">호기심 많은</Select.Option>
                          <Select.Option value="5">착한</Select.Option>
                          <Select.Option value="6">씩씩한</Select.Option>
                          <Select.Option value="7">성실한</Select.Option>
                          <Select.Option value="8">편식 없는</Select.Option>
                          <Select.Option value="9">깔끔한</Select.Option>
                          <Select.Option value="10">튼튼한</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growthMemo3">
                        <Input
                          type="text"
                          placeholder="선택한 키워드와 관련된 내용"
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Item name="growthDate4">
                        <DatePicker
                          style={{
                            width: "100%",
                          }}
                          placeholder="날짜입력"
                        />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growth4">
                        <Select
                          labelInValue
                          defaultValue={{
                            value: "",
                            label: (
                              <span style={{ color: " rgba(0, 0, 0, 0.25) " }}>
                                키워드 선택
                              </span>
                            ),
                          }}
                        >
                          <Select.Option value="1">활발한</Select.Option>
                          <Select.Option value="2">예의바른</Select.Option>
                          <Select.Option value="3">창의적인</Select.Option>
                          <Select.Option value="4">호기심 많은</Select.Option>
                          <Select.Option value="5">착한</Select.Option>
                          <Select.Option value="6">씩씩한</Select.Option>
                          <Select.Option value="7">성실한</Select.Option>
                          <Select.Option value="8">편식 없는</Select.Option>
                          <Select.Option value="9">깔끔한</Select.Option>
                          <Select.Option value="10">튼튼한</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item name="growthMemo4">
                        <Input
                          type="text"
                          placeholder="선택한 키워드와 관련된 내용"
                        />
                      </Form.Item>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TableWrap>
          </KeywordTable>
        </StudDetailWrap>
        <StudDetailsFormFooter>
          {editState ? (
            <GreenBtn onClick={handleEditClick}>수정</GreenBtn>
          ) : (
            <GreenBtn onClick={handleAddClick}>등록</GreenBtn>
          )}

          {/* 안내창 */}
          <ModalOneBtn
            isOpen={isOpen}
            handleOk={handleOk}
            title={title}
            subTitle={subTitle}
          />
          <PinkBtn onClick={handleCancelClick}>취소</PinkBtn>

          <ModalTwoBtn
            isOpen={delOpen}
            handleOk={handleDelOk}
            handleCancel={handleCancel}
            title={title}
            subTitle={subTitle}
          />
        </StudDetailsFormFooter>
      </Form>
    </ContentInner>
  );
};

export default StudDetailsForm;
