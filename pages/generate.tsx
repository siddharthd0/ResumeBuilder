import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
// import "jspdf-autotable";
import jsPDF from "jspdf";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  chakra,
  Flex,
  Spacer,
  useToast,
  Divider,
} from "@chakra-ui/react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

export default function ResumeGenerator() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const previewRef = useRef(null);

  useEffect(() => {
    const generatePreview = async () => {
      const canvas = await html2canvas(previewRef.current!);
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
    generatePreview();
  }, [name, email, phone, education, experience, skills]);

  const generatePdf = () => {
    // const element = document.getElementById('resume-preview');

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add the name field separately with custom styling
    // Add name
    doc.setTextColor("#3d7be0");
    doc.setFontSize(40);
    doc.text(name, 20, 20);

    // Add email
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(email, 20, 35);

    // Add phone
    doc.setTextColor("black");
    doc.setFontSize(10);
    doc.text(phone, 70, 35);

    // add line
    doc.setLineWidth(0.5);
    doc.setDrawColor(100);
    doc.line(20, 25, 180, 25);

    // Add education
    doc.setFontSize(16);
    doc.setTextColor("black");
    doc.text("Education", 20, 70);
    doc.setFontSize(14);
    doc.setTextColor("gray");
    doc.text(education, 20, 80);

    // Add experience
    doc.setFontSize(16);
    doc.setTextColor("black");
    doc.text("Experience", 20, 110);
    doc.setFontSize(14);
    doc.setTextColor("gray");
    doc.text(experience, 20, 120);

    // Add skills
    doc.setFontSize(16);
    doc.setTextColor("black");
    doc.text("Skills", 20, 150);
    doc.setFontSize(14);
    doc.setTextColor("gray");
    doc.text(skills, 20, 160);

    // const imgData = previewUrl;
    // doc.addImage(imgData, "PNG", 130, 20, 60, 80);
    doc.save(`${name}-resume.pdf`);
  };

  const downloadPdf = () => {
    // Create a new jsPDF object
    generatePdf();
  };

  return (
    <>
      <Navigation
        onOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        isOpen={false}
      />
      <Heading
        mb="19px !important"
        color="brand.900"
        fontSize={"5xl !important"}
        textAlign={"center"}
        margin={"auto"}
        mt="38px"
      >
        Resume Generator
      </Heading>
      <chakra.div mb="50px" maxW={"1000px"} margin="auto" display={"flex"}>
        <chakra.div color="whiteAlpha.700">
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone:</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Education:</FormLabel>
            <Input
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Experience:</FormLabel>
            <Input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Skills:</FormLabel>
            <Input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </FormControl>
          <Button
            px="20px"
            mt="1rem"
            _hover={{
              backgroundColor: "brand.500",
            }}
            color="white"
            fontWeight={"300"}
            backgroundColor={"brand.700"}
            onClick={downloadPdf}
          >
            Download PDF
          </Button>
        </chakra.div>
        <Spacer />
        <chakra.div
          mb="50px"
          padding="1rem"
          height="700px"
          borderRadius={"6px"}
          backgroundColor={"brand.800"}
          width={"550px"}
          ref={previewRef}
        >
          <Heading color="#3d7be0" fontSize="5xl">
            {name}
          </Heading>
          <Flex mb="8px">
            <Text textDecoration={"underline"} fontSize="sm">
              {" "}
              {email}
            </Text>
            <Spacer />
            <Text textDecoration={"underline"} fontSize="sm">
              {" "}
              {phone}
            </Text>
          </Flex>
          <Divider bgColor="black" height={"1px"} fontWeight={"black"} />
          <Heading mt="10px" fontSize="3xl">
            Education
          </Heading>
          <Text>{education}</Text>
          <Heading mt="10px" fontSize="3xl">
            Experience
          </Heading>
          <Text>{experience}</Text>
          <Heading mt="10px" fontSize="3xl">
            Skills
          </Heading>
          <Text>{skills}</Text>
        </chakra.div>
      </chakra.div>

      <Footer />
    </>
  );
}
