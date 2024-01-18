import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate(fileDetails: any) {
  return (
    <Html>
      <Head />
      <Preview>Cloud Flow</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={""} />
          </Section>

          <Section style={content}>
            <Img width={620} src={``} />

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {fileDetails.fullName} shared a file with you.
                </Heading>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Name: </b>
                  {fileDetails.name}
                </Text>
                <Text style={paragraph}>
                  <b>Time: </b>
                  {new Date().toLocaleString()}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Size: </b>
                  {(fileDetails.size / 1024 / 1024).toFixed(2)} MB
                </Text>
                {/* <Text style={paragraph}>
                  If this was you, there's nothing else you need to do.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasn't you or if you have additional questions, please
                  see our support page.
                </Text> */}
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button href={fileDetails.shortUrl} style={button}>
                  Download File
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img width={620} src={``} />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | CloudFlow | All rights reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  padding: "12px 30px",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
