import PopularOwners from "@/components/PopularOwners";

function PopularWriterSection() {
  const authors = [
    {
      id: "1",
      name: "John Doe",
      image: "/images/Authors.png",
    },
    {
      id: "2",
      name: "John Doe",
      image: "/images/Authors.png",
    },
    {
      id: "3",
      name: "John Doe",
      image: "/images/Authors.png",
    },
    {
      id: "4",
      name: "John Doe",
      image: "/images/Authors.png",
    },
  ];
  return (
    <>
      <PopularOwners
        title={"Popular Authors"}
        link={"/authors"}
        owners={authors}
      />
    </>
  );
}

export default PopularWriterSection;
