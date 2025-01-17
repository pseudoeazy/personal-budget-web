type CatIcon = {
  icon: React.ElementType;
};

const CategoryIcon: React.FC<CatIcon> = ({ icon: Icon }) => {
  return <Icon className="w-8 h-8 rounded-full text-black bg-complOpt2 p-1" />;
};

export default CategoryIcon;
