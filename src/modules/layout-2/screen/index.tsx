import React from "react";
import { Container } from "@components";
import {
  Footer,
  Jumbotron,
  SectionAbout,
  SectionCallToAction,
  SectionCollab,
  SectionProses,
  SectionSkillupType,
} from "../components";

const Index = () => {
  return (
    <Container>
      <Jumbotron />
      <SectionAbout />
      <SectionProses />
      <SectionSkillupType />
      <SectionCollab />
      <SectionCallToAction />
      <Footer />
    </Container>
  );
};

export default Index;
