import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import * as fi from "react-icons/fi";
import TableButtons from "../TableButtons/TableButtons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";

const TableCard = (props) => {
  const [footer, setFooter] = useState(-1);
  console.log(props.productsColumns);
  console.log(props.posts);
  const { t } = useTranslation();

  return (
    <>
      {props.posts.map(
        (post, i) =>
          i % 3 === 0 && (
            <CardGroup>
              {props.posts[i] && (
                <Card className="m-2" style={{ height: "fit-content" }}>
                  <Card.Header
                    style={{ backgroundColor: `#${props.posts[i].Color}` }}
                  >
                    <button
                      className="cardHeaderBtn"
                      onClick={() => {
                        footer === -1
                          ? setFooter(i)
                          : footer === i
                          ? setFooter(-1)
                          : setFooter(i);
                      }}
                    >
                      <fi.FiMenu />
                    </button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{ cursor: "pointer" }}>
                      {props.posts[i].Title}
                    </Card.Title>
                    <Card.Text>
                      <Container>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("Device_Title")}:</span>
                            <span>{props.posts[i].Device_Title}</span>
                          </Col>
                          <Col className="cardColumnClass">
                            <span>{t("Country_Title")}:</span>
                            <span>{props.posts[i].Country_Title}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("RamMemory")}:</span>
                            <span>{props.posts[i].RamMemory}</span>
                          </Col>
                          <Col className="cardColumnClass">
                            <span>{t("RomMemory")}:</span>
                            <span>{props.posts[i].RomMemory}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("Color_Title")}:</span>
                            <span>{props.posts[i].Color_Title}</span>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                  {footer === i && (
                    <Card.Footer>
                      <TableButtons
                        exportLink={props.exportLink}
                        deleteType={props.deleteType}
                        editType={props.editType}
                        exportType={props.exportType}
                        accessListType={props.accessListType}
                        handleClickGetPermission={
                          props.handleClickGetPermission
                        }
                        changePasswordType={props.changePasswordType}
                        deleteCalled={props.deleteCalled}
                        rowValue={props.posts[i]}
                        handleClickEdit={props.handleClickEdit}
                        handlePassEdit={props.handlePassEdit}
                        handleAddQuestion={props.handleAddQuestion}
                        addAccess={props.addAccess}
                        handleCreateRate={props.handleCreateRate}
                        rateAccess={props.rateAccess}
                        readAnswersAccess={props.readAnswersAccess}
                        handleReadAnswers={props.handleReadAnswers}
                        operatorRoleAccess={props.operatorRoleAccess}
                        handleOperatorRole={props.handleOperatorRole}
                        handlePolicyBrowser={props.handlePolicyBrowser}
                        policyBrowserAccess={props.policyBrowserAccess}
                        policyIpAccess={props.policyIpAccess}
                        policyLocationAccess={props.policyLocationAccess}
                        policyOsAccess={props.policyOsAccess}
                        handlePolicyIP={props.handlePolicyIP}
                        handlePolicyLocation={props.handlePolicyLocation}
                        handlePolicyOs={props.handlePolicyOs}
                        addressAccess={props.addressAccess}
                        handleAddress={props.handleAddress}
                        addOperator={props.addOperator}
                        addOperatorAccess={props.addOperatorAccess}
                        handlePhone={props.handlePhone}
                        phoneAccess={props.phoneAccess}
                        handleMobile={props.handleMobile}
                        mobileAccess={props.mobileAccess}
                        handleAccount={props.handleAccount}
                        accountAccess={props.accountAccess}
                        sendMessageBankAccess={props.sendMessageBankAccess}
                        sendMessageBank={props.sendMessageBank}
                      />
                    </Card.Footer>
                  )}
                </Card>
              )}
              {props.posts[i + 1] && (
                <Card className="m-2" style={{ height: "fit-content" }}>
                  <Card.Header
                    style={{ backgroundColor: `#${props.posts[i + 1].Color}` }}
                  >
                    <button
                      className="cardHeaderBtn"
                      onClick={() => {
                        footer === -1
                          ? setFooter(i + 1)
                          : footer === i + 1
                          ? setFooter(-1)
                          : setFooter(i + 1);
                      }}
                    >
                      <fi.FiMenu />
                    </button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{ cursor: "pointer" }}>
                      {props.posts[i + 1].Title}
                    </Card.Title>
                    <Card.Text>
                      <Container>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("Device_Title")}:</span>
                            <span>{props.posts[i + 1].Device_Title}</span>
                          </Col>
                          <Col className="cardColumnClass">
                            <span>{t("Country_Title")}:</span>
                            <span>{props.posts[i + 1].Country_Title}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("RamMemory")}:</span>
                            <span>{props.posts[i + 1].RamMemory}</span>
                          </Col>
                          <Col className="cardColumnClass">
                            <span>{t("RomMemory")}:</span>
                            <span>{props.posts[i + 1].RomMemory}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("Color_Title")}:</span>
                            <span>{props.posts[i + 1].Color_Title}</span>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                  {footer === i + 1 && (
                    <Card.Footer>
                      <TableButtons
                        exportLink={props.exportLink}
                        deleteType={props.deleteType}
                        editType={props.editType}
                        exportType={props.exportType}
                        accessListType={props.accessListType}
                        handleClickGetPermission={
                          props.handleClickGetPermission
                        }
                        changePasswordType={props.changePasswordType}
                        deleteCalled={props.deleteCalled}
                        rowValue={props.posts[i + 1]}
                        handleClickEdit={props.handleClickEdit}
                        handlePassEdit={props.handlePassEdit}
                        handleAddQuestion={props.handleAddQuestion}
                        addAccess={props.addAccess}
                        handleCreateRate={props.handleCreateRate}
                        rateAccess={props.rateAccess}
                        readAnswersAccess={props.readAnswersAccess}
                        handleReadAnswers={props.handleReadAnswers}
                        operatorRoleAccess={props.operatorRoleAccess}
                        handleOperatorRole={props.handleOperatorRole}
                        handlePolicyBrowser={props.handlePolicyBrowser}
                        policyBrowserAccess={props.policyBrowserAccess}
                        policyIpAccess={props.policyIpAccess}
                        policyLocationAccess={props.policyLocationAccess}
                        policyOsAccess={props.policyOsAccess}
                        handlePolicyIP={props.handlePolicyIP}
                        handlePolicyLocation={props.handlePolicyLocation}
                        handlePolicyOs={props.handlePolicyOs}
                        addressAccess={props.addressAccess}
                        handleAddress={props.handleAddress}
                        addOperator={props.addOperator}
                        addOperatorAccess={props.addOperatorAccess}
                        handlePhone={props.handlePhone}
                        phoneAccess={props.phoneAccess}
                        handleMobile={props.handleMobile}
                        mobileAccess={props.mobileAccess}
                        handleAccount={props.handleAccount}
                        accountAccess={props.accountAccess}
                        sendMessageBankAccess={props.sendMessageBankAccess}
                        sendMessageBank={props.sendMessageBank}
                      />
                    </Card.Footer>
                  )}
                </Card>
              )}
              {props.posts[i + 2] && (
                <Card className="m-2" style={{ height: "fit-content" }}>
                  <Card.Header
                    style={{ backgroundColor: `#${props.posts[i + 2].Color}` }}
                  >
                    <button
                      className="cardHeaderBtn"
                      onClick={() => {
                        footer === -1
                          ? setFooter(i + 2)
                          : footer === i + 2
                          ? setFooter(-1)
                          : setFooter(i + 2);
                      }}
                    >
                      <fi.FiMenu />
                    </button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{ cursor: "pointer" }}>
                      {props.posts[i + 2].Title}
                    </Card.Title>
                    <Card.Text>
                      <Container>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("Device_Title")}:</span>
                            <span>{props.posts[i + 2].Device_Title}</span>
                          </Col>
                          <Col className="cardColumnClass">
                            <span>{t("Country_Title")}:</span>
                            <span>{props.posts[i + 2].Country_Title}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("RamMemory")}:</span>
                            <span>{props.posts[i + 2].RamMemory}</span>
                          </Col>
                          <Col className="cardColumnClass">
                            <span>{t("RomMemory")}:</span>
                            <span>{props.posts[i + 2].RomMemory}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="cardColumnClass">
                            <span>{t("Color_Title")}:</span>
                            <span>{props.posts[i + 2].Color_Title}</span>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                  {footer === i + 2 && (
                    <Card.Footer>
                      <TableButtons
                        exportLink={props.exportLink}
                        deleteType={props.deleteType}
                        editType={props.editType}
                        exportType={props.exportType}
                        accessListType={props.accessListType}
                        handleClickGetPermission={
                          props.handleClickGetPermission
                        }
                        changePasswordType={props.changePasswordType}
                        deleteCalled={props.deleteCalled}
                        rowValue={props.posts[i + 2]}
                        handleClickEdit={props.handleClickEdit}
                        handlePassEdit={props.handlePassEdit}
                        handleAddQuestion={props.handleAddQuestion}
                        addAccess={props.addAccess}
                        handleCreateRate={props.handleCreateRate}
                        rateAccess={props.rateAccess}
                        readAnswersAccess={props.readAnswersAccess}
                        handleReadAnswers={props.handleReadAnswers}
                        operatorRoleAccess={props.operatorRoleAccess}
                        handleOperatorRole={props.handleOperatorRole}
                        handlePolicyBrowser={props.handlePolicyBrowser}
                        policyBrowserAccess={props.policyBrowserAccess}
                        policyIpAccess={props.policyIpAccess}
                        policyLocationAccess={props.policyLocationAccess}
                        policyOsAccess={props.policyOsAccess}
                        handlePolicyIP={props.handlePolicyIP}
                        handlePolicyLocation={props.handlePolicyLocation}
                        handlePolicyOs={props.handlePolicyOs}
                        addressAccess={props.addressAccess}
                        handleAddress={props.handleAddress}
                        addOperator={props.addOperator}
                        addOperatorAccess={props.addOperatorAccess}
                        handlePhone={props.handlePhone}
                        phoneAccess={props.phoneAccess}
                        handleMobile={props.handleMobile}
                        mobileAccess={props.mobileAccess}
                        handleAccount={props.handleAccount}
                        accountAccess={props.accountAccess}
                        sendMessageBankAccess={props.sendMessageBankAccess}
                        sendMessageBank={props.sendMessageBank}
                      />
                    </Card.Footer>
                  )}
                </Card>
              )}
            </CardGroup>
          )
      )}
    </>
  );
};

export default TableCard;
