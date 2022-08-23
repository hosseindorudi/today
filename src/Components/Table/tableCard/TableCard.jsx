import React, { useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import * as fi from "react-icons/fi";
import TableButtons from "../TableButtons/TableButtons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

import { Button, CardActionArea, CardActions } from "@mui/material";
const TableCard = (props) => {
  const [footer, setFooter] = useState(-1);
  const { t } = useTranslation();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      {
        <Box sx={{ flexGrow: 1, overflowX:"hidden" }}>
          <Grid container spacing={3}>
            {props.posts.map((post, i) => (
              <Grid item xl={3} lg={4} md={6} sm={12}>
                <Card>
                  <Box sx={{ backgroundColor: `#${post.Color}` }}>
                    <Button size="small" color="primary">
                      <TableButtons
                        exportLink={props.exportId}
                        deleteType={props.deleteAccess}
                        editType={props.editAccess}
                        exportType={props.exportAccess}
                        accessListType={props.permissionsAccess}
                        handleClickGetPermission={
                          props.handleClickGetPermission
                        }
                        changePasswordType={props.changePasswordAccess}
                        deleteCalled={props.deleteCalled}
                        rowValue={post}
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
                        handleuploadFile={props.handleuploadFile}
                        handleClickQrCode={props.handleClickQrCode}
                        downloadQRAccess={props.downloadQRAccess}
                      />
                    </Button>
                  </Box>
                  <CardContent>
                    <Typography
                      fontSize={{
                        lg: 30,
                        md: 20,
                        sm: 15,
                        xs: 10
                      }}
                      className="card_title"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {post.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 600 }}>
                              {t("Device_Title")}:
                            </Typography>
                            <Typography sx={{ margin: "0 5px" }}>
                              {post.Device_Title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 600 }}>
                              {t("Country_Title")}:
                            </Typography>
                            <Typography sx={{ margin: "0 5px" }}>
                              {post.Country_Title}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 600 }}>
                              {t("RamMemory")}:
                            </Typography>
                            <Typography sx={{ margin: "0 5px" }}>
                              {post.RamMemory}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 600 }}>
                              {t("RomMemory")}:
                            </Typography>
                            <Typography sx={{ margin: "0 5px" }}>
                              {post.RomMemory}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 600 }}>
                              {t("Color_Title")}:
                            </Typography>
                            <Typography sx={{ margin: "0 5px" }}>
                              {post.Color_Title}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
      {/* {props.posts.map(
        (post, i) =>
          i % 3 === 0 && (
            <CardGroup>
              {props.posts[i] && (
                <Card className="m-2">
                  <Card.Header
                    className="card_Header"
                    style={{ backgroundColor: `#${props.posts[i].Color}`,opacity:.8 }}
                  >
                    
                    <TableButtons
                          exportLink={props.exportId}
                          deleteType={props.deleteAccess}
                          editType={props.editAccess}
                          exportType={props.exportAccess}
                          accessListType={props.permissionsAccess}
                          handleClickGetPermission={props.handleClickGetPermission}
                          changePasswordType={props.changePasswordAccess}
                          deleteCalled={props.deleteCalled}
                          rowValue={props.post}
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
                          handleuploadFile={props.handleuploadFile}
                          handleClickQrCode={props.handleClickQrCode}
                          downloadQRAccess={props.downloadQRAccess}
                        />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="card_title" style={{ cursor: "pointer",direction:'initial' }}>
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
                  
                </Card>
              )}
              {props.posts[i + 1] && (
                <Card className="m-2" >
                  <Card.Header
                    style={{ backgroundColor: `#${props.posts[i + 1].Color}`, opacity:.8 }}
                  >
                    <TableButtons
                          exportLink={props.exportId}
                          deleteType={props.deleteAccess}
                          editType={props.editAccess}
                          exportType={props.exportAccess}
                          accessListType={props.permissionsAccess}
                          handleClickGetPermission={props.handleClickGetPermission}
                          changePasswordType={props.changePasswordAccess}
                          deleteCalled={props.deleteCalled}
                          rowValue={props.post}
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
                          handleuploadFile={props.handleuploadFile}
                          handleClickQrCode={props.handleClickQrCode}
                          downloadQRAccess={props.downloadQRAccess}
                        />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                    className="card_title"
                    style={{ cursor: "pointer",direction:"initial" }}>
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
                <Card className="m-2" >
                  <Card.Header
                    style={{ backgroundColor: `#${props.posts[i + 2].Color}`,opacity:.8 }}
                  >
                    <TableButtons
                          exportLink={props.exportId}
                          deleteType={props.deleteAccess}
                          editType={props.editAccess}
                          exportType={props.exportAccess}
                          accessListType={props.permissionsAccess}
                          handleClickGetPermission={props.handleClickGetPermission}
                          changePasswordType={props.changePasswordAccess}
                          deleteCalled={props.deleteCalled}
                          rowValue={props.post}
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
                          handleuploadFile={props.handleuploadFile}
                          handleClickQrCode={props.handleClickQrCode}
                          downloadQRAccess={props.downloadQRAccess}
                        />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title
                    className="card_title"
                    style={{ cursor: "pointer",direction:"initial" }}>
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
      )} */}
    </>
  );
};

export default TableCard;
