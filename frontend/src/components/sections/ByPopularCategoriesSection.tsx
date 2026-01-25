import ProductListByCategory from "@/components/ProductListByCategory";

function ByPopularCategoriesSection() {
  const categories = [
    {
      title: "Trillers",
      category: "trending",
    },
    {
      title: "Fiction",
      category: "fiction",
    },
    {
      title: "Non Fiction",
      category: "non-fiction",
    },
  ];

  // return <ProductListByCategory title={"Hello"} category={"hell"} />;
  return (
    <div>
      {categories.map((item) => (
        <ProductListByCategory
          key={item.title}
          title={item.title}
          category={item.category}
        />
      ))}
    </div>
  );
}

export default ByPopularCategoriesSection;
