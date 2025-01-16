type CatIcon = {
  icon: React.JSXElementConstructor<any>;
};

const CategoryIcon: React.FC<CatIcon> = ({ icon: Icon }) => {
  return <Icon className="w-8 h-8 rounded-full text-white bg-complOpt2" />;
};

export default CategoryIcon;
